const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const weaponItem = Schema({
  name : {type: String, required: true},
  price : {type: Number, max: 1048},
  type: {type: String, max: 1048},
  date: {type: Date, default: Date.now},
});

module.exports = mongoose.model('weapon', weaponItem);
