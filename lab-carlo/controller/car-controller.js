'use strict';
//
// const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
// const createError = require('http-errors');
const Car = require('../model/cars');

module.exports = exports = {};


exports.createCar = function(auto) {
  return new Car(auto).save();
};

exports.fetchCar = function(id) {
  return Car.findById(id);

};

exports.deleteCar = function(id){
  return Car.findByIdAndRemove(id);
};

exports.putCar = function(auto, id) {
  return Car.findByIdAndUpdate(id, auto, {new: true});

};
