@echo off
setlocal
cd /d "%~dp0"

echo ====================================
echo  109MUSIC blog - publish changes
echo ====================================
echo.

git --version >nul 2>&1
if errorlevel 1 (
  echo ERROR: git is not installed or not on PATH. Nothing was pushed.
  echo.
  pause
  exit /b 1
)

if not exist ".git" (
  echo ERROR: this folder is not a git repository yet.
  echo Run setup-blog.bat in the parent folder first.
  echo.
  pause
  exit /b 1
)

git add -A

REM Is there anything staged to commit?
git diff --cached --quiet
if not errorlevel 1 (
  echo No changes to publish. GitHub already matches this folder.
  echo.
  pause
  exit /b 0
)

set MSG=%*
if "%MSG%"=="" set MSG=Update 109MUSIC blog

git commit -m "%MSG%"
if errorlevel 1 (
  echo.
  echo ====================================
  echo  COMMIT FAILED. Nothing was pushed.
  echo  The git error above is the real reason.
  echo ====================================
  echo.
  pause
  exit /b 1
)
for /f "delims=" %%c in ('git rev-parse --short HEAD') do echo Commit: %%c
echo.

echo Pushing. A GitHub sign-in window may open. That is normal.
echo.
git push origin main
set PUSHCODE=%errorlevel%
echo.
echo git push exit code: %PUSHCODE%
if not "%PUSHCODE%"=="0" (
  echo ====================================
  echo  PUSH FAILED. Nothing was published.
  echo  The git error above is the real reason.
  echo ====================================
  echo.
  pause
  exit /b 1
)

echo ====================================
echo  PUSH SUCCEEDED. Build running at
echo  https://github.com/109music/109music-blog/actions
echo  Live shortly: https://109music.github.io/109music-blog/
echo ====================================
echo.
pause
