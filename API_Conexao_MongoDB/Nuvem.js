const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://root:root@cluster0-huzkm.mongodb.net/?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("local").collection("teste");
  // perform actions on the collection object
  console.log('Ta conectando')
  client.close();
});


