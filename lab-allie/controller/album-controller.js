'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const Album = require('../model/albums.js');

module.exports = exports = {};

exports.createAlbum = function(req, res, album) {
  if(!album) return Promise.reject(createError(400, 'Album required'));
  
  new Album(req.body).save()
  .then(album => res.json(album))
  .catch(err => res.status(400).send(err.message));
};

exports.fetchAlbum = function(id, res) {
  if(!id) return Promise.reject(createError(400, 'ID required'));
  
  return Album.findById(id)
  .then(album => {
    res.json(album);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.fetchAll = function(res) {  
  return Album.find()
  .then(album => res.json(album))
  .catch(err => res.status(400).send(err.message));
};

exports.updateAlbum = function(req, res, id) {
  if(!id) return Promise.reject(createError(400, 'ID required'));
  
  Album.findOneAndUpdate(id, req.body, {new: true})
  .then(album => res.json(album))
  .catch(err => res.status(400).send(err.message));
};

exports.removeAlbum = function(req, res, id) {
  if(!id) return Promise.reject(createError(400, 'ID required'));
  
  Album.deleteOne(id)
  .then(() => res.status(204).send())
  .catch(err => res.send(err));
};