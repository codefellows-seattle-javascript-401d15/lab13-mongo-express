'use strict';

// const createError = require('http-errors');
const Pokemon = require('../models/pokemon');

module.exports = exports = {};

exports.createPokemon = function(pokemon) {
  return new Pokemon(pokemon).save();
};

exports.fetchPokemon = function(id) {
  return Pokemon.findById(id);
};

exports.gottaFetchEmAll = function() {
  return Pokemon.find({});
};

exports.updatePokemon = function(id, pokemon) {
  return Pokemon.findByIdAndUpdate(id, pokemon, {new: true});
};

exports.deletePokemon = function(id) {
  return Pokemon.findByIdAndRemove(id);
};
