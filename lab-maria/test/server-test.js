
'use strict';
const app = require('../server');
const chai = require('chai');
const http = require('chai-http');
const expect = chai.expect;
chai.use(http);

describe('server module', function() {
  let resource;
  let resource2;
  let id1;
  let id2;

  describe('POST METHOD', function() {
    it('should post a note', done => {
      chai.request(app)
      .post('/api/note')
      .send({owner: 'Light', shinigami: 'Ryuuk', deathCount: 9000})
      .end((err, res) => {
        if(err) console.error(err.message);
        resource = res.body;
        id1 = resource._id;
        console.log(id1);
        expect(res.status).to.equal(200);
        done();
      }); //close end
    }); // close it
    it('should post this other note', done => {
      chai.request(app)
      .post('/api/note/')
      .send({owner: 'Misa Misa', shinigami: 'Rem', deathCount: 20})
      .end((err, res) => {
        if(err) console.error(err.message);
        resource2 = res.body;
        id2 = resource2._id;
        console.log(id2);
        expect(res.status).to.equal(200);
        done();
      }); //close end
    }); // close it
  });


  describe('GET method', function() {
    describe('/api/note route', function() {
      describe('a properly formatted request', function() {
        it('should return a resource given proper id', done => {
          chai.request(app)
          .get(`/api/note/${id1}`)
          .end((err, res) => {
            if(err) console.error(err.message);
            let expected = res.body;
            expect(expected).to.deep.equal(resource);
            done();
          }); // close end
        }); // close it

        it('should return a 200 status code', done => {
          chai.request(app)
          .get(`/api/note/${id2}`)
          .end((err, res) => {
            if(err) console.error(err);
            expect(res.status).to.equal(200);
            done();
          }); // close end
        }); //close it

        it('should return an array of all notes when not given an id', done => {
          chai.request(app)
          .get('/api/note')
          .end((err, res) => {
            if(err) console.error(err);
            let expected = res.body;
            expect(res.status).to.equal(200);
            expect(expected).to.be.a('array');
            expect(expected.length).to.equal(2);
            done();
          }); // close end
        });
      }); // close proper format

      describe('an improperly formatted request', function() {
        it('should return 400/bad request', done => {
          chai.request(app)
          .get('/api/note/bob')
          .end((err, res) => {
            if(err) console.error(err.message);
            expect(res.status).to.equal(404);
            done();
          }); //close end
        }); //close it
      }); //close improp format

      describe('unregistered route', function() {
        it('should write 404 to the response head in router.js', done => {
          chai.request(app)
          .get('/api/not')
          .end((err, res) => {
            if(err) console.error(err.message);
            expect(res.status).to.equal(404);
            done();
          }); //close end
        }); // close it
      }); // close unregistered
    }); // close describe /api/note route
  });// close describe GET method

  describe('PUT method', function() {
    describe('/api/note route', function() {
      it('should update a resource with a 200 status', done => {
        chai.request(app)
        .put(`/api/note/${id1}`)
        .send({owner: 'Misa Misa', shinigami: 'Ryuuk', deathCount: 9001})
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(200);
          done();
        }); // close end
      }); // close it
      it('should retrive the updated note', done => {
        chai.request(app)
        .get(`/api/note/${id1}`)
        .end((err, res) => {
          if(err) console.error(err.message);
          let expected = res.body;
          expect(expected.owner).to.equal('Misa Misa');
          done();
        });
      });
    }); // close describe route

    describe('bad request', function() {
      it('should respond with 400/bad request', done => {
        chai.request(app)
        .put(`/api/note?id=${resource._id}`)
        .send({owner: 'Misa Misa', shinigami: 'Ryuuk', deathCount: 9001})
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(404);
          expect(err.message).to.include('Not Found');
          done();
        }); // close end
      }); // close it
    });// close describe bad route
  }); //close put method


  describe('DELETE method', function() {
    describe('/api/note route', function() {
      it('should delete resource with a 200 status', done => {
        chai.request(app)
        .delete(`/api/note/${id1}`)
        .end((err, res) => {
          if(err) console.error('wtfsa' + err.message);
          expect(res.status).to.equal(200);
        }); // close end
        chai.request(app)
        .delete(`/api/note/${id2}`)
        .end((err, res) => {
          if(err) console.error(err.message);
          expect(res.status).to.equal(200);
        }); // close end
        done();
      }); // close it

      it('should not be able to GET a deleted resource', done => {
        chai.request(app)
        .get(`/api/note/${id1}`)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
        }); // close end
        chai.request(app)
        .get(`/api/note/${id2}`)
        .end((err, res) => {
          if(err) console.error(err);
          expect(res.status).to.equal(404);
          done();
        }); // close end
      }); // close it

    }); // close describe route
  }); //close delete method
}); // close describe app module
