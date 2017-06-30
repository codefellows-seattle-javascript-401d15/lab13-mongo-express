'use strict';

const server = require('../server.js');
const Car = require('../model/vehicle');
const chai = require('chai');
const expect = chai.expect;
const http = require('chai-http');
const Promise = require('bluebird');
// const fs = Promise.promisifyAll(require('fs'), {suffix: 'Prom'});

chai.use(http);

const exampleCar = {
  model: 'F150',
  make: 'Ford',
  detail: 'big fun truck',
  date: 12/28/2017,
};

describe('Server Test', function() {
  let app;
  beforeEach(done => {
    app = server.listen(8000);
    done();
  });
  afterEach(done => {
    app.close();
    Promise.all([
      Car.remove({}),
    ]);
    done();
  });

  describe('POST Method', function() {

    it('should create a new car', done => {
      chai.request(server)
      .post('/api/vehicle')
      .send(exampleCar)
      .end((err, res) => {
        if(err) console.error(err);
        expect(res.body.model).to.equal('F150');
        done();
      });
    });

    it('should send a status code of 200 when good request', done => {
      chai.request(server)
      .post('/api/vehicle')
      .send(exampleCar)
      .end((err, res) => {
        if(err) console.error(err);
        expect(res.status).to.equal(200);
        done();
      });
    });

    it('should respond with a 404 if not found', done => {
      chai.request(server)
      .post('/api/nope')
      .send(exampleCar)
      .end((err, res) => {
        if(err)  console.error(err);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('GET Method', function() {
    let testGet = [];
    before(done => {
      chai.request(server)
      .post('/api/vehicle')
      .send(exampleCar)
      .end((err, res) => {
        let test = res.body;
        console.log('typeof', typeof test._id);
        testGet.push(test);
        done();
      });
    });
    it('should get the the item and respond with a 200', done => {
      chai.request(server)
      .get(`/api/vehicle/${testGet[0]._id}`)
      .end((err, res) => {
        if(err)  console.error(err);
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should respond with a 404 on bad request', done => {
      chai.request(server)
      .get('/api/vehicle')
      .end((err, res) => {
        if(err) console.error(err);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('PUT Method', function() {
    let testPut = [];
    before(done => {
      chai.request(server)
      .post('/api/vehicle')
      .send(exampleCar)
      .end((err, res) => {
        let test = res.body;
        testPut.push(test);
        done();
      });
    });
    it('should respond with 200 on a good request', done => {
      chai.request(server)
      .put(`/api/vehicle/${testPut[0]._id}`)
      .send({model: 'dude', make: 'cool', detail: 'awesomeness'})
      .end((err, res) => {
        if(err)  console.error(err);
        expect(res.status).to.equal(200);
        done();
      });
    });
    it('should respond with a 404 on not found', done => {
      chai.request(server)
      .put(`/api/vehicle`)
      .end((err, res)=> {
        if(err)  console.error(err);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
  describe('DELETE Method', function(){
    let testDelete;
    before(done => {
      chai.request(server)
      .post('/api/vehicle')
      .send(exampleCar)
      .end((err, res) => {
        if(err) console.error(err);
        testDelete = res.body._id;
        done();
      });
    });
    it('should respond with a 204 on a good delete', done => {
      chai.request(server)
      .delete(`/api/vehicle/${testDelete}`)
      .end((err, res) => {
        if(err)console.error(err);
        expect(res.status).to.equal(204);
        done();
      });
    });
    it('should respond with 404 with no ID', done => {
      chai.request(server)
      .delete('/api/vehicle/hah')
      .end((err, res) => {
        if(err)console.error(err);
        expect(res.status).to.equal(404);
        done();
      });
    });
  });
});
