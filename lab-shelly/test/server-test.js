'use strict';

const server = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;

chai.use(http);

describe('Server module', () => {
  let app;
  before(done => {
    app = server.listen(8000);
    done();
  });
  after(done => {
    app.close();
    done();
  });
// ==POST===
  describe('POST method', () => {
    describe('/api/cat route', () => {
      describe('a properly formatted request', () => {
        it('should return a 200 response', done => {
          chai.request(server)
          .post('/api/cat')
          .send({name: 'milo', mood:'happy'})
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });
        it('should return a response object', done => {
          chai.request(server)
          .post('/api/cat')
          .send({name: 'milo', mood:'happy'})
          .end((err, res) => {
            expect(res).to.be.an('object');
            done();
          });
        });
        it('should return a created cat with name "milo"', done => {
          chai.request(server)
          .post('/api/cat')
          .send({name: 'milo', mood:'happy'})
          .end((err, res) => {
            console.log('body:', res.body);
            expect(res.body.name).to.equal('milo');
            done();
          });
        });
        it('should return a create cat with mood "happy"', done => {
          chai.request(server)
          .post('/api/cat')
          .send({name: 'milo', mood:'happy'})
          .end((err, res) => {
            expect(res.body.mood).to.equal('happy');
            done();
          });
        });
      });
      describe('a request without a valid body', () => {
        it('should respond with a 400 "bad request" error', done => {
          chai.request(server)
          .post('/api/cat')
          .send({})
          .end((err, res) => {
            expect(res).to.have.status(400);
            done();
          });
        });
      });
      describe('an registered request', () => {
        it('should respond with a 404 error', done => {
          chai.request(server)
          .post('/api/dog')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });
  });
// =======GET=====
  describe('GET method', () => {

    let resource;
    before(done => {
      chai.request(server)
      .post('/api/cat')
      .send({name: 'binky', mood: 'grumpy'})
      .end((err, res) => {
        resource = res.body;
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete('/api/cat')
      .query({id: resource._id})
      .end(() => {
        console.error();
        done();
      });
    });
    describe('/api/cat/:id route', () => {
      describe('a properly formmated request', () => {
        it('should return a 200 response', done => {
          chai.request(server)
          .get(`/api/cat/${resource._id}`)
          .end((err, res) => {
            expect(res.status).to.equal(200);
            done();
          });
        });
      });
      it('should return an item with name: "binky"', done => {
        chai.request(server)
        .get(`/api/cat/${resource._id}`)
        .end((err, res) => {
          expect(res.body.name).to.equal('binky');
          done();
        });
      });
      it('should return an item with mood:"grumpy"', done => {
        chai.request(server)
        .get(`/api/cat/${resource._id}`)
        .end((err, res) => {
          expect(res.body.mood).to.equal('grumpy');
          done();
        });
      });
    });
    describe('an unregistered request', () => {
      it('should return a 404 error', done => {
        chai.request(server)
        .get(`/api/dog}`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
      });
    });
    describe('/api/cat route', () => {
      it('should return an array of all cats', done => {
        chai.request(server)
        .get(`/api/cat`)
        .end((err, res) => {
          expect(res).to.be.a('object');
          done();
        });
      });
    });
  });
// =======PUT =====
  describe('PUT method', () => {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/cat')
      .send({name: 'binky', mood: 'grumpy'})
      .end((err, res) => {
        resource = res.body;
        done();
      });
    });

    after(done => {
      chai.request(server)
      .delete('/api/cat')
      .query({id: resource._id})
      .end(() => {
        console.error();
        done();
      });
    });

    describe('/api/cat/:id route', () => {
      describe('a properly formatted request', () => {
        it('should return a 200 response', done => {
          chai.request(server)
          .put(`/api/cat/${resource._id}`)
          .send({name: 'milo', mood: 'happy'})
          .end((req, res) => {
            expect(res).to.have.status(200);
            done();
          });
        });
        it('should return a response object', done => {
          chai.request(server)
          .put(`/api/cat/${resource._id}`)
          .send({name: 'milo', mood: 'happy'})
          .end((req, res) => {
            expect(res).to.be.an('object');
            done();
          });
        });
        it('should update the name to "milo"', done => {
          chai.request(server)
          .put(`/api/cat/${resource._id}`)
          .send({name: 'milo', mood: 'happy'})
          .end((err, res) => {
            expect(res.body.name).to.equal('milo');
            done();
          });
        });
        it('should update the mood to "happy"', done => {
          chai.request(server)
          .put(`/api/cat/${resource._id}`)
          .send({name: 'milo', mood: 'happy'})
          .end((err, res) => {
            expect(res.body.mood).to.equal('happy');
            done();
          });
        });
      });
      describe('an invalid request', () => {
        it('should return a 404 error', done => {
          chai.request(server)
          .put(`/api/cat/dog`)
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });
  });
// ============
  describe('DELETE method', () => {
    let resource;
    before(done => {
      chai.request(server)
      .post('/api/cat')
      .send({name: 'binky', mood: 'grumpy'})
      .end((err, res) => {
        resource = res.body;
        done();
      });
    });
    after(done => {
      chai.request(server)
      .delete('/api/cat')
      .query({id: resource._id})
      .end(() => {
        console.error();
        done();
      });
    });

    describe('/api/cat/:id route', () => {

      describe('a properly formmated request', () => {
        it('should return a 204 response', done => {
          chai.request(server)
          .delete(`/api/cat/${resource._id}`)
          .end((err, res) => {
            expect(res).to.have.status(204);
            done();
          });
        });
      });
      describe('a bad request', () => {
        it('should return a 404 response', done => {
          chai.request(server)
          .delete('/api/dog')
          .end((err, res) => {
            expect(res).to.have.status(404);
            done();
          });
        });
      });
    });
  });
});
