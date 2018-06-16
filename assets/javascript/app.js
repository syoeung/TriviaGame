var triviaQuestions = [{
	question: "How many planets are in the Solar System ?",
	answerList: ["7", "8", "9", "10"],
	answer: 1
},{
	question: " What is the largest planet in our solar system ? ",
	answerList: ["Pluto", "The Sun", "Jupiter", "Saturn"],
	answer: 2
},{
	question: " What is the smallest planet in our solar system? ",
	answerList: ["Venus", "Pluto", "Mercury", "Mars"],
	answer: 2
},{
	question: "What planet in this solar system is most suitable for life ?",
	answerList: ["Neptune", "Midgard", "Mars", "Earth"],
	answer: 3
},{
    question: "What roots did the name of the planets come from ? ",
	answerList: ["Greek", "Roman", "Egpytian", "Buddist"],
    answer: 1

},{
    question: "Which planet was stripped of its name and is no longer a planet in 2006? ",
	answerList: ["Pluto", "Mercury", "Uranus", "Earth"],
    answer: 0

},{
    question: " What planet is closest to the Sun ? ",
	answerList: ["Venus", "Mercury", "Neptune", "Pluto"],
    answer: 1

},{
    question: " What is the second smallest planet in the solar system ?  ",
	answerList: ["Uranus", "Mercury", "Mars", "Saturn"],
    answer: 2
    
},{
    question: " Name the only planet in the Solar System to have one moon. ?  ",
	answerList: ["Pluto", "Earth", "Mars", "Neptune"],
    answer: 1

},{
    question: " What does the name of our planet Earth mean?  ",
	answerList: ["The Soil Itself", "Pangea", "Dirt With Water", "Mother Nature"],
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
	seconds = 10;
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

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	
	//checks to see if correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 1300)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 1300);
    }
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}



	




