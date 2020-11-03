var doggy, doggyImage, happyDog, database, foodS, foodStock
var feed, addFood;
var fedTime, lastFed;
var r, m;
function preload()
{
  doggyImage = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500, 500);
  doggy = createSprite(370,250,100,100);
  doggy.addImage("doge",doggyImage);
  doggy.scale = 0.3;

        feed = createButton("Feed The Dog");
        feed.position(500,85);
        feed.mousePressed(feedDog);

        addFood=createButton("Add Food");
        addFood.position(650,85);
        addFood.mousePressed(addFoods);


  milk = new Food();
  milk.getFoodStock();
  
  database.ref("time").on("value",function (data){
    var time = data.val()
    r = time.hour
    m = time.minute
    console.log(time);
  })
}


function draw() { 
  background(rgb(46, 139, 87));
  milk.display();
  drawSprites();
  console.log(m)
  console.log(r);
  textSize(15);
  stroke("black");
  fill("black");
  if (r !== undefined && m !== undefined)
  text("LAST FED: "+r+":"+m,20,40);
}

function addFoods() {
  milk.foodStock = milk.foodStock + 1
  database.ref('/').update({
    food : milk.foodStock
  })
}

function feedDog() {
  milk.deductFood();
  doggy.addImage("doge",happyDog);
  r = hour();
  m = minute();
  database.ref("time").update({
    hour : r,
    minute : m
  })
}




