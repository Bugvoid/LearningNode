const Item = require('./item')

Item.methods(['get','post','put','delete'])
Item.updateOptions({new: true, runValidators:true})

module.exports = Item