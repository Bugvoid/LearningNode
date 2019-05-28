var fs = require("fs");

var https = require("https");

var privateKey = fs.readFileSync("38433423_localhost.key", "utf8");

var certificate = fs.readFileSync("38433423_localhost.cert", "utf8");

var credentials = { key: privateKey, cert: certificate };

var express = require("express");

var app = express();

var httpsServer = https.createServer(credentials, app);

httpsServer.listen(8443, () =>{
    console.log("Rodando")
});

app.get("/teste", function (req, res) {

    res.write("ola mundo criptografado");
    
    res.end();
    
    });
    