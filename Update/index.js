const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors());
app.use(express.urlencoded({extended: false, limit: '50mb'}))
app.use(express.json({limit: '50mb'}))

function startServices(){
    console.log('Start')
    require('child_process').exec('net start linkapiapp.exe', function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });

    require('child_process').exec('net start linkapiwebapi.exe', function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    });
}


async function startBatUpdate(callback){
    console.log('Start Bat Update')
    require('child_process').exec('call update.bat', async function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
            return callback(error, null)
        }else{
            console.log('espera 5')
            await new Promise(resolve => setTimeout(resolve, 5000))
            console.log('terminou')
            startServices()
            return callback(null, true)
        }
    });

    
}
app.get('/update', (req, res)=>{
    startBatUpdate(function(error,result){
        if(error){
            return res.status(200).json(false)
        }else{
            return res.status(200).json(true)
        }
    })
})


app.listen(5025, ()=>{
    console.log(">>> Update started <<<")
})