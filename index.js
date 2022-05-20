const express = require("express");
const path = require('path');
const os = require('os');
const router = express.Router();
const sudo = require('sudo-js');
const fs = require('fs');
const res = require("express/lib/response");
require('dotenv').config();

sudo.setPassword(process.env.ROOT_PWD);
var restartPwd = process.env.RESTART_PWD;

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

router.get('/', function(req, res) {

    res.sendFile(path.join(__dirname, "/index.html"));
});

router.post('/restart', function(req, res) {
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

router.get('/status', function(req, res) {
    fs.readFile('../state', 'utf8', (err, state) => {
        if (err) {
          console.error(err);
          return;
        }
        res.send(state);
      });
    
});

router.get('/uptime', function(req, res) {
    var uptime = os.uptime();

    res.send(sec2time(uptime));
});

app.use("/", router)
app.listen(8080);