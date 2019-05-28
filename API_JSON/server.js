let express = require('express')
let bodyParser = require('body-parser')
let fs = require('fs')


let app = express()

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json());


app.use(function(req,res, next){
    res.setHeader("Origin","*")
    res.setHeader("Methods", "GET,POST,PUT,DELETE")
    res.setHeader("Headers","content-type")
    res.setHeader("Content-Type", "application/json")
    res.setHeader("Credencials", true)
    next();
})

app.listen(3000, function(){console.log('Servidor rodando')})


app.get('/api', function(req,res){
    fs.readFile('usuarios.json','utf8', function(err,data){
        if(err){
          let response = {status: 'fail', resultado:err};
            res.json(response)

        }else{
            let obj = JSON.parse(data)
            let result = 'Fail usuarios not null'

            obj.usuarios.forEach(function(usuarios){
                if(usuarios != null){
                    if(usuarios.usuarios_id == req.query.usuarios_id){
                        result = usuarios;
                    }
                }
            });

            let response = {status: 'sucesso', resultado:result};
            res.json(response);

        }
    })
})

app.post('/api', function(req,res){
    fs.readFile('usuarios.json','utf8', function(err, data){
        if(err){
            let response ={status: 'falha', resultado:err}
            res.json(response)
        }else{
            let obj = JSON.parse(data)
            req.body.usuarios_id = obj.usuarios.length + 1


            obj.usuarios.push(req.body);
            
            fs.writeFile('usuarios.json', JSON.stringify(obj), function(err){
                if(err){
                    let response = {status: 'falha', resultado: err}
                    res.json(response)

                }else{
                    let response = {status:'sucesso', 'resultado': 'Registrado incluso com sucesso'}
                    res.json(response)
                }
            })
        }
    })
})

app.put('/api', function(req,res){
    fs.readFile('usuarios.json', 'utf8', function(err,data){
        if(err){
            let response = {status: 'falha', resultado: err}
            res.json(response)
        }else{
            let obj = JSON.parse(data)

            obj.usuarios[(req.body.usuarios_id - 1)].nome = req.body.nome;
            obj.usuarios[(req.body.usuarios_id - 1)].site = req.body.site;

            fs.writeFile('usuarios.json', JSON.stringify(obj), function(err){
                if(err){
                    let response = {status: 'falha', resultado: err}
                    res.json(response)
                }else{
                    let response = {status: 'sucesso', resultado: 'Registro editado com sucesso'}
                    res.json(response)
                }
            })
        }
    })
})

app.delete('/api', function(req, res){
    fs.readFile('usuarios.json', 'utf8', function(err,data){
        if(err){
            let response = {status: 'falha', resultado : err}
            res.json(response)
        }else{
            let obj = JSON.parse(data)


            delete obj.usuarios[(req.body.usuarios_id - 1)]


            fs.writeFile('usuarios.json', JSON.stringify(obj), function(err){
                if(err){
                    let response ={status:'falha', resultado:err}
                    res.json(response)
                }else{
                    let response = {status: 'sucesso', resultado:'registro excluido com sucesso'}
                    res.json(response)
                }
            })
        }
    })
})