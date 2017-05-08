'use strict';

const createError = require('http-errors');
const candyController = require('../controllers/candy-controller');

module.exports = function(router) {
  router.get('/api/candy:id', (req, res) => {
    if(!req.params.id) return res.status(400).send(createError('bad request'));
    candyController.fetchCandy(req.params.id)
    .then(candy => {
      console.log(candy);
      res.json(candy);
    })
      .catch(err => res.status(404).send(err.message));
  });

  router.post('/api/candy', (req, res) => {
    req.body = {
      name: '',
      type: '',
      texture: '',
    }
    new Candy(req.body).save()
    .then(candy => {
      console.log(candy);
      res.json(candy);
    })
    .catch(err => res.status(400).send(err.message));
  });

  router.delete('/api/candy', function(req, res) {
    debug('DELETE /api/candy');
    if(req.url.query.id) {
      storage.removeCandy('candy', req.url.query.id)
      .then(() => {
        res.writeHead(204, {'Content-Type' : 'application/json'});
        res.write('candy deleted successfully');
        res.end();
      })
      .catch(err => {
        console.error(err);
        res.writeHead(404, {'Content-Type' : 'text/plain'});
        res.write('not found');
        res.end();
      });
      return;
    }
    res.writeHead(400, {'Content-Type' : 'text/plain'});
    res.write('bad request');
    res.end();
  });

  router.put('/api/candy', function(req, res) {
    debug('PUT /api/candy');
    storage.updateCandy('candy', req.body.id, req.body)
    .then(candy => {
      res.writeHead(202, {'Content-Type' : 'text/plain'});
      res.write(JSON.stringify(candy));
      res.end();
    })
    .catch(err => {
      console.error(err);
      res.writeHead(400, {'Content-Type' : 'text/plain'});
      res.write('bad request');
      res.end();
    });
    return;
  });
};
