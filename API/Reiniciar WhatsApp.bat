@echo off
echo Pausando Servico...
net stop Link-Api-WebApi

ping 127.0.0.1 -n 4 > nul

echo Iniciando Servico...
net start Link-Api-WebApi

echo Serviço reiniciado após pausa de 3 segundos.