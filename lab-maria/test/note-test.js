'use strict';

const DeathNote = require('../model/deathnote');
const expect = require('chai').expect;

describe('Death Note module', function() {
  describe('when creating a new Death Note object', function() {
    let newNote = new DeathNote({owner:'Light', shinigami:'Ryuuk', deathCount: 9000});
    it('should belong to Light', done => {
      expect(newNote.owner).to.equal('Light');
      done();
    });
    it('should be from Ryuuk', done => {
      expect(newNote.shinigami).to.equal('Ryuuk');
      done();
    });
    it('should have 9000 names in it', done => {
      expect(newNote.deathCount).to.equal(9000);
      done();
    });
    it('should have a unique ID provided by mongo', done => {
      let pattern = /[0-9a-f]{24}/;
      expect(newNote.id).to.match(pattern);
      done();
    });
  });
});
