@echo off
REM BOPEU Member App Launcher
REM This batch file opens the multi-page BOPEU app launcher

:: Set the application directory
set APP_DIR=%~dp0

:: Check if we're in the right directory
if not exist "%APP_DIR%index.html" (
    echo Error: index.html not found in %APP_DIR%
    echo Please run this script from the Bopeu2 directory
    pause
    exit /b 1
)

:: Open the timeline feed (the app now opens to timeline feed, not launcher)
start "" "%APP_DIR%index.html"

:: Display completion message
echo BOPEU Member App Timeline Feed launched successfully!
echo.
echo The app is now running in your default web browser.
echo.
echo Note: Some features may require internet connection for external resources.

echo.
echo APP OPENED ON: Timeline Feed (replaced original launcher)
pause