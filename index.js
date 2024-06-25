const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClicked = [];
var level = 0;
var started = false;

$(document).keydown(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        started = true;
        nextSequence();
    }
});

$(".btn").on("click", handleClick);



function handleClick() {
    let chosenColor = $(this).attr("id");
    userClicked.push(chosenColor);
    playSound(chosenColor);
    animatePress(chosenColor);
    checkAnswer(userClicked.length - 1);
}

function nextSequence() {
    userClicked = [];
    level++;
    $("#level-title").text("Level " + level);
    let num  = Math.floor(Math.random() * 4);
    let rColor = buttonColours[num];
    gamePattern.push(rColor);
    $("#" + rColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(rColor);
}

function playSound(name) {
    let audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(color) {
    $("#" + color).addClass("pressed");
    setTimeout(function() {
        $("#" + color).removeClass("pressed");
    }, 100);
}

function checkAnswer(currLevel) {
    if (userClicked[currLevel] === gamePattern[currLevel]) {
        if (userClicked.length === gamePattern.length) {
            setTimeout(function (){
                nextSequence();
            }, 1000);
        }
    } else {
        startOver();
    }
}

function startOver() {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart!");
    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);
    started = false;
    level = 0;
    gamePattern = [];
    userClicked = [];
}