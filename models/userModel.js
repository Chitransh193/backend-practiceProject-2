const mongoose = require("mongoose");
mongoose.connect("DB URL");
const userSchema = new mongoose.Schema({
  name : String,
  email : String,
  imageurl : String
})

module.exports = mongoose.model("user",userSchema);