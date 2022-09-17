var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];


var started = false;
var level = 0;



$(document).keypress(function () {
  if(!started){
    $('#level-title').text('Level '+ level);
    nextSequence();
    started = true;
  }  
});
 

$('.btn').click(function () { 
    var userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);


    checkAnswer(userClickedPattern.length - 1);
  
});
function checkAnswer(currentLevel){
 
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
     console.log('Success');

       if(userClickedPattern.length === gamePattern.length){
            setTimeout(function (){
              nextSequence();
            }, 1000);
          }
       }  else {

             console.log('Wrong');

             playSound('wrong');

             $('body').addClass('game-over');

             setTimeout(function (){
              $('body').removeClass('game-over')
          }, 200);

          $('#level-title').text('Game over, Press Any key to Restart');
          startOver();
       }    
  }



 


function nextSequence(){
   userClickedPattern = [];

    level++;
    $('#level-title').text('Level' + level);   

    var randomNumber = Math.floor(Math.random() * 4); 
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
   

   // 1. Use jQuery to select the button with the same id as the randomChosenColor
   // 2. Add an animation
   $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100)
   playSound(randomChosenColour);

}

// Play sound corresponding to the button pressed
function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();

}

function animatePress(currentColor){
  $('#' + currentColor).addClass('pressed');

  setTimeout(function(){
    $('#' + currentColor).removeClass('pressed');
  }, 100)
}

function startOver(){
     level = 0;
     gamePattern = [];
     started = false;

}

