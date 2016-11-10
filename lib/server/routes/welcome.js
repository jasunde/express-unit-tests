// Call back for the /hello path
function spaceshipWelcome(req,res){
  res.send("Welcome to the spaceship factory!");
}

module.exports = spaceshipWelcome;
