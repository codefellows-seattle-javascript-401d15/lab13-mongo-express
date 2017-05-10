'use strict';

const createError = require('http-errors');
const personCtrl = require('../controllers/person-controller.js');


module.exports = function(router){

  //all
  router.get('/api/person/', (req, res) => {

    personCtrl.fetchPeople()
    .then(person => {
      console.log(person);
      res.json(person);
    })
    .catch(err => res.status(404).send(err.message));
  });

  //get
  router.get('/api/person/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('you done fucked up, boy.'));
    personCtrl.fetchPerson(req.params.id)
    .then(person => {
      console.log(person);
      res.json(person);
    })
    .catch(err => res.status(404).send(err.message));
  });


  // post new person
  router.post('/api/person/:id', (req, res) => {

    personCtrl.createPerson(req.body)
    .then(person => {
      console.log(person);
      res.json(person);
    })
    .catch(err => res.status(400).send(err.message));
  });


  //update person
  router.put('/api/person/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('you done fucked up, boy'));
    if(!req.body.name && !req.body.details) return res.status(400).send(createError('you done fucked up, boy'));

    personCtrl.updatePerson(req.params.id, req.body)
    .then(person => {
      console.log(person);
      res.json(person);
    });
  });

  //delete a person
  router.delete('/api/person/:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('you done fucked up, boy'));

    personCtrl.deletePerson(req.params.id)
    .then(person => {
      console.log(person);
      res.json(person);
    });
  });
};
