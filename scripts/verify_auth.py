#!/usr/bin/env python3
"""End-to-end verification for the unified BOPEU demo authentication.

Serves the repository over HTTP (the app also runs from file:// via run.bat),
then exercises member, staff, partner, registration, password-change and
password-reset journeys in Chromium with Playwright.

Run from the repository root:
    python scripts/verify_auth.py
Exit code 0 means every scenario passed and no page logged a console error.
"""

from __future__ import annotations

import contextlib
import functools
import http.server
import re
import sys
import threading
import time
from pathlib import Path

from playwright.sync_api import Browser, Page, sync_playwright

ROOT = Path(__file__).resolve().parents[1]
DEMO_PASSWORD = "1234"

JACKSON = ("+267 71 000 101", "Jackson")
MERCY = ("+267 71 000 104", "Mercy")
OTSILE = ("+267 72 000 207", "Otsile")
NALEDI = ("+267 72 000 201", "Naledi")
KEITUMETSE = ("+267 73 000 301", "Keitumetse")

PASSED: list[str] = []
FAILED: list[tuple[str, str]] = []


class CheckFailure(AssertionError):
    pass


def check(condition: object, message: str) -> None:
    if not condition:
        raise CheckFailure(message)


def start_server() -> tuple[http.server.ThreadingHTTPServer, str]:
    class QuietHandler(http.server.SimpleHTTPRequestHandler):
        def log_message(self, fmt: str, *args: object) -> None:  # noqa: A003
            pass

    handler = functools.partial(QuietHandler, directory=str(ROOT))
    server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
    server.daemon_threads = True
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()

    # The server binds to an ephemeral port; read it back so parallel runs do
    # not collide.
    port = server.server_address[1]
    return server, f"http://127.0.0.1:{port}"


@contextlib.contextmanager
def browser_page(browser: Browser, viewport: dict[str, int] | None = None):
    context = browser.new_context(viewport=viewport or {"width": 1280, "height": 900})
    page = context.new_page()
    console_errors: list[str] = []

    def on_console(message) -> None:  # type: ignore[no-untyped-def]
        if message.type == "error":
            console_errors.append(message.text)

    def on_page_error(error) -> None:  # type: ignore[no-untyped-def]
        console_errors.append(f"pageerror: {error}")

    page.on("console", on_console)
    page.on("pageerror", on_page_error)
    try:
        yield page, console_errors
    finally:
        context.close()


def goto(page: Page, base: str, path: str) -> None:
    page.goto(f"{base}/{path}", wait_until="domcontentloaded")
    page.wait_for_timeout(120)


def login(page: Page, base: str, path: str, credentials: tuple[str, str], password: str = DEMO_PASSWORD) -> None:
    goto(page, base, path)
    page.fill("#authWhatsapp", credentials[0])
    page.fill("#authFirstName", credentials[1])
    page.fill("#authPassword", password)
    page.click("button.auth-submit")


def wait_for_url(page: Page, pattern: str) -> None:
    page.wait_for_url(re.compile(pattern), timeout=8_000)
    page.wait_for_load_state("domcontentloaded")
    page.wait_for_timeout(120)


def assert_clean(console_errors: list[str]) -> None:
    check(not console_errors, "console errors: " + " | ".join(console_errors))


def session_profile(page: Page) -> str:
    return page.evaluate("() => (window.BOPEUAuth && BOPEUAuth.session()) ? BOPEUAuth.session().profileId : ''")


def run_test(name: str, fn) -> None:  # type: ignore[no-untyped-def]
    started = time.perf_counter()
    try:
        fn()
    except Exception as error:  # noqa: BLE001 - report every failure, keep going
        FAILED.append((name, str(error)))
        print(f"FAIL  {name}  ({time.perf_counter() - started:.1f}s)")
        print(f"      {error}")
    else:
        PASSED.append(name)
        print(f"PASS  {name}  ({time.perf_counter() - started:.1f}s)")


