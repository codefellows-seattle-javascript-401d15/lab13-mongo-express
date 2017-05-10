'use strict';

const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});
const createError = require('http-errors');
const Food = require('../model/food');

module.exports = exports = {};

const URL = `${__dirname}/../data`;

exports.createItem = function(req, res, food) {

  if(!food) return Promise.reject(createError(400, 'bad requst'));

  new Food(req.body).save()
  .then(food => {
    console.log(food);
    res.json(food);
  })
  .catch(err => res.status(400).send(err.message));
};


exports.updateItem = function(req, res, id, food) {

  if(!id) return Promise.reject(createError(404, 'not found'));

  Food.findByIdAndUpdate(id, food, {new: true})
  .then(food => {
    console.log(food);
    res.json(food);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.fetchItem = function(id, res) {

  if(!id) return Promise.reject(createError(404, 'not found'));

  Food.findById(id)
  .then(food => {
    console.log(food);
    res.json(food);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.deleteItem = function(id, res) {

  if(!id) return Promise.reject(createError(404, 'not found'));

  Food.findByIdAndRemove(id)
  .then(food => {
    console.log(food);
    res.sendStatus(204);
  })
  .catch(err => res.status(404).send(err.message));
};
