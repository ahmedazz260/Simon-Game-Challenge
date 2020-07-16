gamePattern=[];
userClickedPattern=[];
level=0;

function nextSequence(){
randomNumber=Math.floor(Math.random()*4);
buttonColours=["red","blue","green","yellow"];
randomChosenColour=buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
console.log(gamePattern);
buttonSequence(randomChosenColour);
level++;
$("h1").text("Level "+level)
}

function buttonPressed(ChosenButton){
$("#"+ChosenButton).addClass("pressed");
setTimeout(function(){
$("#"+ChosenButton).removeClass("pressed");
},100);
}

function playSound(name){
mySound=new Audio("sounds/"+name+".mp3");
mySound.play();
}

function buttonSequence(ChosenButton){
$("#"+ChosenButton).fadeOut(100);
playSound(ChosenButton);
$("#"+ChosenButton).fadeIn(100);
}

$(".btn").click(function(event){
userChosenColour=event.target.id;
userClickedPattern.push(userChosenColour);
playSound(userChosenColour);
animatePress(userChosenColour);
checkAnswer(userClickedPattern.length-1);
console.log(userClickedPattern);
});

function animatePress(currentColour){
$("#"+currentColour).addClass("pressed");
setTimeout(function(){
$("#"+currentColour).removeClass("pressed");
},100);
}

$(document).keypress(function(){
if (gamePattern.length==0){
  nextSequence();
  $("h1").text("Level "+level);
}
});

function checkAnswer(currentLevel){

if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
  if(gamePattern.length==userClickedPattern.length){
      setTimeout(nextSequence,1000);
      userClickedPattern=[];
  }
}
else{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
}
