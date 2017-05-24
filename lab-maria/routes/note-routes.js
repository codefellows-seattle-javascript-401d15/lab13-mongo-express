'use strict';
const Note = require('../model/deathnote');
const List = require('../model/list');

module.exports = function(router) {
  router.get('/note/:id', (req, res) => {
    Note.findById(req.params.id)
      .then(note => {
        if(note.length === 0) err => res.status(404).send(err.message);
        res.json(note);
      })
      .catch(err => res.status(404).send(err.message));
  });

  router.get('/note', (req, res) => {
    return Note.find()
      .then(note => res.json(note))
      .catch(err => res.status(404).send(err.message));
  });

  router.post('/list/:id/note', (req, res) => {
    List.findByIdAndAddNote(req.params.listId, req.body)
      .then(note => res.json(note))
      .catch(err => res.json(404).send(err.message));
  });

  router.put('/note/:id', (req, res) => {
    if(req.params.id) {
      Note.findById(req.params.id, function(err, note) {
        if(err) res.status(500).send(err.message);
        note.owner = req.body.owner || note.owner;
        note.shinigami = req.body.shinigami || note.shinigami;
        note.deathCount = req.body.deathCount || note.deathCount;
        note.save()
          .then(note => res.json(note))
          .catch(err => res.status(500).send(err.message));
      });
    }
  });

  router.delete('/note/:id', (req, res) => {
    if(!req.params.id) err => res.status(500).send(err.message);
    Note.findByIdAndRemove(req.params.id)
      .then(res.sendStatus(200))
      .catch(err => res.status(500).send(err.message));
  });

  return router;
};
