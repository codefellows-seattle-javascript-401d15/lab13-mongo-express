'use strict';

// const Ninja = require('../models/ninjas');
const http = require('chai-http');
const chai = require('chai');
// const mocha = require('mocha');
const server = require('../server');
const expect = chai.expect;

chai.use(http);

describe('Server function check', function () {
  before(done => {
    server.listen(3000);
    done();
  });

  describe('POST method works', function() {
    describe('/api/ninja endoint', function() {
      it('should return a 404 error on a bad request', done =>{
        chai.request(server)
        .post('/derrrrrf')
        .send({})
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
      it('should return a 200 message on a successful request', done => {
        chai.request(server)
        .post('/api/ninja')
        .send({name: 'Jones', clan: 'Derk', weapons: 'dank memes'})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        });
      });
    });
  });

  describe('DELETE method works', function(){

    let resource;
    before(done => {
      chai.request(server)
      .post('/api/ninja')
      .send({name: 'cornelius', clan: '3baldguys', weapons: 'blunderbuss'})
      .end((err,res) => {
        resource = JSON.parse(res.text);
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete('/api/ninja')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });

    describe('/api/ninja route', function() {
      it('should return a 204 response with a succesful deletion', done => {
        chai.request(server)
        .delete('/api/ninja')
        .query({id: resource.id})
        .end((err,res) => {
          expect(res.status).to.equal(204);
          done();
        });
      });
    });

    describe('/api/ninja route', function() {
      it('Should return a 404 with an unsuccessful deletion', done => {
        chai.request(server)
        .delete('/api/ninja')
        .query({id: resource.id})
        .end((err,res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('GET method works', function(){

    let resource;
    before(done => {
      chai.request(server)
      .post('/api/ninja')
      .send({name: 'cornelius', clan: '3baldguys', weapons: 'blunderbuss'})
      .end((err,res) => {
        resource = JSON.parse(res.text);
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete('/api/ninja')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });

    describe('/api/ninja routes', function(){
      it('Should return a 200 response on a successful request', done => {
        chai.request(server)
        .get(`/api/ninja?id=${resource.id}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
      });
      it('Should return a 404 response without a valid id', done => {
        chai.request(server)
        .get(`/api/ninja?id=fartknocker`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
  });

  describe('PUT method works', function(){

    let resource;
    before(done => {
      chai.request(server)
      .post('/api/ninja')
      .send({name: 'cornelius', clan: '3baldguys', weapons: 'blunderbuss'})
      .end((err,res) => {
        resource = JSON.parse(res.text);
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete('/api/ninja')
      .query({id: resource.id})
      .end(() => {
        console.error();
        done();
      });
    });

    describe('/api/ninja', function() {
      it('Should give a 202 response on a successful put request', done =>{
        chai.request(server)
        .put('/api/ninja')
        .query({id: resource.id})
        .send({name: 'Greg', clan:'Kerkis', weapons: 'bad puns'})
        .end((err,res) => {
          expect(res.status).to.equal(202);
          done();
        });
      });
    });

    it('Should give a 404 message for a bad route', done =>{
      chai.request(server)
      .put('/api/floppsy')
      .send({name: 'Greg', clan:'Kerkis', weapons: 'bad puns'})
      .end((err,res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  after(done => {
    server.close();
    done();
  });
});
