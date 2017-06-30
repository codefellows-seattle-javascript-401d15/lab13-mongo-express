'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Vehicle = require('../model/vehicle');

exports.createVehicle = function(vehicle, res){
  if(!vehicle) return Promise.reject(createError(404, 'Paramaters not given'));

  return new Vehicle(vehicle).save()
  .then(vehicle => res.json(vehicle))
  .catch((err) => res.status(404).send(err.message));
};

exports.fetchVehicle = function(id, res){
  if(!id) return Promise.reject(createError(404, 'ID Not Given'));

  return Vehicle.findById(id)
  .then(vehicle => res.json(vehicle))
  .catch((err) => res.status(404).send(err.message));
};

exports.updateVehicle = function(req, res, id){
  if(!id) return Promise.reject(createError(404, 'ID Not Given'));

  Vehicle.findOneAndUpdate(id, req.body, {new: true})
  .then(vehicle => res.json(vehicle))
  .catch(err => res.send(err));
};

exports.deleteVehicle = function (id, res){
  if(!id) return Promise.reject(createError(404, 'ID Not Given'));

  Vehicle.findByIdAndRemove(id)
  .then(() => res.sendStatus(204))
  .catch(err => res.status(404).send(err.message));
};
