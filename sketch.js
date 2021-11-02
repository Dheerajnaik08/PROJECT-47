const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

var beanSadImg, bean, beanStandingImg, beanWithTeddyImg, backgroundImg, teddyImg, teddy;
var engine; 
var fruit;
var ground, bk_song, sad_sound;
var rope, teddy_con; 


function preload(){
beanSadImg = loadImage("Bean_Sad.png");
beanStandingImg = loadImage("bean_standing.png");
beanWithTeddyImg = loadImage("BeanWithTeddy.png");
backgroundImg = loadImage("Background.jpg");
teddyImg = loadImage("Teddy.png");
bk_song = loadSound("sound1.mp3");
sad_sound = loadSound("sad.wav");
}

function setup(){
createCanvas(1000,900);

engine = Engine.create();
world = engine.world;

button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  mute_btn = createImg("mute.png");
  mute_btn.position(450,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);

ground = new Ground(500, 890, 1000, 20);
rope = new Rope(7, {x: 245, y: 30});

teddy = Bodies.circle(500, 200, 50);
Matter.Composite.add(rope.body, teddy);

teddy_con = new Link(rope, teddy);
rectMode(CENTER);
ellipseMode(RADIUS);
imageMode(CENTER);

}

function draw(){
  background("black");
  image(backgroundImg, width/2, height/2, 1000, 900);

  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

    bean = createSprite(500, 750, 50,50);
    bean.addImage(beanStandingImg);
    bean.scale = 0.5;

    ground.show();
    rope.show();


   //image(teddyImg, teddy.position.x, teddy.position.y, 60, 60);
   ellipse(teddy.position.x, teddy.position.y, 30, 30);
    Engine.update(engine);
  drawSprites();

  if(collide(teddy,bean)==true)
  {
    bean.addImage(beanWithTeddyImg);
  }


  if(teddy!=null && teddy.position.y>=650)
  {
    bean.addImage(beanSadImg);
    teddy=null;
    bk_song.stop();
     sad_sound.play();
   }
}

function drop()
{
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function collide(body,sprite){
  if(body != null){
  var d = dist(body.position.x , body.position.y , sprite.position.x , sprite.position.y);
  if(d <= 80){
  World.remove(engine.world , fruit);
  fruit = null;
  return true;
  }
  else{
    return false;
  }
  
  }
  }

  function airBlow(){
    Matter.Body.applyForce(fruit,{x: 0, y:0}, {x: 0.01, y: 0});
  }
  
  function mute(){
    if(bk_song.isPlaying()){
      bk_song.stop();
    }
    else{
      bk_song.play();
    }
    
    
  }