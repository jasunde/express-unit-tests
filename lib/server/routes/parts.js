var express = require("express");
var router = express.Router();
var spaceshipParts = require('../modules/spaceship-parts');

// return the spaceshipParts data
router.get('/', function(req, res){ // parts/parts baby
  res.send(spaceshipParts);
});

// add a new requirement to the spaceshipParts
router.post('/new', function(req, res){ // keep me posted if you solve this one
  spaceshipParts.push(req.body);
  res.sendStatus(201);
});

// return the number of spaceships that can be made with the available parts
router.get('/rocketCount', function(req, res){
  var numberOfSpaceships = Math.floor(spaceshipParts[0].inStock/spaceshipParts[0].needed);
  for(var i = 1; i < spaceshipParts.length; i++){
    numberOfSpaceships = Math.min(numberOfSpaceships, Math.floor(spaceshipParts[i].inStock/spaceshipParts[i].needed));
  }

  var howMany = { count: numberOfSpaceships }
  res.send(howMany);  // numberOfSpaceships is a number, how does express like that?
  // Express does not like that sends an internal server error status: 500
});

module.exports = router;
