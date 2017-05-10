'use strict';

const Note = require('../model/note');

module.exports = function(router) {
  router.get('/api/note', (req, res) => {
    if(!req.query.id) {
      Note.find()
      .then()
      .catch();
    } else {
      Note.findById(req.params.id)
      .then(note => {
        console.log(note);
        res.json(note);
      })
    .catch(err => res.status(404).send(err.message));
    }
  });

  router.post('/api/note', (req, res) => {
    new Note(req.body).save()
    .then(note => {
      console.log(note);
      res.json(note);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.put('/api.note/:id', (req, res) => {
    if(!req.query.id) {
      return res.sendStatus(404);
    }
    Note.findByIdAndUpdate(req.params.id)
    .then(() => {
      return res.sendStatus(204);
    })
    .catch(err => {
      return res.send(err.message);
    });
  });

  router.delete('/api/note/:id', (req, res) => {
    if(!req.query.id) {
      return res.sendStatus(404);
    }
    Note.findByIdAndRemove(req.params.id)
    .then(() => {
      return res.sendStatus(204);
    })
    .catch(err => {
      return res.send(err.message);
    });
  });
};
