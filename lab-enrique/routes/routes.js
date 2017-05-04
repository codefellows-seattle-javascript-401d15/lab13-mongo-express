'use strict';

const Doge = require('../model/doge');

module.exports = function(router){

  router.post('/api/doge', (req,res) => {
    new Doge(req.body).save()
    .then(doge => res.json(doge))
    .catch(err => res.status(400).send(err.message));
  })

  router.get('/api/doge/:id', (req,res) => {
    if(!req.params.id) return res.status(400).send(new Error('bad request'))
    Doge.findById(req.params.id)
    .then(note => {
      console.log(note);
      res.json(note)
    })
    .catch(err => res.status(404).send(err.message));
  })
}
