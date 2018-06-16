var triviaQuestions = [{
	question: "How many planets are in the Solar System?",
	answerList: ["7", "8", "9", "10"],
	answer: 1
},{
	question: " What is the largest planet in our solar system? ",
	answerList: ["PLuto", "The Sun", "Jupiter", "Saturn"],
	answer: 2
},{
	question: " What is the smallest planet in our solar system? ",
	answerList: ["Venus", "Pluto", "Mercury", "Mars"],
	answer: 2
},{
	question: "What planet in this solar system is most suitable for life",
	answerList: ["Neptune", "Midgard", "Mars", "Earth"],
	answer: 3
},{
    question: "What roots did the name of the planets come from? ",
	answerList: ["Greek", "Roman", "Egpytian", "Buddist"],
    answer: 1

},{
    question: "Which planet was stripped of its name and is no longer a planet in 2006? ",
	answerList: ["Pluto", "Mercury", "Uranus", "Earth"],
    answer: 0
    
    
}];

var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}

//Start the Game
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
    answered = true;

    //sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
    }
    
    //Setting a timer for each question
    countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
    });
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

	




