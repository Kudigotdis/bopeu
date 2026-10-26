# Mobile-First Constraints (Non-Negotiable)

1.  **Minimum Font Size:** Body text, labels, and input fields must be **16px** on mobile to prevent browser zoom.
2.  **Safe Areas:** Use `env(safe-area-inset-*)` for padding/margin to handle notches and home indicators.
3.  **Spacing:** Use an **8px grid** for all padding, margins, and gaps (`p-2` = 8px, `p-4` = 16px, etc.).
4.  **Viewport Height:** Use `min-h-svh` for full-screen mobile layouts instead of `100vh`.
5.  **Touch Targets:** Ensure interactive elements are at least **48x48px**.
