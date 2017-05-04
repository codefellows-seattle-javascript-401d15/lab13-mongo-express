'use strict';

const Album = require('../model/albums.js');
const albumCtrl = require('../controller/album-controller.js');

module.exports = function(router) {
  router.post('/api/album', (req, res) => {
    let album = new Album(req.body);
    
    albumCtrl.createAlbum(req, res, album)
    .then(album => res.json(JSON.stringify(album)))
    .catch(err => res.end(err));
    

  });
  
  router.get('/api/album/:id', (req, res) => {
    albumCtrl.fetchAlbum(req.params.id, res)
    .then(data => res.json(data.toString()))
    .catch(err => res.send(err));
  });

  router.get('/api/album', (req, res) => {
    albumCtrl.fetchAll(res)
    .then(data => res.json(data.toString()))
    .catch(err => res.send(err));
  });
  
  router.put('/api/album/:id', (req, res) => {
    if(req.params.id) {
      albumCtrl.updateAlbum(req, res, req.params.id)
      .then(data => res.json(data))
      .catch(err => res.status(404).send(err.message));
    }
  });
  
  router.delete('/api/album/:id', (req, res) => {
    albumCtrl.removeAlbum(req, res, req.params.id)
    .catch(err => res.send(err));
  });
};
