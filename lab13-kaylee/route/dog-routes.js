'use strict';

const dogCtrl = require('../controller/dog-controller');

module.exports = function(router) {

  router.post('/api/dog', (req, res) => {
    dogCtrl.createDog(req.body)
    .then(dog => res.json(dog))
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/dog/:id', (req, res) => {
    if(req.params.id) {
      dogCtrl.getSingleDog(req.params.id)
      .then(dog => res.json(dog))
      .catch(err => res.status(404).send(err.message));
    }
  });

  router.get('/api/dog', (req, res) => {
    dogCtrl.getAllDogs()
    .then(dogs => res.json(dogs))
    .catch(err => res.status(400).send(err.message));
  });

  router.put('/api/dog/:id', (req, res) => {
    if(req.params.id) {
      dogCtrl.updateDog(req.params.id, req.body)
      .then(newDog => res.json(newDog))
      .catch(err => res.status(404).send(err.message));
    }
  });

  router.delete('/api/dog/:id', (req, res) => {
    if(req.params.id) {
      dogCtrl.deleteDog(req.params.id)
      .then(deletedDog => res.json(deletedDog))
      .catch(err => res.status(404).send(err.message));
    }
  });
};
