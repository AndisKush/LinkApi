net stop linkapiapp.exe
net stop linkapiwebapi.exe
taskkill -f -im linkapiapp.exe
taskkill -f -im linkapiwebapi.exe
cd..
git config --global --add safe.directory %CD%
git pull
