'use strict';

const Album = require('../model/albums.js');
const albumCtrl = require('../controller/album-controller.js');

module.exports = function(router) {
  router.post('/api/album', (req, res) => {
    let album = new Album(req.body);
    
    albumCtrl.createAlbum(req, res, album);
  });
  
  router.get('/api/album/:id', (req, res) => {
    albumCtrl.fetchAlbum(req.params.id, res);
  });

  router.get('/api/album', (req, res) => {
    albumCtrl.fetchAll(res);
  });
  
  router.put('/api/album/:id', (req, res) => {
    if(req.params.id) {
      albumCtrl.updateAlbum(req, res, req.params.id);
    }
  });
  
  router.delete('/api/album/:id', (req, res) => {
    albumCtrl.removeAlbum(req, res, req.params.id);
  });
};
