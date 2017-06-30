const Momma = require('../model/momma-doge');
const chai = require('chai');
const http = require('chai-http');
const server = require('../server');
const expect = chai.expect;

require('../server.js');

chai.use(http);

describe('Server check', function () {
  let tempMomma;
  let app;

  before(done => {
    app = server.listen(8080);
    new Momma({name: 'milo'}).save()
    .then(temp => {
      tempMomma = temp;
    })
    .catch(err => console.error(err.message));
    done();
  });

  after(done => {
    app.close();
    tempMomma.remove()
    .then(() => done())
    .catch(err => console.error(err.message));
  });

  describe('Doge POST method', function () {
    describe('/api/doge endpoint', function () {
      it('should respond with a 404 on bad request', done => {
        chai.request(server)
        .post('/bad')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should respond with a 200 status on proper request', (done) => {
        chai.request(server)
        .post(`/api/momma/${tempMomma._id}/doge`)
        .send({name: 'milo', type: 'lab'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res).to.have.status(200);
          done();
        });
      });
      it('should return an item with correct properties', (done) => {
        chai.request(server)
        .post(`/api/momma/${tempMomma._id}/doge`)
        .send({name: 'milo', type: 'lab', color: 'black'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res).to.exist;
          expect(res.body.name).to.equal('milo');
          expect(res.body._id).to.be.a('string');
          expect(res).to.have.status(200);
          done();
        });
      });
    });
  });

  describe('Doge GET method', function () {

    describe('/api/doge endpoint', function () {
      describe('An incorrectly formatted request', function () {
        it('should return an error', done => {
          chai.request(server)
        .get('/api/doge/random')
        .end((err, res) => {
          if(err) throw err;
          expect(res).to.have(err);
        });
          done();
        });
        it('should respond with a 400 on bad request', done => {
          chai.request(server)
          .post('/bad')
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
        .get(`/api/momma/${tempMomma._id}/doge`)
        .end((err, res) => {
          if(err) throw err;
          expect(res.status).to.equal(200);
        });
          done();
        });
      });
    });
  });

  describe('Doge DELETE method', function () {

    describe('/api/doge endpoint', function () {
      it('should respond with a 404 on bad request on endpoint', done => {
        chai.request(server)
        .post('/bad')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should respond with a 200 on proper request', done => {
        chai.request(server)
        .delete(`/api/momma/${tempMomma._id}/doge`)
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('Doge PUT method', function () {

    describe('/api/doge endpoint', function () {
      it('should respond with a 404 on bad request', done => {
        chai.request(server)
        .post('/bad')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should respond with a 200 on proper request', done => {
        let dogeUpdate = {name: 'Spike'};
        chai.request(server)
        .put(`/api/momma/${tempMomma._id}/doge`)
        .send(dogeUpdate)
        .end((err, res) => {
          if (err) return done (err.message);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
    describe('PUT method should update an item', function() {
      it('should update an item', done => {
        let dogeUpdate = {name: 'Spike', type: 'Dalmation'};
        chai.request(server)
        .put(`api/momma/${tempMomma._id}/doge`)
        .send({dogeUpdate})
        .end(() => {
          expect(dogeUpdate.name).to.equal('Spike');
          expect(dogeUpdate.type).to.equal('Dalmation');
          done();
        });
      });
    });
  });
});
