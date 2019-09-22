const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    no : {type: Number},
    name : {type : String},
    item : {type : Array},
    age : {type : String}
},
{timestamps : {
 createdAt : 'created',
 updatedAt : 'updated',
}})

module.exports = mongoose.model('Player',schema)
