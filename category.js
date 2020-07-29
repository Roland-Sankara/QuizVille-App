// CATEGORY-SELECTION
const option = document.querySelector('#categories');
const playBtn = document.querySelector('#play');
playBtn.classList.add('hidden');

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
			localStorage.setItem(
				'categoryUrl',
				'https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple'
			);
			playBtn.classList.remove('hidden');
			break;
		default:
			console.log('SELECT A QUIZ CATEGORY');
	}
});
