'use strict'

const Ninja = require('../models/ninjas')

module.exports = function(router) {
  router.get('/api/ninja', (req, res) => {
    // if(!req.params.id) return res.status(400).send(new Error('Bad Request'))
    if(!req.query.id) {
      Note.find()
      .then()
      .catch()
    } else {
      Note.findById(req.params.id)
      .then(ninja => {
        console.log(ninja)
        res.json(ninja)
      })
      .catch(err => res.status(404).send(err.message))
    }
  })

  // router.get('/api/ninja', (req, res) => {
  //
  // })

  router.post('/api/ninja', (req, res) => {
    // req.body = {
    //   name: '',
    //   details: '',
    //   date: ''
    // }
    new Note(req.body).save()
    .then(ninja => {
      console.log(ninja)
      res.json(ninja)
    })
    .catch(err => res.status(400).send(err.message))
  })

  router.put('/api/ninja/:id', (req, res) => {

  })

  router.delete('/api/ninja/:id', (req, res) => {
  })
}


// 'use strict';
//
// const Ninja = require('../models/ninjas');
//
// module.exports = function(router) {
//   router.post('/api/ninja', (req, res) => {
//     req.body = {
//       name: '',
//       clan: '',
//       weapons: '',
//       date: ''
//     }
//       new Ninja(req.body).save()
//       .then(ninja => {
//         console.log(ninja);
//         res.json(ninja)
//       })
//       .catch(err => res.status(400).send(err.message))
//
//   })
//
//   router.get('/api/ninja', (req, res) => {
//     if(!req.query.id) {
//       Ninja.find()
//       .then().
//       catch();
//     } else {
//       Ninja.findById(req.params.id)
//       .then(ninja => {
//         console.log(ninja);
//         res.json(ninja);
//       })
//       .catch(err => res.status(404).send(err.message));
//     }
//   });
//
//   router.put('/api/ninja', (req, res) => {
//     if(!req.query.id) {
//       Ninja.find()
//         .then()
//         .catch();
//     } else {
//       Ninja.findByIdAndUpdate(req.query.id, req.body)
//       .then()
//       .catch()
//     }
//   }
//
//   router.delete('/api/ninja', (req, res) => {
//     if(!req.query.id) {
//       Ninja.find()
//       .then()
//       .catch()
//     } else {
//       Ninja.remove({})
//       .then()
//       .catch()
//     }
//   })
// }
