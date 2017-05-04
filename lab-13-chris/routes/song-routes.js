'use strict';

const Song = require('../model/song');
const debug = require('debug')('http:server');
// const songCtrl = require('../controller/song-controller');

module.exports = function(router) {

  router.post('/api/song', (req, res) => {
    debug('routes.post()');
    new Song(req.body).save()
    .then(song => {
      console.log('the added song ', song);
      res.json(song);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/song', (req, res) => {
    debug('routes.get()');
    console.log(req);
    if(!req.query.id) {
      Song.find()
      .then()
      .catch(err => res.status(400).send('no id queried ', err.message));
    } else {
      Song.findById(req.query.id)
      .then(song => {
        console.log('here is the song you requested: ', song);
        res.json(song);
      })
      .catch(err => res.status(404).send(err.message));
    }
  });

  router.put('/api/song', (req, res) => {
    debug('routes.put()');
    if(!req.query.id) {
      Song.find()
      .then()
      .catch(err => res.status(400).send('no id queried', err.message));
    } else {
      Song.findByIdAndUpdate(req.query.id, req.body, {new: true})
      .then(song => {
        console.log('here is the song with updates ', song);
        res.json(song);
      });
    }
  });

  router.delete('/api/song', (req, res) => {
    debug('routes.delete()');
    if(!req.query.id) {
      Song.find()
      .then()
      .catch(err => res.status(400).send('no id queried ', err.message));
    } else {
      Song.findByIdAndRemove(req.query.id)
      .then(song => {
        console.log('you deleted this song ', song);
        res.json(song);
      })
      .catch(err => res.status(404).send(err.message));
    }
  });

  // router.post('/api/song', (req, res) => {
  //   debug('routes.post()');
  //   let song = new Song(req.body.title, req.body.artist, req.body.album, req.body.id);
  //
  //   songCtrl.createItem('song', song)
  //   .then(() => res.json(JSON.stringify(song)))
  //   .catch(err => res.status(400).send(err.message));
  // });
  //
  // router.get('/api/song/:id', (req, res) => {
  //   debug('routes.get()');
  //
  //   songCtrl.fetchItem('song', req.params.id)
  //   .then(data => res.json(data.toString()))
  //   .catch(err => res.send(err));
  // });
  //
  // router.put('/api/song', (req, res) => {
  //   debug('routes.put()');
  //
  //   songCtrl.updateItem('song', req.query.id, req.body)
  //   .then(data => res.json(data))
  //   .catch(err => res.status(404).send(err.message));
  // });
  //
  // router.delete('/api/song', (req, res) => {
  //   debug('routes.delete()');
  //
  //   songCtrl.deleteItem('song', req.query.id)
  //   .then(() => res.status(200).send(`The file with id: ${req.query.id} has been deleted`))
  //   .catch(err => res.status(404).send(err.message));
  // });
};
