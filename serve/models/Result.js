const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    rank : {},
    id : {type : Number},
    name : {type : String},
    result : {type : Number},
    best : {type : Number},
    round : {type : String},
    item : {type : String},
    age : {type : String},
    t1 : {type : Number},
    t2 : {type : Number},
    t3 : {type : Number},
    t4 : {type : Number},
    t5 : {type : Number}
},
{timestamps : {
 createdAt : 'created',
 updatedAt : 'updated',
}})

module.exports = mongoose.model('Result',schema)
