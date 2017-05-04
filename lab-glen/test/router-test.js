const Weapon = require('../model/weapon');
const chai = require('chai');
const http = require('chai-http');
const server = require('../server');
const expect = chai.expect;

require('../server.js');

chai.use(http);

describe('Server function check', function () {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });
  after(done => {
    app.close();
    done();
  });

  describe('POST method', function () {
    describe('/api/weapon endpoint', function () {
      it('should respond with a 404 on bad request', done => {
        chai.request(server)
        .post('/wrong')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should respond with a 200 status on proper request', (done) => {
        chai.request(server)
        .post('/api/weapon')
        .send({name: 'punisher', type: 'shotgun'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res).to.have.status(200);
          done();
        });
      });
      it('should return an item with correct properties', (done) => {
        chai.request(server)
        .post('/api/weapon')
        .send({name: 'punisher', type: 'shotgun', price: 100})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res).to.exist;
          expect(res.body.name).to.equal('punisher');
          expect(res.body).to.have.ownProperty('name');
          expect(res.body.type).to.equal('shotgun');
          expect(res.body.price).to.equal(100);
          expect(res.body.price).to.satisfy((num) => { return num > 0;});
          expect(res.body._id).to.be.a('string');
          expect(Boolean(res.body.name)).to.equal(true);
          expect(res).to.have.status(200);
          done();
        });
      });
    });
  });

  describe('GET method', function () {
    let tempWeapon;
    before(done => {
      new Weapon({name : 'Glen', type: 'Pistol'}).save()
      .then(weapon => {
        tempWeapon = weapon;
      })
      .then(done)
      .catch(err => console.log(err));
    });
    after(done => {
      if(tempWeapon) {
        Weapon.remove({})
        .then(() => done())
        .catch(done);
      }
    });

    describe('/api/weapon endpoint', function () {
      describe('An incorrectly formatted request', function () {
        it('should return an error', done => {
          chai.request(server)
        .get('/api/weapon/')
        .end((err, res) => {
          if(err) throw err;
          expect(res).to.have(err);
        });
          done();
        });
        it('should respond with a 400 on bad request', done => {
          chai.request(server)
          .post('/wrong')
          .send({})
          .end((err, res) => {
            expect(res.status).to.equal(404);
          });
          done();
        });
      });

      describe('A correctly formatted request', function () {
        it('should return a 200 status', done => {
          chai.request(server)
        .get(`/api/weapon/${tempWeapon._id}`)
        .end((err, res) => {
          if(err) throw err;
          expect(res.status).to.equal(200);
        });
          done();
        });
      });
    });
  });

  describe('DELETE method', function () {
    let resource;
    before(done => {
      new Weapon({name : 'Glen', type: 'Pistol'}).save()
      .then((weapon) => {
        resource = weapon;
      })
      .then(done)
      .catch(err => {
        console.log(err);
      });
    });
    after(done => {
      if(resource) {
        Weapon.remove({})
        .then(() => done())
        .catch(done);
      }
    });
    describe('/api/weapon endpoint', function () {
      it('should respond with a 404 on bad request on endpoint', done => {
        chai.request(server)
        .post('/wrong')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .delete(`/api/weapon/${resource.id}`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('testing #PUT method', function () {
    let tempWeapon;
    before(done => {
      new Weapon({name : 'Glen', type: 'Pistol'}).save()
      .then(weapon => {
        tempWeapon = weapon;
      })
      .then(done)
      .catch(err => console.log(err));
    });
    after(done => {
      if(tempWeapon) {
        Weapon.remove({})
        .then(() => done())
        .catch(done);
      }
    });
    describe('/api/weapon endpoint', function () {
      it('should respond with a 404 on bad request', done => {
        chai.request(server)
        .post('/wrong')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should respond with a 200 on proper request', done => {
        let weaponUpdate = {name: 'Mr Wiggles', type: 'Bat'};
        chai.request(server)
        .put(`/api/weapon/${tempWeapon._id}`)
        .send(weaponUpdate)
        .end((err, res) => {
          if (err) return done (err.message);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('PUT method should update an item', function() {
      it('should update an item', done => {
        let weaponUpdate = {name: 'Mr Wiggles', type: 'Bat'};
        chai.request(server)
        .put(`api/weapon/${tempWeapon._id}`)
        .send({weaponUpdate})
        .end(() => {
          expect(weaponUpdate.name).to.equal('Mr Wiggles');
          expect(weaponUpdate.type).to.equal('Bat');
          done();
        });
      });
    });
  });
});
