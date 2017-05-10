'use srtict';

const Hardware = require('../model/consoles.js');

module.exports = function(router) {
  router.post('/api/consoles', (req, res) => {
    new Hardware(req.body).save()
    .then(hardware => res.json(hardware))
    .catch(err => res.status(400).send(err.message));
  });

  router.get('/api/consoles', (req, res) => {
    if(!req.params.id) {
      Hardware.find()
      .then(items => res.json(items))
      .catch(err => res.status(400).send(err.message));
    } else {
      Hardware.findById(req.params.id)
      .then(hardware => res.json(hardware))
      .catch(err => res.status(404).send(err.message));
    }
  });

  router.put('/api/consoles/:id', (req, res) => {

  });

  router.delete('/api/consoles/:id', (req, res) => {
    if(!req.params.id) return res.satus(400).send('Id required');
    Hardware.findById(req.params.id)
    .then(() => res.status(204).send('sucessful delete'))
    .catch(err => res.status(404).send(err.message));
  });
};
