@echo off
:main
cls
echo ======================================================================
echo ================= Menu Inicial de Desenvolvimento ====================
echo ======================================================================
echo.
echo Escolha uma opcao:
echo (1) Para abrir o emulador
echo (2) Para abrir o VS Code
echo (3) Para abrir o Opera
echo (4) Para abrir o Youtube Music
echo (5) Para limpar o projeto
echo (6) Para instalar o aplicativo no emulador via react-native
echo (7) Para instalar o aplicativo no emulador via gradlew
echo (8) Para iniciar o aplicativo
echo (9) Para iniciar o aplicativo com cache resetado
echo (e) Para editar este arquivo
echo (s) Para sair do Hub
echo (x) Para sair do terminal
set /p choose=Esperando resposta...

if %choose% == 1 (goto emul)
if %choose% == 2 (goto vscode)
if %choose% == 3 (goto opera)
if %choose% == 4 (goto ytmusic)
if %choose% == 5 (goto cleanproj)
if %choose% == 6 (goto installapprn)
if %choose% == 7 (goto installappgd)
if %choose% == 8 (goto startapp)
if %choose% == 9 (goto startappreset)
if %choose% == e (goto editfile)
if %choose% == s (goto exit)
if %choose% == x (goto exitterm)
cls
echo Por favor, insira um valor correto
goto main

:emul
cls
echo ======================================================================
echo ================= Menu Inicial de Desenvolvimento ====================
echo ======================================================================
echo.
echo Escolha um emulador:
echo (1) Para Google Pixel
echo (2) Para Nexus 5X
echo (0) Para Voltar
set /p chooseE=Esperando resposta...

if %chooseE% == 1 (
echo Abrindo Google Pixel
start c:/samuka/aplicativos/fireplayer/hubproject/script.bat GPX
goto wantexit
)

if %chooseE% == 2 (
echo Abrindo Nexus 5X
start c:/samuka/aplicativos/fireplayer/hubproject/script.bat GNX
goto wantexit
)

if %chooseE% == 0 (goto main)
cls
echo Por favor, insira um valor correto
goto emul

:vscode
code .
goto wantexit

:opera
start opera.exe
goto wantexit

:ytmusic
%USERPROFILE%\AppData\Local\Programs\youtube-music-desktop-app\"YouTube Music Desktop App.exe"
goto wantexit

:cleanproj
cd C:\Samuka\Aplicativos\FirePlayer\android
start gradlew clean
cd ..
goto wantexit

:installappgd
cd C:\Samuka\Aplicativos\FirePlayer\android
start gradlew assembleDebug
echo Aguarde a conclusao do build do App e continue
pause
cd C:\Samuka\Aplicativos\FirePlayer\android\app\build\outputs\apk\debug
start adb install app-debug.apk
echo Aguarde a instalacao do App e continue
pause
start npx react-native start --port=8081
echo Servidor do React Native rodando na porta 8081
echo Espere o fim da inicializacao do servidor
echo abra o aplicativo e continue
pause
start adb reverse tcp:8081 tcp:8081
echo Portas linkadas
echo Reiniciando App...
start adb shell input keyevent 46 46
cd C:\Samuka\Aplicativos\FirePlayer
goto wantexit

:installapprn
cd C:\Samuka\Aplicativos\FirePlayer
start npx react-native run-android
goto wantexit

:startapp
cd C:\Samuka\Aplicativos\FirePlayer
set /p port=Em que porta voce quer executar?
cls
npx react-native start --port=%port%

:startappreset
cd C:\Samuka\Aplicativos\FirePlayer
set /p port=Em que porta voce quer executar?
cls
npx react-native start --port=%port% --reset-cache

:editfile
start notepad C:\Samuka\Aplicativos\FirePlayer\HubProject\cleanHub.bat
goto wantexit

:exitterm
cls
exit

:wantexit
set /p quit=Voce deseja sair?^(Y/N^)
if %quit% == y (goto exit)
goto main
:exit
cls







