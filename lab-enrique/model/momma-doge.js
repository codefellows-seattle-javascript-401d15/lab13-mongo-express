const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Doge = require('./doge.js');

const mommaSchema = Schema ({
  name : {type: String, required: true},
  type: {type:String, max: 1048},
  born: {type: Date, default: Date.now},
  doges: [{type: Schema.Types.ObjectId, ref: 'doge'}],
});

const Momma = module.exports = mongoose.model('momma', mommaSchema);

Momma.findByIdAndAddDoge = function(id, doge) {
  return Momma.findById(id)
  .then(momma => {
    doge.dogeId = momma._id;
    this.tempmomma = momma;
    return new Doge(doge).save();
  })
  .then(doge => {
    this.tempmomma.doges.push(doge._id);
    this.tempDoge = doge;
    return this.tempmomma.save();
  })
  .then(() => this.tempmomma)
  .catch(err => Promise.reject(err));
};
