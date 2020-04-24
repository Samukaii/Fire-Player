@echo off
title Menu Inicial de Desenvolvimento
set var=%1

if DEFINED var (
 goto main
)

:clean
c:/samuka/aplicativos/fireplayer/hubproject/cleanHub.bat

:main
c:/samuka/aplicativos/fireplayer/hubproject/mainHub.bat

:exit