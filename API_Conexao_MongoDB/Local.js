let mongodb = require("mongodb").MongoClient;

let servidor = "mongodb://localhost:27017/local";
//mongodb+srv://root:root@cluster0-huzkm.mongodb.net/test?retryWrites=true
//mongodb://localhost:27017/local

mongodb.connect(servidor, function(err, db) {
  if (err) console.log("Erro do banco" + err);
  else console.log("Conectado");

  db.close();
});
