//import pkg from'node-windows'
//const {Service} = pkg;
const Service = require('node-windows').Service


const svc =  new Service({
    name: "WebApi Front",
    description: "Client WebApp",
    script: "init.js"
})


svc.uninstall()
