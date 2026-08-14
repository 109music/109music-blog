@echo off
setlocal enabledelayedexpansion
cd /d "%~dp0"

echo ============================================
echo  109MUSIC blog - update 2 (capa de imagen)
echo ============================================
echo.

if not exist ".git" (
  echo ERROR: este .bat tiene que estar en Desktop\109MUSIC-automation\blog\
  echo.
  pause & exit /b 1
)

if not exist "109music-update-2.zip" (
  echo ERROR: no encuentro 109music-update-2.zip junto a este .bat.
  echo Los dos archivos tienen que estar en la misma carpeta, blog\
  echo.
  pause & exit /b 1
)

REM Extraer a una carpeta temporal y fusionar desde ahi. La ultima vez el
REM "Extraer todo" de Windows creo una subcarpeta y nada llego a su sitio;
REM asi el destino no depende de donde haga clic nadie.
if exist "_tmp_update" rd /s /q "_tmp_update"
echo Extrayendo...
powershell -NoProfile -ExecutionPolicy Bypass -Command "Expand-Archive -LiteralPath '109music-update-2.zip' -DestinationPath '_tmp_update' -Force"
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

call :exists "src\components\Ambient.astro"
call :exists "public\img\hero-spectrum.webp"

call :contains "src\styles\global.css"  "PASE 2"            "capa de imagen en el CSS"
call :contains "src\styles\global.css"  ".momenthead h2"    "bloques de momento"
call :contains "src\styles\global.css"  ".masthead h1 { text-transform: none" "h1 de articulo en caja de frase"
call :contains "src\styles\global.css"  "font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em;" "tipografia del desplegable"
call :contains "src\pages\index.astro"  "herobg"            "fondo del hero"
call :contains "src\pages\404.astro"    "display face"      "h1 de la 404"
call :contains "src\pages\tags\[tag].astro" "display face rise" "h1 de los archivos de topic"

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