def test_header_modal_at_320(browser: Browser, base: str) -> None:
    with browser_page(browser, {"width": 320, "height": 720}) as (page, errors):
        goto(page, base, "index.html")
        if page.locator("#login-modal.active").count() == 0:
            page.click("#loginToggleBtn")
            page.wait_for_selector("#login-modal.active")
        page.click(".auth-demo-link")
        page.wait_for_selector(".demo-profile-tile")
        count = page.locator(".demo-profile-tile").count()
        check(count == 19, f"header modal rendered {count} demo profiles at 320px")
        overflow = page.evaluate(
            "() => document.documentElement.scrollWidth - document.documentElement.clientWidth"
        )
        check(overflow <= 1, f"header login modal overflows horizontally at 320px by {overflow}px")
        assert_clean(errors)


def test_login_render(browser: Browser, base: str) -> None:
    with browser_page(browser) as (page, errors):
        goto(page, base, "login.html")
        check(page.locator(".auth-hero h2").inner_text() == "Sign in to your portal",
              "member login heading is missing")
        for selector, label in (
            ("#authWhatsapp", "WhatsApp field"),
            ("#authFirstName", "first-name field"),
            ("#authPassword", "password field"),
        ):
            check(page.locator(selector).is_visible(), f"{label} is not visible")
        check(page.locator('a[href="register.html"]').count() == 1,
              "member login does not offer registration")
        links = page.locator(".auth-links").inner_text().lower()
        for expected in ("member sign in", "staff sign in", "partner sign in", "reset password"):
            check(expected in links, f"login links are missing {expected!r}")
        check(page.locator("#authError").count() == 1, "login error region is missing")
        assert_clean(errors)


def test_demo_tiles_are_90px(browser: Browser, base: str) -> None:
    for width in (390, 320):
        with browser_page(browser, {"width": width, "height": 760}) as (page, errors):
            goto(page, base, "login.html?demo=1")
            page.wait_for_selector(".demo-profile-tile")
            count = page.locator(".demo-profile-tile").count()
            check(count == 19, f"expected 19 demo profiles at {width}px, found {count}")
            sizes = page.eval_on_selector_all(
                ".demo-profile-thumb",
                "els => els.map(el => { const r = el.getBoundingClientRect(); return [r.width, r.height]; })",
            )
            check(len(sizes) == count, "not every demo tile rendered a thumbnail")
            check(all(abs(w - 90) < 0.6 and abs(h - 90) < 0.6 for w, h in sizes),
                  f"demo thumbnails are not 90x90 at {width}px: {sizes[:3]}")
            overflow = page.evaluate(
                "() => document.documentElement.scrollWidth - document.documentElement.clientWidth"
            )
            check(overflow <= 1, f"demo directory overflows horizontally at {width}px by {overflow}px")
            assert_clean(errors)


def test_staff_role_navigation_and_deep_link(browser: Browser, base: str) -> None:
    with browser_page(browser) as (page, errors):
        login(page, base, "admin-login.html", OTSILE)
        wait_for_url(page, r"/admin-dashboard\.html$")
        check(page.locator("#authRoleWorkspace").is_visible(), "super-admin workspace banner is missing")
        check("Otsile Sechele" in page.locator("#authRoleWorkspace").inner_text(),
              "super-admin banner does not name the signed-in staff member")
        users_link = page.locator('.admin-side a[href="admin-users-roles.html"]')
        check(users_link.is_visible(), "super admin cannot see User & Roles navigation")
        check(session_profile(page) == "STF-DEMO-007", "super-admin session has the wrong profile")
        assert_clean(errors)

    with browser_page(browser) as (page, errors):
        login(page, base, "admin-login.html", NALEDI)
        wait_for_url(page, r"/admin-dashboard\.html$")
        check("Marketing" in page.locator("#authRoleWorkspace").inner_text(),
              "marketing workspace does not show the marketing role")
        audit_display = page.locator('.admin-side a[href="admin-audit-log.html"]').evaluate(
            "el => getComputedStyle(el).display"
        )
        users_display = page.locator('.admin-side a[href="admin-users-roles.html"]').evaluate(
            "el => getComputedStyle(el).display"
        )
        content_display = page.locator('.admin-side a[href="admin-content.html"]').evaluate(
            "el => getComputedStyle(el).display"
        )
        check(audit_display == "none", "marketing can still see Audit Log navigation")
        check(users_display == "none", "marketing can still see Users & Roles navigation")
        check(content_display != "none", "marketing cannot see Content navigation")

        goto(page, base, "admin-audit-log.html")
        wait_for_url(page, r"/admin-dashboard\.html\?denied=admin-audit-log\.html$")
        check(page.locator(".auth-denied").is_visible(), "role denial notice is missing")
        check("outside your role" in page.locator(".auth-denied").inner_text(),
              "role denial notice does not explain the redirect")
        assert_clean(errors)


