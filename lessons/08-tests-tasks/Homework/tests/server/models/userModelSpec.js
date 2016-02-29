require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var User = require('./../../../models/userModel');



describe('User Model', function() {
  it('should create a new user', function(done) {
    var user = new User({
      name: 'Milo'
    });
    user.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });
  