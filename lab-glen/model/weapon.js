const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const weaponSchema = Schema({
  name : {type: String, required: true},
  price : {type: Number, max: 1048},
  type: {type: String, max: 1048},
  weaponId : {type: Schema.Types.ObjectId, required: true},
});

module.exports = mongoose.model('weapon', weaponSchema);
