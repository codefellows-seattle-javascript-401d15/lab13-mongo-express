const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Weapon = require('./weapon.js');

const blueprintSchema = Schema ({
  name : {type: String, required: true},
  details: {type:String, max: 1048},
  timeStamp: {type: Date, default: Date.now},
  weapons: [{type: Schema.Types.ObjectId, ref: 'weapon'}],
});

const Blueprint = module.exports = mongoose.model('blueprint', blueprintSchema);

Blueprint.findByIdAndAddWeapon = function(id, weapon) {
  return Blueprint.findById(id)
  .then(blueprint => {
    weapon.weaponId = blueprint._id;
    this.tempblueprint = blueprint;
    return new Weapon(weapon).save();
  })
  .then(weapon => {
    this.tempblueprint.weapons.push(weapon._id);
    this.tempWeapon = weapon;
    return this.tempblueprint.save();
  })
  .then(() => this.tempWeapon)
  .catch(err => Promise.reject(err));
};