def test_partner_deep_link(browser: Browser, base: str) -> None:
    with browser_page(browser) as (page, errors):
        login(page, base, "partner-login.html", KEITUMETSE)
        wait_for_url(page, r"/partner-dashboard\.html$")
        check(page.locator("#authPartnerWorkspace").is_visible(), "partner workspace banner is missing")
        heading = page.locator(".p-main h1").inner_text()
        check("Welcome, Keitumetse" in heading, f"partner welcome heading is wrong: {heading!r}")
        check("Orange Botswana" in page.locator("#authPartnerWorkspace").inner_text(),
              "partner workspace does not show the partner organisation")
        goto(page, base, "partner-documents.html")
        check(page.url.endswith("/partner-documents.html"),
              f"partner was redirected away from an allowed partner page: {page.url}")
        assert_clean(errors)


def test_member_login_and_header(browser: Browser, base: str) -> None:
    with browser_page(browser) as (page, errors):
        login(page, base, "login.html", JACKSON)
        wait_for_url(page, r"/index\.html$")
        check(session_profile(page) == "MEM-DEMO-001", "member session has the wrong profile")
        check(page.locator("#loginToggleBtn").inner_text() == "Logout",
              "header does not show Logout after member sign-in")
        check(page.evaluate("() => BOPEUAuth.session().displayName") == "Jackson Michaels",
              "member session does not expose the signed-in identity")
        assert_clean(errors)


def test_logout_then_legacy_flag(browser: Browser, base: str) -> None:
    with browser_page(browser) as (page, errors):
        login(page, base, "login.html", JACKSON)
        wait_for_url(page, r"/index\.html$")
        page.click("#loginToggleBtn")
        page.wait_for_selector("#login-modal.active")
        check(page.locator("#loginToggleBtn").inner_text() == "Login",
              "header does not show Login after sign-out")
        check(session_profile(page) == "", "session survived sign-out")
        check(page.evaluate("() => localStorage.getItem('bopeu_logged_in')") in (None, "null"),
              "legacy login flag survived sign-out")

        # A stale bopeu_logged_in flag must not turn the header into a dead
        # "Logout" button that opens the login form.
        page.evaluate("() => localStorage.setItem('bopeu_logged_in', 'true')")
        page.evaluate("() => localStorage.removeItem('bopeu_session')")
        page.reload(wait_until="domcontentloaded")
        page.wait_for_timeout(120)
        check(page.locator("#loginToggleBtn").inner_text() == "Logout",
              "legacy flag was not recognised by the header")
        page.click("#loginToggleBtn")
        page.wait_for_selector("#login-modal.active")
        check(page.locator("#loginToggleBtn").inner_text() == "Login",
              "clicking Logout with only a legacy flag did not clear it")
        check(page.evaluate("() => localStorage.getItem('bopeu_logged_in')") in (None, "null"),
              "legacy flag remained after the header Logout click")
        assert_clean(errors)


def test_single_header_toggle_on_help(browser: Browser, base: str) -> None:
    with browser_page(browser) as (page, errors):
        goto(page, base, "help-tab.html")
        check(page.locator("#loginToggleBtn").count() == 1,
              "help page has more than one login toggle")
        check(page.locator("#loginToggleBtn").inner_text() == "Login",
              "help login toggle is not labelled Login")
        page.evaluate("() => { if (window.closeModal) closeModal('login-modal'); }")
        page.click("#loginToggleBtn")
        page.wait_for_selector("#login-modal.active")
        check(page.locator("#authWhatsapp").is_visible(),
              "help login toggle did not open the login form")
        assert_clean(errors)


