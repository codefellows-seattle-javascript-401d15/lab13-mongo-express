'use strict';

const Album = require('../model/albums.js');

module.exports = function(router) {
  router.get('/api/album/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(err.message);
    
    Album.findById(req.params.id)
    .then(album => {
      console.log('album', album);
      res.json(album);
    });
  });
  
  router.post('/api/album', (req, res) => {
    new Album(req.body).save()
    .then(album => res.json(album))
    .catch(err => res.status(400).send(err.message));
  });
};
