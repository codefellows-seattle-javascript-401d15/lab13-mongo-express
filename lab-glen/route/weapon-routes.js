'use strict';

const Weapon = require('./model/weapon')

module.exports = function (router) {

  router.get('/api/weapon/:id', (req, res) =>  {
    if(!req.params.id) return res.status(400).send(new Error('Bad Request Yo'))
    Note.findById(req.params.id)
      .then(note => {
        console.log(note)
        res.json(note)
      })
      .catch(err => res.status(404).send(err.message))
})

  router.post() {

    new Note(req.body).save()
    .then(note =>  {
      res.json(note)
    })

    .catch(err => res.status(400).send(err.message))

  })

  router.put() {


  }

  router.delete(){


  }

}