def test_invalid_credentials(browser: Browser, base: str) -> None:
    with browser_page(browser) as (page, errors):
        goto(page, base, "login.html")
        page.fill("#authWhatsapp", JACKSON[0])
        page.fill("#authFirstName", JACKSON[1])
        page.fill("#authPassword", "wrong-password")
        page.click("button.auth-submit")
        page.wait_for_selector("#authError.show")
        check("Check your password" in page.locator("#authError").inner_text(),
              "wrong-password error copy is missing")
        page.fill("#authFirstName", "Nobody")
        page.fill("#authPassword", DEMO_PASSWORD)
        page.click("button.auth-submit")
        check("No account matches" in page.locator("#authError").inner_text(),
              "unknown-profile error copy is missing")
        assert_clean(errors)


def test_registration_and_duplicate(browser: Browser, base: str) -> None:
    with browser_page(browser) as (page, errors):
        dialogs: list[str] = []
        page.on("dialog", lambda dialog: (dialogs.append(dialog.message), dialog.accept()))
        goto(page, base, "register.html")
        page.fill("#rFirst", "Test")
        page.fill("#rSurname", "Member")
        page.fill("#rWhatsapp", "71 999 001")
        page.fill("#rPassword", "abcd")
        page.fill("#rPasswordConfirm", "abcd")
        page.fill("#rOmang", "TEST-OMANG-001")
        page.fill("#rDob", "1990-01-01")
        page.click("#regNext")
        page.fill("#rEmail", "test.member@example.com")
        page.fill("#rEmployer", "Demo Employer")
        page.fill("#rJob", "Demo Officer")
        page.click("#regNext")
        page.wait_for_selector("#rConsent1")
        page.check("#rConsent1")
        page.check("#rConsent2")
        page.click("#regNext")
        wait_for_url(page, r"/index\.html$")
        check(any("Account created" in message for message in dialogs),
              "registration success message is missing")
        check(session_profile(page).startswith("ACC-"), "new member account did not start a session")

        goto(page, base, "register.html")
        page.fill("#rFirst", "Test")
        page.fill("#rSurname", "Member")
        page.fill("#rWhatsapp", "71 999 001")
        page.fill("#rPassword", "abcd")
        page.fill("#rPasswordConfirm", "abcd")
        page.fill("#rOmang", "TEST-OMANG-001")
        page.fill("#rDob", "1990-01-01")
        page.click("#regNext")
        page.fill("#rEmail", "test.member@example.com")
        page.fill("#rEmployer", "Demo Employer")
        page.fill("#rJob", "Demo Officer")
        page.click("#regNext")
        page.wait_for_selector("#rConsent1")
        page.check("#rConsent1")
        page.check("#rConsent2")
        page.click("#regNext")
        wait_for_url(page, r"/login\.html$")
        check(any("already exists" in message for message in dialogs),
              "duplicate registration was not rejected")
        assert_clean(errors)


def test_password_change_then_sign_in(browser: Browser, base: str) -> None:
    with browser_page(browser) as (page, errors):
        login(page, base, "login.html", JACKSON)
        wait_for_url(page, r"/index\.html$")
        goto(page, base, "security.html")
        check(page.locator("#pwdStatus").count() == 1, "security status element is missing")

        page.fill("#curPwd", "nope")
        page.fill("#newPwd", "5678")
        page.fill("#cnfPwd", "5678")
        page.click("button:has-text('Update password')")
        page.wait_for_selector("#pwdStatus.auth-error.show")
        check("incorrect" in page.locator("#pwdStatus").inner_text(),
              "wrong current password was not rejected")

        page.fill("#curPwd", DEMO_PASSWORD)
        page.fill("#newPwd", "5678")
        page.fill("#cnfPwd", "5678")
        page.click("button:has-text('Update password')")
        page.wait_for_selector("#pwdStatus.auth-ok")
        check("Password updated" in page.locator("#pwdStatus").inner_text(),
              "password change did not confirm success")

        page.evaluate("() => BOPEUAuth.clearSessionFlags()")
        goto(page, base, "login.html")
        page.fill("#authWhatsapp", JACKSON[0])
        page.fill("#authFirstName", JACKSON[1])
        page.fill("#authPassword", "5678")
        page.click("button.auth-submit")
        wait_for_url(page, r"/index\.html$")
        check(session_profile(page) == "MEM-DEMO-001", "new password did not sign the member in")
        assert_clean(errors)


