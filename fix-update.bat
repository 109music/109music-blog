@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ============================================
echo  109MUSIC blog - colocar la actualizacion
echo ============================================
echo.

if not exist ".git" (
  echo ERROR: este .bat no esta dentro de la carpeta blog.
  echo Tiene que estar en Desktop\109MUSIC-automation\blog\
  echo.
  pause
  exit /b 1
)

if not exist "109music-blog-update\src\lib\site.ts" (
  echo No encuentro 109music-blog-update\src\lib\site.ts
  echo.
  echo O ya lo has movido, o el zip se extrajo en otro sitio.
  echo Comprueba mas abajo si los archivos ya estan en su sitio.
  echo.
  goto :verify
)

echo Moviendo archivos a su sitio...
echo.

REM /E todas las subcarpetas, /MOVE borra el origen al terminar,
REM /IS /IT sobrescribe aunque el archivo parezca igual,
REM /XF excluye el LEEME para que no acabe en la raiz del repo.
robocopy "109music-blog-update" "." /E /MOVE /IS /IT /XF LEEME.txt /NFL /NDL /NJH /NJS >nul
set RC=%errorlevel%

REM robocopy: 0-7 es exito, 8 o mas es error real.
if %RC% GEQ 8 (
  echo ERROR: robocopy fallo con codigo %RC%. No se ha movido nada seguro.
  echo Hazlo a mano siguiendo las instrucciones del chat.
  echo.
  pause
  exit /b 1
)

REM La carpeta queda con el LEEME dentro. Fuera.
if exist "109music-blog-update" rd /s /q "109music-blog-update"
if exist "LEEME.txt" del /q "LEEME.txt"

:verify
echo ============================================
echo  COMPROBACION
echo ============================================
set FAIL=0

call :check "src\pages\results\index.astro"
call :check "src\pages\business\index.astro"
call :check "src\pages\music-marketing\case-studies\index.astro"
call :check "src\components\ResultCard.astro"
call :check "src\components\SectionMarker.astro"

findstr /c:"pathOf" "src\lib\site.ts" >nul 2>&1
if errorlevel 1 (echo   FALTA  site.ts sin pathOf - NO se actualizo & set FAIL=1) else (echo   OK     src\lib\site.ts)

findstr /c:"AURA PASS" "src\styles\global.css" >nul 2>&1
if errorlevel 1 (echo   FALTA  global.css sin el bloque nuevo & set FAIL=1) else (echo   OK     src\styles\global.css)

findstr /c:"109MUSIC.CO" "src\pages\index.astro" >nul 2>&1
if errorlevel 1 (echo   FALTA  index.astro sin el hero nuevo & set FAIL=1) else (echo   OK     src\pages\index.astro)

if exist "109music-blog-update" (echo   AVISO  la carpeta 109music-blog-update sigue ahi & set FAIL=1)

echo.
if "%FAIL%"=="1" (
  echo ============================================
  echo  ALGO FALTA. No ejecutes publish.bat todavia.
  echo  Copia esta pantalla al chat.
  echo ============================================
  echo.
  pause
  exit /b 1
)

echo ============================================
echo  TODO EN SU SITIO.
echo.
echo  Ahora ejecuta publish.bat. El commit tambien
echo  borrara del repositorio la carpeta suelta que
echo  se subio por error en el intento anterior.
echo ============================================
echo.
pause
exit /b 0

:check
if exist "%~1" (echo   OK     %~1) else (echo   FALTA  %~1 & set FAIL=1)
exit /b 0
