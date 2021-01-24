var Engine = Matter.Engine, World = Matter.World, Events = Matter.Events, Bodies = Matter.Bodies;
 
var gameState = "play";
var particle;
var plinkos = [];
var divisions = [];
var divisionHeight=300;
var score = 0;
var turn = 0;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}


function draw() {
  background("lightBlue");
  textSize(20)
 //text("Score : "+score,20,30);
  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
   
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }
  

  ground.display();

  

  if(particle){
    particle.display();
    
    if(particle.body.position.y > 760){
      if(particle.body.position.x < 300 && particle.body.position.x>0){
        score += 500;
      } else if(particle.body.position.x < 600 && particle.body.position.x > 300){
        score += 100;
      } else if(particle.body.position.x > 600 && particle.body.position.x < 900){
        score += 200;
      }
      particle = null;
    }
  }
push();
  textSize(30);
  fill("white");
  text("Score: "+score,20,30);

  text("500",15,565);
  text("500",95,565);
  text("500",175,565);
  text("500",255,565);
  text("100",335,565);
  text("100",415,565);
  text("100",495,565);
  text("200",575,565);
  text("200",655,565);
  text("200",735,565);

  pop();

  if(turn == 5 && particle == null){
    gameState = "end";
  }

  if(gameState === "end"){
    textSize(75);
    fill("red");
    text("GAME OVER",160,475);
  }
  
}

function mousePressed(){
    if(gameState === "play"){
        turn++;
        particle = new Particle(mouseX,10,10);
    }
}
