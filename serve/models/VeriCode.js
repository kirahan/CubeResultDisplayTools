const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    uuid : {type : String},
    phone : {type : String},
    code : {type : String},

},
{timestamps : {
 createdAt : 'created',
 updatedAt : 'updated',
}})

module.exports = mongoose.model('VeriCode',schema)
