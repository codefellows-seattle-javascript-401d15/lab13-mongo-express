'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Car = require('../model/cars');

module.exports = exports ={};

exports.createCar = function(req, res){
  new Car(req.body).save()
  .then(car => {
    res.json(car);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.fetchCar = function(id, res){

  if(!id) return Promise.reject(createError(404, 'car not found'));

  Car.findById(id)
    .then(car=>{
      console.log(car);
      res.json(car);
    })
    .catch(err => res.status(404).send(err.message));
};

exports.deleteCar = function(id, res){
  if(!id) return Promise.reject(createError(404, 'car not found'));

  Car.findByIdAndRemove(id)
  .then(car =>{
    console.log(car);
    res.sendStatus(204);
  })
  .catch(err => res.status(404).send(err.message));
};

exports.updateCar = function(req, res, id, car){
  if(!id) return Promise.reject(createError(404, 'car not found'));
  Car.findByIdAndUpdate(id, car, {new: true})
  .then(car =>{
    console.log(car);
    res.json(car);
  })
  .catch(err => res.status(400).send(err.message));
};
