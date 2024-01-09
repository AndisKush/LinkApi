const { exec } = require('child_process');
const { Service } = require('node-windows');

function startServices() {
    console.log('Start');

    const servicesToCheck = ['linkapiapp.exe', 'linkapiwebapi.exe','linkapiapp2.exe', 'linkapiwebapi2.exe','linkapiapp3.exe', 'linkapiwebapi3.exe'];

    servicesToCheck.forEach(serviceName => {
        exec(`net start ${serviceName}`, (error, stdout, stderr) => {
            if (error !== null) {
                console.log(`Error starting ${serviceName}: ${error}`);
            } else {
                console.log(`${serviceName} started successfully.`);
            }
        });
    });
}

// Agendar a execução a cada 30 minutos
setInterval(startServices, 30 * 60 * 1000);
