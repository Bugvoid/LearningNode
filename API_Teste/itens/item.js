const restful = require('node-restful')
const mongoose = restful.mongoose

const itemSchema = new mongoose.Schema({
    name:{type: String, require: true},
    type:{type: String, require:true},
    amout:{type: Number, min: 0, require:true},
    marca:{type: String, require:true},
    porotitipa:{type:String, require:true},
    
},{
    versionKey: ""
    
})

module.exports = restful.model('Item', itemSchema)