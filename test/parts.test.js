var spaceshipPartsStub1 = [{"id":6374,"name":"Engine","needed":9,"inStock":79},{"id":6377,"name":"Landing Leg","needed":10,"inStock":47},{"id":6984,"name":"First Stage","needed":1,"inStock":9},{"id":8374,"name":"Second Stage","needed":1,"inStock":25},{"id":9394,"name":"Guide Fins","needed":4,"inStock":38}]; // 4

var spaceshipPartsStub2 = [{"id":6374,"name":"Engine","needed":9,"inStock":18},{"id":6377,"name":"Landing Leg","needed":6,"inStock":45},{"id":6984,"name":"First Stage","needed":1,"inStock":5},{"id":8374,"name":"Second Stage","needed":1,"inStock":51},{"id":9394,"name":"Guide Fins","needed":4,"inStock":53}]; // 2

var spaceshipPartsStub3 = [{"id":6374,"name":"Engine","needed":4,"inStock":40},{"id":6377,"name":"Landing Leg","needed":10,"inStock":31},{"id":6984,"name":"First Stage","needed":1,"inStock":3},{"id":8374,"name":"Second Stage","needed":1,"inStock":82},{"id":9394,"name":"Guide Fins","needed":4,"inStock":29}] // 3

var spaceshipPartsStub4 = [{"id":6374,"name":"Engine","needed":7,"inStock":54},{"id":6377,"name":"Landing Leg","needed":3,"inStock":85},{"id":6984,"name":"First Stage","needed":1,"inStock":9},{"id":8374,"name":"Second Stage","needed":1,"inStock":79},{"id":9394,"name":"Guide Fins","needed":4,"inStock":51}] // 7

var spaceshipPartsStubArray = [];
spaceshipPartsStubArray.push(spaceshipPartsStub1);
spaceshipPartsStubArray.push(spaceshipPartsStub2);
spaceshipPartsStubArray.push(spaceshipPartsStub3);
spaceshipPartsStubArray.push(spaceshipPartsStub4);
var spaceshipPartsStub = spaceshipPartsStub1;


var querystring = require('querystring')
var proxyquire = require('proxyquire');
var assert =  require('assert');
var server = proxyquire('../lib/server/routes/parts', {'../modules/spaceship-parts': spaceshipPartsStub});
var http = require('http');
var expect = require("chai").expect;
var sinon = require("sinon");

console.log("Testing the parts module");

describe('server', function () {
  before(function () {
    server.listen(8000);
  });

  after(function () {
    server.close();
  });
});

describe('the "/parts" route', function () {
  it('should return a 200 status', function (done) {
    http.get('http://localhost:8000/parts', function (res) {
      assert.equal(res.statusCode, 200);
      done();
    });
  });

  // spaceshipPartsStubArray.forEach(function(partsStub){
  // spaceshipPartsStub = partsStub;
  it('should respond with the values created in the "spaceship-parts.js" module', function (done) {
    http.get('http://localhost:8000/parts', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        assert.equal(data, JSON.stringify(spaceshipPartsStub));
        done();
      });
    });
  });
  // });


});
//
describe('the "/parts/new" route', function () {
  it('should return a 201 status', function (done) {
    var data = JSON.stringify({"name":"Guide Blam","needed":4,"inStock":38})

    var req = http.request({
      hostname: 'localhost',
      port: 8000,
      method: 'POST',
      path: '/parts/new',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    }, function (res) {
      assert.equal(res.statusCode, 201);
      done();
    });

    req.write(data)
    req.end()
  });

  // spaceshipPartsStubArray.forEach(function(partsStub){
  // spaceshipPartsStub = partsStub;
  xit('should respond with the values created in the "spaceship-parts.js" module', function (done) {
    http.get('http://localhost:8000/parts/new', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        assert.equal(data, JSON.stringify(spaceshipPartsStub));
        done();
      });
    });
  });
  // });


});

describe('the "/parts/rocketCount" route', function () {
  it('should return a 200 status', function (done) {
    http.get('http://localhost:8000/parts/rocketCount', function (res) {
      assert.equal(res.statusCode, 200);
      done();
    });
  });

  it('should respond with the number of rockets it is possible to create based on the "spaceship-parts.js" module', function (done) {
    http.get('http://localhost:8000/parts/rocketCount', function (res) {
      var data = '';

      res.on('data', function (chunk) {
        data += chunk;
      });

      res.on('end', function () {
        assert.equal(JSON.parse(data).count, 4);
        done();
      });
    });
  });

});
