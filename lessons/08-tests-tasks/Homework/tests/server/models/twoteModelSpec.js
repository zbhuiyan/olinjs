require('./../../../app'); // to connect to the database
var expect = require('chai').expect;
var Twote = require('./../../../models/twoteModel');



describe('Twote Model', function() {
  it('should create a new twote', function(done) {
    var twote = new Twote({
      user: 'Milo',
      text: "hi",
      time: 1456463065566
    });
    twote.save(function(err) {
      if (err) {
        return done(err);
      }
      done();
    });
  });

