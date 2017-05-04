'use strict';

const Car = require('../model/cars');


exports.createCar('/api/car', function(req, res){
  console.log('made it');
  new Car(req.body).save()
    .then(car => {
      res.json(car);
    })
    .catch(err => res.status(400).send(err.message));
});

exports.fetchCar = function(router){
  router.get('/api/car/:id', (req, res)=> {

    if(!req.query.id){
      Car.find()
      .then()
      .catch();
    }
    else {
      Car.findById(req.params.id);
      console.log('made it here')
      .then(car=>{
        console.log(car);
        res.json(car);
      })
      .catch(err => res.status(404).send(err.message));
    }
  });
};
