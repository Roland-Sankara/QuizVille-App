const question = document.querySelector('#question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const loader = document.getElementById('loader');
const game = document.getElementById('game');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');
let categoryUrl = localStorage.getItem('categoryUrl');

let currQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions = [];
fetch(categoryUrl)
	.then((res) => {
		if (!res.ok) {
			throw new Error('Something Went Wrong >> Failed to load Questions');
		} else {
			return res.json();
		}
	})
	.then((loadedQuestions) => {
		// questions = loadedQuestions;
		localStorage.setItem('topic', loadedQuestions.results[0].topic);
		localStorage.setItem('category', loadedQuestions.results[0].category);
		//console.log(loadedQuestions.results);
		questions = loadedQuestions.results.map((loadedQuestion) => {
			const formatedQuestion = {
				question : loadedQuestion.question
			};
			const answerChoices = [ ...loadedQuestion.incorrect_answers ];
			formatedQuestion.answer = Math.floor(Math.random() * 3) + 1;
			answerChoices.splice(formatedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

			answerChoices.forEach((choice, index) => {
				formatedQuestion['choice' + (index + 1)] = choice;
			});
			//console.log(formatedQuestion);
			return formatedQuestion;
		});
		startGame();
	})
	.catch((err) => {
		console.log(err);
	});

// CONSTANTS
const correct_bonus = 10;
let max_questions = 0;

const startGame = () => {
	questionCounter = 0;
	score = 0;
	availableQuestions = [ ...questions ];
	max_questions = availableQuestions.length;
	getNewQuestion();
	game.classList.remove('hidden');
	loader.classList.add('hidden');
};

getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter > max_questions) {
		localStorage.setItem('recentScore', score);
		localStorage.setItem('scorePercent', `${score / (max_questions * 10) * 100}`);
		//go to the end page
		return window.location.assign('/end.html');
	}
	questionCounter++;
	progressText.innerText = `Question ${questionCounter}/${max_questions}`;

	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currQuestion = availableQuestions[questionIndex];
	question.innerHTML = currQuestion.question;

	choices.forEach((choice) => {
		const number = choice.dataset['number'];
		choice.innerText = currQuestion['choice' + number];
	});

	availableQuestions.splice(questionIndex, 1);
	acceptingAnswers = true;
};

choices.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		//update the progress bar
		progressBarFull.style.width = `${questionCounter / max_questions * 100}%`;

		if (!acceptingAnswers) return;
		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];
		// check whether the answer is correct.
		const classToApply = selectedAnswer == currQuestion.answer ? 'correct' : 'incorrect';
		if (classToApply === 'correct') {
			incrementScore(correct_bonus);
		}
		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(classToApply);
			getNewQuestion();
		}, 600);
	});

	incrementScore = (num) => {
		score += num;
		scoreText.innerText = score;
	};
});
