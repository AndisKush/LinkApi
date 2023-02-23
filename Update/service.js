const pkg = require('node-windows')
const {Service} = pkg;
const {path} = require('path');

const svc =  new Service({
    name: "Link-Api-Update",
    description: "Updater LinkApi",
    script: "index.js",
    execPath: path
})

svc.on('install', function(){
    svc.start()
})

svc.install()