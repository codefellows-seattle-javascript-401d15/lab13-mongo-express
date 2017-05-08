'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Dog = require('../model/dog');

module.exports = exports = {};

exports.createDog = function(dog) {
  if(!dog) return Promise.reject(createError(400, 'Dog required'));
  return new Dog(dog).save();
};

exports.getSingleDog = function(id) {
  if(!id) return Promise.reject(createError(400, 'ID required'));
  return Dog.findById(id);
};

exports.getAllDogs = function() {
  return Dog.find();
};

exports.updateDog = function(id, newDog) {
  return Dog.findByIdAndUpdate(id, {name: newDog.name, breed: newDog.breed}, {new: true});
};

exports.deleteDog = function(id) {
  if(!id) return Promise.reject(createError(400, 'ID required'));
  return Dog.findByIdAndRemove(id);
};
