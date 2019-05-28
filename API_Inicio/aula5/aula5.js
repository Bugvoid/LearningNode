let http = require('http')
let fs = require('fs')

http.createServer(function(req, res){
    console.log("dads")
}).listen(3000)

console.log('Servidor rodando')