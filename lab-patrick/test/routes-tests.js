'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('server module', function() {
  let app;
  before(done => {
    app = server.listen(4000);
    done();
  });
  after(done => {
    app.close();
    done();
  });

  describe('invalid route', function(){
    it('should respond with a 404 status code', done =>{
      chai.request(server)
      .get('/api/boats')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
    });
  });

  describe('POST method', function(){
    describe('/api/car post route' , function(){
      it('should return posted car with correct inputs', done =>{
        chai.request(server)
        .post('/api/car')
        .send({'name': 'WRX', 'model': 'Subaru', 'horsepower': 1000})
        .end((err, res)=>{
          expect(res.body.name).to.equal('WRX');
          done();
        });
      });

      it('should return status 200 given the correct inputs', done =>{
        chai.request(server)
        .post('/api/car')
        .send({'name': 'WRX', 'model': 'Subaru', 'horsepower': 1000})
        .end((err, res)=>{
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should return status 400 given the correct inputs', done =>{
        chai.request(server)
        .post('/')
        .send({})
        .end((err, res)=>{
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });
  describe('GET method', function() {
    let testCar;
    describe('api/car routes', function(){
      let cars =[];
      before(done => {
        chai.request(server)
        .post('/api/car')
        .send({'name': 'WRX', 'model': 'Subaru', 'horsepower': 1000})
        .end((err, res)=>{
          testCar = res.body;
          cars.push(testCar);
          done();
        });
      });
      after(done =>{
        chai.request(server)
        .delete(`/api/car/${cars[0]._id}`);
        done();
      });
      describe('Return car by Id',function(){
        it('should return car given correct id', done =>{
          chai.request(server)
          .get(`/api/car/${cars[0]._id}`)
          .end((err, res) => {
            expect(cars[0]).to.deep.equal(res.body);
            done();
          });
        });
      });

      it('should return status 200 if correct route', done =>{
        chai.request(server)
        .get(`/api/car/${cars[0]._id}`)
        .end((err, res) =>{
          if(err) throw err;
          expect(res.status).to.equal(200);
          done();
        });
      });

      it('should return status 404 if bad request', done =>{
        chai.request(server)
        .get('/api/unknown')
        .end((err, res) =>{
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('DELETE method', function(){
    let testCar;
    describe('api/car routes', function(){
      let cars =[];
      before(done => {
        chai.request(server)
        .post('/api/car')
        .send({'name': 'WRX', 'model': 'Subaru', 'horsepower': 1000})
        .end((err, res)=>{
          testCar = res.body;
          cars.push(testCar);
          done();
        });
      });
      after(done =>{
        done();
      });
      describe('delete request made to /api/car by id', function(){
        it('should have a response status of 200 if successful', done =>{
          chai.request(server)
          .delete(`/api/car/${cars[0]._id}`)
          .end((err, res) => {
            expect(res).to.have.status(204);
            done();
          });
        });
        it('should have a response ststus of 404 given no id', done =>{
          chai.request(server)
          .delete('api/car/')
          .send({})
          .end((err, res) => {
            expect(res).to.have.status(400);
          });
          done();
        });
      });
    });
  });
  describe('PUT method', function(){
    let testCar;
    describe('api/car PUT routes', function(){
      let cars =[];
      before(done => {
        chai.request(server)
        .post('/api/car')
        .send({'name': 'WRX', 'model': 'Subaru', 'horsepower': 1000})
        .end((err, res)=>{
          testCar = res.body;
          cars.push(testCar);
          done();
        });
      });
      after(done =>{
        done();
      });
      describe('delete request made to /api/car by id', function(){
        it('should have a response status of 200 if successful', done =>{
          chai.request(server)
          .put(`/api/car/${cars[0]._id}`)
          .send({name : 'burrito'})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });
        it('should have a response status of 200 if successful', done =>{
          chai.request(server)
          .put(`/api/car/${cars[0]._id}`)
          .send({name : 'burrito'})
          .end((err, res) => {
            expect(res.body.name).to.equal('burrito');
            done();
          });
        });
        it('should have a response ststus of 404 given no id', done =>{
          chai.request(server)
          .delete('api/car/')
          .send({})
          .end((err, res) => {
            expect(res).to.have.status(400);
          });
          done();
        });
      });
    });
  });
});
