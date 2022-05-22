const express = require("express");
const path = require('path');
const os = require('os');
//const router = express.Router();
const sudo = require('sudo-js');
const fs = require('fs');
const res = require("express/lib/response");
const serveIndex = require('serve-index');
require('dotenv').config();

sudo.setPassword(process.env.ROOT_PWD); // this is very stupid
var restartPwd = process.env.RESTART_PWD;

var backupLocation = process.env.BACKUP_LOCATION;

var app = express();

// https://gist.github.com/vankasteelj/74ab7793133f4b257ea3
function sec2time(timeInSeconds) {
    var pad = function(num, size) { return ('000' + num).slice(size * -1); },
    time = parseFloat(timeInSeconds).toFixed(3),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.slice(-3);

    return pad(hours, 2) + ':' + pad(minutes, 2) + ':' + pad(seconds, 2);
}

function cmd(command){
    sudo.exec(command, function(err, pid, result) {
        console.log(result);
    });
}

console.log("Pericolo Di Caduta - Server Console")

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.post('/restart', function(req, res) {
    if(req.get("password") == restartPwd){
        console.log("Restarting Minecraft Server...")
        console.log()
        cmd(["./restart.sh"])
        res.send("Server is now restarting.")
    } else {
        res.status(500);
        res.send("Invalid password")
    }
});

app.get('/status', function(req, res) {
    fs.readFile('../state', 'utf8', (err, state) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(state);
      });
    
});

app.get('/uptime', function(req, res) {
    var uptime = os.uptime();

    res.send(sec2time(uptime));
});

app.use(express.static('public'));
app.use('/backups', express.static(backupLocation), 
serveIndex(backupLocation, { 'icons': true}))

//app.use("/", router)
app.listen(8080);