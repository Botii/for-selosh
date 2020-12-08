const player1Spikes = [];

MENU = 0;




let astranoutImg;
let spikesImg;
let song; 

let timer = 20;
let countDownSwitch = false;

let scorePlayer1 = 0;   
let player1winning = false;



showingScore = 0 


// GAME WIDTH AND HEIGHT
const gameWH = 500;


    



function preload() {
  astranoutImg = loadImage("assets/astranout.png");
  spikesImg = loadImage("assets/spikes.png");
  song = loadSound('assets/sound.mp3');
}

function setup() {
  const canvas = createCanvas(gameWH, gameWH);
  canvas.parent("game");
  song.play();

  imageMode(CENTER, CENTER);




  astranout1 = createSprite();
  astranout1.scale = 0.1;
  astranout1.addImage(astranoutImg);
  astranout1.position.y = gameWH * 0.9;
  astranout1.position.x = gameWH * 0.1;

  let facts = ['The Apollo astronauts\nfootprints on\nthe moon will probably stay there\nfor at least 100 million years', 'Space is completely silent', ' 99 percent of our solar\nsystems mass is the sun', 'One day on Venus is longer\nthan one year on Earth'];
  Fact = random(facts)

  

  // GENERATE SPIKES FOR PLAYER 1
  for (let x = 0; x < 3; x++) {
    const spike = createSprite(random( gameWH * 1) + 1);
    spike.addImage(spikesImg);  
    spike.scale = 0.10;

    player1Spikes.push(spike);
  }
}




function draw() {
  console.log(mouseX, mouseY);
  console.log(MENU);

  background(255);

  fill(0, 255, 0);
  rect(50, 50, 200, 75);
  fill(255, 0, 0);
  rect(50, 200, 200, 75);
  fill(255, 127, 0);
  rect(50, 350, 200, 75);
  textSize(50)
  fill(255);
  text('START', 70, 106);
  text('EXIT', 94, 406);
  textSize(26);
  text('INSTRUCTIONS', 52, 248);


  if (MENU === 1){

   background(50);

    drawSprites();
    playerControls();
    spikesDown();

    textSize(20);
    text('score = ',  10, 20);
    textSize(19.5);
    text(scorePlayer1, 80, 22);
  

    /////////////timer////////////////
    textAlign(CENTER,CENTER);
    textSize(100);
    text(timer, width/2, height/2);
    if (frameCount % 60 == 0 && timer > 0){
      timer--;
    }
    if (timer <= 0){
      textSize(20);
      text('game over', width/2, height * 0.667);
      MENU = 0
      showingScore =+ scorePlayer1;
  }
  }


  if (MENU === 0){

    timer = 20; 
    scorePlayer1 = 0




    background(50);

    textSize(20)
    text("YOUR SCORE = " + showingScore, width / 2 + 20, height / 2 - 100)




    fill(0, 255, 0);
    rect(50, 50, 200, 75);
    fill(255, 0, 255);
    rect(50, 200, 200, 75);
    fill(255, 0, 0);
    rect(50, 350, 200, 75);
    textSize(50)
    fill(255);
    text('START', 70, 106);
    text('EXIT', 94, 406);
    textSize(26);
    text('INSTRUCTIONS', 52, 248);
    textSize(15)
    text("FUN FACT = \n" + Fact, width / 2 +20, height / 2 + 150)

    

    
  }

  if (MENU == 2) {
    background(50)
    textSize(20)
    text('Right Click to return to MENU', 200, 100)
    textSize(10)
    text('1. Rockets will fall from the top of the screen.', 50, 150)
    text('2. Move your character using arrow keys', 50, 200)
    text('<- and -> to catch the rockets, every rocket will increase your score', 80, 240)
    text('3. The game is over when the timer runs out, go CATCH SOME ROCKETS.', 50, 290)
    
    if (mouseButton == RIGHT) {
      MENU = 0
    }
  }
  if (MENU === 3){
    background(255, 0, 0)
    textSize(45)
    text('COME AGAIN SOON!', 25, height / 2)
    
  }

 
}


function spikesDown() {


      // PLAYER 1 SPIKES
  for (let x = 0; x < player1Spikes.length; x++) {
    // CHECKS IF SPIKE IS COLLIDING WITH PLAYER
    player1Spikes[x].collide(astranout1, function() {
      this.position.x = random( ( gameWH * 0.9) + 1);
      this.position.y = gameWH * 0.1;
      scorePlayer1 += 10;
    });

    // PUT SPIKE BACK TO TOP IF IT REACHES GROUND
    if (player1Spikes[x].position.y >= gameWH) {
      player1Spikes[x].position.x = random( (gameWH * 0.9) + 1);
      player1Spikes[x].position.y = gameWH * 0.1;
    } else {

      if(scorePlayer1 <= 100){
        player1Spikes[x].position.y += 5;
      }
      
      else if(scorePlayer1 >= 100){
        player1Spikes[x].position.y += 10;
      }

      else if(scorePlayer1 >= 200){
        player1Spikes[x].position.y += 15;
      }
      else if(scorePlayer1 >= 300){
        player1Spikes[x].position.y += 20;
      }
      else if(scorePlayer1 >= 400){
        player1Spikes[x].position.y += 25;
      }
      else if(scorePlayer1 >= 500){
        player1Spikes[x].position.y += 30;
      }

    }
  }
}

  

function playerControls() {
  // PLAYER 1 | A
  if (keyIsDown(65)) {
    if (astranout1.position.x > 45) {
      astranout1.position.x -= 10
    }
  }

  // PLAYER 1 | D
  if (keyIsDown(68)) {
    if (astranout1.position.x < (445)) {
      astranout1.position.x += 10;
    }
  }
}



function mouseClicked() {
  if (MENU == 0) {
    if (mouseX < 200 && mouseX > 50) {
      if (mouseY < 125 && mouseY > 50) {
        MENU = 1
      }
      if (mouseY < 275 && mouseY > 200) {
        MENU = 2
      }
      if (mouseY < 425 && mouseY > 350) {
        MENU = 3
      }
    }
  }
}







//function GameOver(Timer, gameOverScreen){
 // background(50)
  //rect(0,0, 500, 500)
  //textAlign(CENTER);
  //text('GAME OVER', width / 2, height / 2)
  //text("SCORE = " + scorePlayer1, width / 2, height / 2 + 20)
  //text('click to play again', width / 2, height / 2 + 40);
  //Erase();
//}
























































