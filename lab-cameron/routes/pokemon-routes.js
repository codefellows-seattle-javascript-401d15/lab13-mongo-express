'use strict';

const createError = require('http-errors');
const pokemonCtrl = require('../controllers/pokemon-controller');

module.exports = function(router) {
  router.get('/api/pokemon/:id', (req, res) => {
    if (!req.params.id) return res.status(400).send(createError(400, 'bad request'));
    pokemonCtrl.fetchPokemon(req.params.id)
    .then(pokemon => {
      console.log(pokemon);
      res.json(pokemon);
    })
    .catch(err => res.status(400).send(err.message));
  });
  router.get('/api/pokemon', (req, res) => {
    pokemonCtrl.gottaFetchEmAll()
    .then(pokemon => {
      console.log(pokemon);
      res.json(pokemon);
    })
    .catch(err => res.status(404).send(err.message));
  });
  router.post('/api/pokemon', (req, res) => {
    pokemonCtrl.createPokemon(req.body)
    .then(pokemon => {
      console.log(pokemon);
      res.json(pokemon);
    })
    .catch(err => res.status(400).send(err.message));
  });
  router.put('/api/pokemon/:id', (req, res) => {
    if (!req.params.id) return res.status(400).send(createError(400, 'bad request'));
    if (!req.body.name && !req.body.type) return res.status(400).send(createError(400, 'must enter a property to update'));
    pokemonCtrl.updatePokemon(req.params.id, req.body)
    .then(pokemon => {
      console.log(pokemon);
      res.json(pokemon);
    })
    .catch(err => res.status(404).send(err.message));
  });
  router.delete('/api/pokemon/:id', (req, res) => {
    if (!req.params.id) return res.status(400).send(createError(400, 'bad request'));
    pokemonCtrl.deletePokemon(req.params.id)
    .then(() => {
      console.log(`pokemon with { _id: '${req.params.id}' } found and deleted`);
      res.status(204).send();
    })
    .catch(err => res.status(404).send(err.message));
  });
};
