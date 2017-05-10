const Blueprint = require('../model/blueprint');
const chai = require('chai');
const http = require('chai-http');
const server = require('../server');
const expect = chai.expect;

require('../server.js');

chai.use(http);

describe('Server function check', function () {
  let tempBlueprint;
  let app;

  before(done => {
    app = server.listen(8000);
    new Blueprint({name: 'test'}).save()
    .then(temp => {
      tempBlueprint = temp;
    })
    .catch(err => console.error(err.message));
    done();
  });

  after(done => {
    app.close();
    tempBlueprint.remove()
    .then(() => done())
    .catch(err => console.error(err.message));
  });

  describe('###WEAPON POST method', function () {
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
        .post(`/api/blueprint/${tempBlueprint._id}/weapon`)
        .send({name: 'punisher', type: 'shotgun'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res).to.have.status(200);
          done();
        });
      });
      it('should return an item with correct properties', (done) => {
        chai.request(server)
        .post(`/api/blueprint/${tempBlueprint._id}/weapon`)
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

  describe('###WEAPON GET method', function () {

    describe('/api/weapon endpoint', function () {
      describe('An incorrectly formatted request', function () {
        it('should return an error', done => {
          chai.request(server)
        .get('/api/weapon/asdsad')
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

      describe('A correct formatted request', function () {
        it('should return a 200 status', done => {
          chai.request(server)
        .get(`/api/blueprint/${tempBlueprint._id}/weapon`)
        .end((err, res) => {
          if(err) throw err;
          expect(res.status).to.equal(200);
        });
          done();
        });
      });
    });
  });

  describe('###WEAPON DELETE method', function () {

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
        .delete(`/api/blueprint/${tempBlueprint._id}/weapon`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('###WEAPON PUT method', function () {

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
        let weaponUpdate = {name: 'Mr Wiggles'};
        chai.request(server)
        .put(`/api/blueprint/${tempBlueprint._id}/weapon`)
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
        .put(`api/blueprint/${tempBlueprint._id}/weapon`)
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
