@echo off
echo ===============================================
echo   Запуск локального веб-сервера
echo   Конструктор шкафов-купе
echo ===============================================
echo.

:: Проверяем наличие Python
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Python найден. Запускаем сервер на Python...
    echo.
    echo Откройте браузер и перейдите по адресу:
    echo http://localhost:8000
    echo.
    echo Для остановки сервера нажмите Ctrl+C
    echo.
    python -m http.server 8000
    goto :end
)

:: Проверяем наличие Node.js
node --version >nul 2>&1
if %errorlevel% == 0 (
    echo Node.js найден. Запускаем сервер на Node.js...
    echo.
    echo Откройте браузер и перейдите по адресу:
    echo http://localhost:8000
    echo.
    echo Для остановки сервера нажмите Ctrl+C
    echo.
    npx http-server -p 8000
    goto :end
)

:: Если ни Python, ни Node.js не найдены
echo ОШИБКА: Не найден Python или Node.js
echo.
echo Для запуска локального сервера установите одну из программ:
echo.
echo 1. Python: https://www.python.org/downloads/
echo 2. Node.js: https://nodejs.org/
echo.
echo После установки запустите этот файл снова.
echo.
pause

:end
echo.
echo Сервер остановлен.
pause 