def test_forgot_password_reset(browser: Browser, base: str) -> None:
    with browser_page(browser) as (page, errors):
        goto(page, base, "forgot-password.html")
        page.fill("#resetWhatsapp", JACKSON[0])
        page.fill("#resetFirstName", JACKSON[1])
        page.click("button:has-text('Continue')")
        page.wait_for_selector("#resetStep2.active")
        page.fill("#resetNewPassword", "9999")
        page.fill("#resetConfirmPassword", "9999")
        page.click("button:has-text('Save new password')")
        page.wait_for_selector("#resetStep3.active")
        page.click("a:has-text('Go to sign in')")
        wait_for_url(page, r"/login\.html$")
        page.fill("#authWhatsapp", JACKSON[0])
        page.fill("#authFirstName", JACKSON[1])
        page.fill("#authPassword", "9999")
        page.click("button.auth-submit")
        wait_for_url(page, r"/index\.html$")
        check(session_profile(page) == "MEM-DEMO-001", "reset password did not sign the member in")
        assert_clean(errors)


def test_next_matrix(browser: Browser, base: str) -> None:
    cases = [
        ("member cannot jump to staff admin", "login.html?next=admin-dashboard.html", JACKSON, r"/index\.html$"),
        ("member can continue to security", "login.html?next=security.html", JACKSON, r"/security\.html$"),
        ("marketing cannot jump to audit log", "admin-login.html?next=admin-audit-log.html", NALEDI, r"/admin-dashboard\.html$"),
        ("marketing can continue to content", "admin-login.html?next=admin-content.html", NALEDI, r"/admin-content\.html$"),
        ("super admin can continue to staff", "admin-login.html?next=admin-staff.html", OTSILE, r"/admin-staff\.html$"),
        ("partner can continue to offers", "partner-login.html?next=partner-offers.html", KEITUMETSE, r"/partner-offers\.html$"),
        ("partner cannot jump to admin", "partner-login.html?next=admin-dashboard.html", KEITUMETSE, r"/partner-dashboard\.html$"),
    ]
    for label, path, credentials, expected in cases:
        with browser_page(browser) as (page, errors):
            login(page, base, path, credentials)
            wait_for_url(page, expected)
            check(session_profile(page) != "", f"{label}: no session was created")
            assert_clean(errors)


def main() -> int:
    server, base = start_server()
    print(f"BOPEU auth verification against {base}")
    try:
        with sync_playwright() as playwright:
            browser = playwright.chromium.launch(headless=True)
            tests = [
                ("login form renders", test_login_render),
                ("header modal works at 320px", test_header_modal_at_320),
                ("demo tiles remain 90x90 on mobile", test_demo_tiles_are_90px),
                ("staff role navigation and denial", test_staff_role_navigation_and_deep_link),
                ("partner deep link", test_partner_deep_link),
                ("member sign-in", test_member_login_and_header),
                ("logout and legacy flag", test_logout_then_legacy_flag),
                ("single header toggle on help", test_single_header_toggle_on_help),
                ("invalid credentials", test_invalid_credentials),
                ("registration and duplicate rejection", test_registration_and_duplicate),
                ("password change then sign-in", test_password_change_then_sign_in),
                ("forgot-password reset", test_forgot_password_reset),
                ("next-parameter matrix", test_next_matrix),
            ]
            for name, test in tests:
                run_test(name, lambda test=test: test(browser, base))
            browser.close()
    finally:
        server.shutdown()
        server.server_close()

    print()
    print(f"{len(PASSED)} passed, {len(FAILED)} failed")
    if FAILED:
        for name, error in FAILED:
            print(f"  FAILED: {name}: {error}")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
