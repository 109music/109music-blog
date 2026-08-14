@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ============================================
echo  109MUSIC blog - update 3 (listados + home)
echo ============================================
echo.

if not exist ".git" (
  echo ERROR: este .bat tiene que estar en Desktop\109MUSIC-automation\blog\
  echo.
  pause & exit /b 1
)

if not exist "109music-update-3.zip" (
  echo ERROR: no encuentro 109music-update-3.zip junto a este .bat.
  echo Los dos archivos tienen que estar en la misma carpeta, blog\
  echo.
  pause & exit /b 1
)

REM Extraer a una carpeta temporal y fusionar desde ahi. La ultima vez el
REM "Extraer todo" de Windows creo una subcarpeta y nada llego a su sitio;
REM asi el destino no depende de donde haga clic nadie.
if exist "_tmp_update" rd /s /q "_tmp_update"
echo Extrayendo...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '109music-update-3.zip' -DestinationPath '_tmp_update' -Force"
if errorlevel 1 (
  echo ERROR: fallo al extraer. No se ha tocado nada.
  echo.
  pause & exit /b 1
)

if not exist "_tmp_update\src\styles\global.css" (
  echo ERROR: el zip no tiene la estructura esperada. No se ha tocado nada.
  rd /s /q "_tmp_update"
  echo.
  pause & exit /b 1
)

echo Colocando archivos...
robocopy "_tmp_update" "." /E /IS /IT /NFL /NDL /NJH /NJS >nul
set RC=%errorlevel%
if %RC% GEQ 8 (
  echo ERROR: robocopy fallo con codigo %RC%.
  echo.
  pause & exit /b 1
)
rd /s /q "_tmp_update"

echo.
echo ============================================
echo  COMPROBACION
echo ============================================
set FAIL=0

call :exists "src\components\Row.astro"

call :contains "src\styles\global.css"  "PASE 3"                "pase 3 en el CSS"
call :contains "src\styles\global.css"  ".sec-head::after { display: none"  "filetes lavanda fuera"
call :contains "src\styles\global.css"  ".offergrid"            "estanteria what we got for you"
call :contains "src\styles\global.css"  ".row-date .d"          "patron de News en los listados"
call :contains "src\components\Row.astro" "row-date"            "Row reescrito"
call :contains "src\pages\index.astro"  "what_we_got_for_you"   "home reordenada"
call :contains "src\pages\index.astro"  "number one source"     "hero nuevo"

echo.
if "%FAIL%"=="1" (
  echo ============================================
  echo  ALGO FALTA. No ejecutes publish.bat.
  echo  Copia esta pantalla al chat.
  echo ============================================
  echo.
  pause & exit /b 1
)

echo ============================================
echo  TODO EN SU SITIO. Ejecuta publish.bat.
echo ============================================
echo.
pause
exit /b 0

:exists
if exist "%~1" (echo   OK     %~1) else (echo   FALTA  %~1 & set FAIL=1)
exit /b 0

:contains
findstr /c:"%~2" "%~1" >nul 2>&1
if errorlevel 1 (echo   FALTA  %~3 & set FAIL=1) else (echo   OK     %~3)
exit /b 0
