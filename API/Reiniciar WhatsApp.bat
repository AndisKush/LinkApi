@echo off
echo Pausing Service...
net stop Link-Api-WebApi

rmdir /s /q "C:\LinkApi\API\.wwebjs_auth"
rmdir /s /q "C:\LinkApi\API\.wwebjs_cache"

ping 127.0.0.1 -n 4 > nul

echo Resuming Service...
net start Link-Api-WebApi

echo Serviço reiniciado após pausa de 3 segundos.