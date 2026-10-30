@echo off
title Maison Verlaine - Configurateur 3D
cd /d "%~dp0"
echo Demarrage du configurateur 3D Maison Verlaine...
start "" /min python -m http.server 8777
timeout /t 2 /nobreak >nul
start "" http://localhost:8777/viewer/
echo.
echo  Le configurateur 3D s'ouvre dans votre navigateur.
echo  GARDEZ cette fenetre ouverte pendant l'utilisation.
echo  Fermez-la pour arreter.
echo.
pause >nul
