'use strict';

const Ninja = require('../models/ninjas');
const expect = require('chai').expect;

let newNinja = new Ninja({"name":"bob", "clan":"burpface", "weapons":"badpuns"});

describe('ninja module', function(){
  it ('should create a new ninja name', done => {
    expect(newNinja.name).to.equal('bob');
    done();
  });
  it('should have a value for .clan', done => {
    expect(newNinja.clan).to.equal('burpface');
    done();
  });
  it('should have a unique uuid value', done => {
    expect(newNinja.weapons).to.equal('badpuns');
    done();
  });
});
