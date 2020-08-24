@echo off
:main
echo ======================================================================
echo ==================Menu Inicial de Desenvolvimento=====================
echo ======================================================================
echo.
echo Escolha uma opcao:
echo (1) Para abrir o emulador
echo (2) Para abrir o VS Code
echo (3) Para limpar o projeto
echo (4) Para instalar o aplicativo no emulador via react-native
echo (5) Para instalar o aplicativo no emulador via gradlew
echo (6) Para iniciar o aplicativo
echo (c) Para limpar o terminal
echo (x) Para sair
set /p choose=Esperando resposta...

if %choose% == 1 (goto emul)
if %choose% == 2 (goto vscode)
if %choose% == 3 (goto cleanproj)
if %choose% == 4 (goto installapprn)
if %choose% == 5 (goto installappgd)
if %choose% == 6 (goto startapp)
if %choose% == c (goto cleancmd)
if %choose% == x (goto exit)
echo Por favor, insira um valor correto
goto main

:emul
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
echo Por favor, insira um valor correto
goto emul

:vscode
code .

:cleanproj
cd C:\Samuka\Aplicativos\FirePlayer\android
start gradlew clean
cd ..
goto wantexit

:installappgd
cd C:\Samuka\Aplicativos\FirePlayer\android
gradlew assembleDebug
echo Build do aplicativo completo
pause
cd C:\Samuka\Aplicativos\FirePlayer\android\app\build\outputs\apk\debug
adb install app-debug.apk
echo Aplicativo instalado
start npx react-native start --port=8081
echo Servidor do React Native rodando na porta 8081
echo Espere o fim da inicializacao do servidor
echo abra o aplicativo e continue
pause
adb reverse tcp:8081 tcp:8081
echo Portas linkadas
echo Reiniciando App...
adb shell input keyevent 46 46
cd C:\Samuka\Aplicativos\FirePlayer
goto wantexit

:installapprn
cd C:\Samuka\Aplicativos\FirePlayer
start npx react-native run-android
goto wantexit

:startapp
cd C:\Samuka\Aplicativos\FirePlayer
set /p port=Em que porta voce quer executar?
start npx react-native start --port=%port%
goto wantexit

:wantexit
set /p quit=Voce deseja sair?^(Y/N^)
if %quit% == y (goto exit)
goto main
:cleancmd
cls
goto main
:exit







