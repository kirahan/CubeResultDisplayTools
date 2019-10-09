const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String,
    select: false, 
    set(val) {
      return require("bcrypt").hashSync(val, 10);
    }
  },
  accesslevel: { type: String },
  userinfo : { type : Object,
    email : {type :String},
    phone : {type : String},
    country : {type : String},
    age : {type: Number},
    gender : {type : String},
    wcaid : {type : String}
  }
  

});

module.exports = mongoose.model("NormalUser", schema);
