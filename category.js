// CATEGORY-SELECTION
const option = document.querySelector('#categories');
const playBtn = document.querySelector('#play');
const playBtn2 = document.querySelector('#play2');
const topic_input = document.querySelector('#topic_input');
localStorage.removeItem('categoryUrl');
playBtn.classList.add('hidden');
playBtn2.classList.add('hidden');

//categories
option.addEventListener('click', (e) => {
	switch (e.target.value) {
		case 'general':
			localStorage.setItem(
				'categoryUrl',
				'https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple'
			);
			playBtn.classList.remove('hidden');
			break;
		case 'computer':
			localStorage.setItem(
				'categoryUrl',
				'https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple'
			);
			playBtn.classList.remove('hidden');
			break;
		case 'vehicles':
			localStorage.setItem(
				'categoryUrl',
				'https://opentdb.com/api.php?amount=10&category=28&difficulty=easy&type=multiple'
			);
			playBtn.classList.remove('hidden');
			break;
		case 'sports':
			localStorage.setItem(
				'categoryUrl',
				'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple'
			);
			playBtn.classList.remove('hidden');
			break;
		case 'geography':
			localStorage.setItem(
				'categoryUrl',
				'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple'
			);
			playBtn.classList.remove('hidden');
			break;
		case 'history':
			localStorage.setItem(
				'categoryUrl',
				'https://opentdb.com/api.php?amount=10&category=23&difficulty=easy&type=multiple'
			);
			playBtn.classList.remove('hidden');
			break;
		case 'animations':
			localStorage.setItem(
				'categoryUrl',
				'https://opentdb.com/api.php?amount=10&category=32&difficulty=easy&type=multiple'
			);
			playBtn.classList.remove('hidden');
			break;
		case 'any':
			localStorage.setItem('categoryUrl', 'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple');
			playBtn.classList.remove('hidden');
			break;
		default:
			console.log('SELECT A QUIZ CATEGORY');
	}
});

topic_input.addEventListener('keyup', (e) => {
	if (e.target.value !== '' && e.target.value.match(/[a-zA-Z]/) !== null) {
		playBtn2.classList.remove('hidden');
	} else {
		playBtn2.classList.add('hidden');
	}
});
//topics
playBtn2.addEventListener('click', () => {
	let topic = topic_input.value.toLowerCase();
	console.log(document.querySelector('#topic_input'));
	localStorage.setItem('categoryUrl', `https://quizville-app.herokuapp.com/api/questions/topic/${topic}`);
});
