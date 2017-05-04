'use strict';

const Album = require('../model/albums.js');

module.exports = function(router) {
  router.get('/api/album/:id', (req, res) => {
    
    Album.findById(req.params.id)
    .then(album => {
      console.log('album', album);
      res.json(album);
    })
    .catch(err => res.status(400).send(err.message));
  });
  
  router.post('/api/album', (req, res) => {
    new Album(req.body).save()
    .then(album => res.json(album))
    .catch(err => res.status(400).send(err.message));
  });
  
  router.put('/api/album/:id', (req, res) => {
    Album.findOneAndUpdate(req.params.id, req.body, {new: true})
    .then(album => res.json(album))
    .catch(err => res.status(400).send(err.message));
  });
  
  router.delete('/api/album/:id', (req, res) => {
    Album.deleteOne(req.params.id)
    .then(() => res.status(204).send())
    .catch(err => res.send(err));
  });
};
