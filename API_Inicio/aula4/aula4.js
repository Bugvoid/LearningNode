let http = require('http')

http.createServer(function(req,res){
    res.write('Caramba igual JSP, so que melhor ahsash')
    res.end()
}).listen(3000)

console.log('Servidor rodando')