'use-strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
chai.use(http);

describe('HTTP Server module', function() {
  let app;
  before(done => {
    app = server.listen(4000);
    done();
  });
  after(done => {
    app.close();
    done();
  });

  describe('POST of car instance', function() {

    describe('New car posted', function() {

      it('should post a new instance of car with name Mazda', done => {
        chai.request(server)
        .post('/api/cars')
        .send({'make': 'Mazda', 'model': 'RX-7'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.body.make).to.equal('Mazda');
          done();
        });
      });

      it('should post a new instance of car with model of RX-7', done => {
        chai.request(server)
        .post('/api/cars')
        .send({'make': 'Mazda', 'model': 'RX-7'})
        .end((err, res) => {
          if(err) console.err(err);
          expect(res.body.model).to.equal('RX-7');
          done();
        });
      });

      it('should not post a new instance of car with model of Bologna', done => {
        chai.request(server)
        .post('/api/cars')
        .send({'make': 'Mazda', 'model': 'RX-7'})
        .end((err, res) => {
          if(err) console.err(err);
          expect(res.body.model).to.not.equal('Bologna');
          done();
        });
      });

      describe('404 error response', function() {
        it('should respond with a 404 on bad request', done => {
          chai.request(server)
          .post('/bologna')
          .send({})
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(404);
            done();
          });
        });
      });

      describe('200 response', function() {
        it('should respond with 200 on good request', done => {
          chai.request(server)
          .post('/api/cars')
          .send({'make': 'Mazda', 'model': 'RX-7'})
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(200);
            done();
          });
        });
      });
    });
  });

  describe('GET of car instance', function() {
    let testCar = [];
    before(done => {
      chai.request(server)
      .post('/api/cars')
      .send({'make': 'Mazda', 'model': 'RX-7'})
      .end((err, res) => {
        let car = res.body;
        testCar.push(car);
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete(`/api/cars/${testCar[0]._id}`)
      .end(() => {
        done();
      });
    });

    it('should return a car object', done => {
      chai.request(server)
      .get('/api/cars')
      .end((err, res) => {
        if(err) console.error(err);
        expect(res).to.be.an('object');
        done();
      });
    });

    describe('404 response on bad request', function() {

      it('should respond with 404 on bad request', done => {
        chai.request(server)
        .get('/bologna')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });

    describe('200 response on good request', function() {

      it('should respond with 200 on good request', done => {
        chai.request(server)
        .get('/api/cars')
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('DELETE of car instance', function() {
    let testCar = [];
    before(done => {
      chai.request(server)
      .post('/api/cars')
      .send({'make': 'Mazda', 'model': 'RX-7'})
      .end((err, res) => {
        let car = res.body;
        testCar.push(car);
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete(`/api/cars/${testCar[0]._id}`)
      .end(() => {
        done();
      });
    });

    it('should respond with 204 if car deleted', done => {
      chai.request(server)
      .delete(`/api/cars/${testCar[0]._id}`)
      .send({})
      .end((err, res) => {
        if(err) console.error(err);
        expect(res.status).to.equal(204);
        done();
      });
    });

    it('should respond with 404 if car not deleted', done => {
      chai.request(server)
      .delete(`/api/bologna/${testCar[0]._id}`)
      .send({})
      .end((err, res) => {
        if(err) console.error(err);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('PUT method to update car instance', function () {

    let testCar = [];
    before(done => {
      chai.request(server)
      .post('/api/cars')
      .send({'make': 'Mazda', 'model': 'RX-7'})
      .end((err, res) => {
        let car = res.body;
        testCar.push(car);
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete(`/api/cars/${testCar[0]._id}`)
      .end(() => {
        done();
      });
    });

    describe('Update of car instance', function () {
      it('should respond with 200 if car updated', done => {
        chai.request(server)
        .put(`/api/cars/${testCar[0]._id}`)
        .send({'make': 'Toyota', 'model': 'Supra'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should respond with 404 if car not updated', done => {
        chai.request(server)
        .put(`/api/bologna/${testCar[0]._id}`)
        .send({'make': 'Toyota', 'model': 'Supra'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
});
