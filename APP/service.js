//import pkg from'node-windows'
//const {Service} = pkg;
const Service = require('node-windows').Service


const svc =  new Service({
    name: "Link-Api-App",
    description: "Link-Api-App",
    script: "init.js"
})

svc.on('install', function(){
    svc.start()
})

svc.install()
