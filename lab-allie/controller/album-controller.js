'use strict';

const createError = require('http-errors');
const Promise = require('bluebird');
const Album = require('../model/album.js');

module.exports = exports = {};

exports.createAlbum = function(schema, album) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!album) return Promise.reject(createError(400, 'Album required'));
  
  new Album(req.body).save()
  .then(album => res.json(album))
  .catch(err => res.status(400).send(err.message));
};

exports.fetchAlbum = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));
  
  return Album.findById(req.params.id)
  .then(album => {
    console.log('album', album);
    res.json(album);
  })
  .catch(err => res.status(400).send(err.message));
};

exports.fetchAll = function(schema) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  
  return Album.find()
  .then(album => res.json(album))
  .catch(err => res.status(400).send(err.message));
};

exports.updateAlbum = function(schema, album, id) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!album) return Promise.reject(createError(400, 'Album required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));
  
  Album.findOneAndUpdate(req.params.id, req.body, {new: true})
  .then(album => res.json(album))
  .catch(err => res.status(400).send(err.message));
};

exports.removeAlbum = function(schema, id) {
  if(!schema) return Promise.reject(createError(400, 'Schema required'));
  if(!id) return Promise.reject(createError(400, 'ID required'));
  
  if(!req.params.id) return res.status(400).send(err.message);
  Album.deleteOne(req.params.id)
  .then(() => res.status(204).send())
  .catch(err => res.send(err));
};