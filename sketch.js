const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var gGround;

var particles = [];
var plinkos = [];
var divisions = [];
var particle;

var divisionHeight = 300;


var score = 0;
var count = 0;
var gameState = "start";

function setup() {
    createCanvas(570,800);
    engine = Engine.create();
    world = engine.world;
    gGround = new Ground(240,790,1200,10);
    
    //divisions
    for (var k = 0; k<=width; k = k + 80) {
      divisions.push(new Division(k, height-divisionHeight/2,10,divisionHeight));
    }
    //plinkos
    for (var j = 75; j<=width; j = j + 50) {
      plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j<=width-10; j = j + 50) {
      plinkos.push(new Plinko(j,175));
    }

    for (var j = 75; j<=width; j = j + 50) {
      plinkos.push(new Plinko(j,275));
    }

    for (var j = 50; j<=width-10; j = j + 50) {
      plinkos.push(new Plinko(j,375));
    }

}

function draw() {
  background("pink");
  Engine.update(engine);
  gGround.display();
  textSize(36);
  text("Score: " + score,150,40);
  
  text(" 500 ", 5, 550);
  text(" 300 ", 80, 550);
  text(" 100 ", 160, 550);
  text(" 50 ", 240, 550);
  text(" 100 ", 320, 550);
  text(" 300 ", 400, 550);
  text(" 500 ", 480, 550);

   for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }
   
  for (var j = 0; j<plinkos.length; j++) {
    plinkos[j].display();
  }
  for (var i = 0; i<particles.length; i++) {
    particles[i].display();
  }

  if(particle!=null) {
     particle.display();
      
      if (particle.body.position.y>760) {
        if (particle.body.position.x < 300) {
          score=score+500;      
          particle=null;
          if (count>= 5){
           gamestate ="end";     
          }                     
        }
        else if (particle.body.position.x > 301 && particle.body.position.x < 600 ){
            score = score + 100;
            particle=null;
            if (count>= 5){
              gamestate ="end";
            } 
          }
        else if (particle.body.position.x > 601 && particle.body.position.x < 900){
          score = score + 200;
          particle=null;
          if (count>= 5){
             gamestate ="end";
          }  
        }        
      }
      if (gameState =="end") {
        textSize(100);
        text("Game Over", 150, 250);
      }
    }
    }

function mousePressed(){
  if(gameState!=="end"){
    count++;
    particle=new Particle(mouseX, 10, 10, 10); 
  }   
}