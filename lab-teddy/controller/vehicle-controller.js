'use strict';

const Promise = require('bluebird');
const createError = require('http-errors');
const Vehicle = require('../model/vehicle');

exports.createVehicle = function(vehicle){
  if(!vehicle) return (new Error('Vehicle Required'));

  return new Vehicle(vehicle).save()
  .then(vehicle => Promise.resolve(vehicle))
  .catch(() => Promise.reject(createError));
};

exports.fetchVehicle = function(id, vehicle){
  if(!id) return (new Error('Schema Required'));
  if(!vehicle) return (new Error('Vehicle Required'));

  return Vehicle.find()
  .then(vehicle => Promise.resolve(vehicle))
  .catch(() => Promise.reject(createError));
};

exports.updateVehicle = function(req, res, id){
  if(!id) return (new Error('Schema Required'));

  Vehicle.findOneAndUpdate(id, req.body, {new: true})
  .then(vehicle => res.json(vehicle))
  .catch(err => res.send(err));
};
