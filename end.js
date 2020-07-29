const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const recentScore = localStorage.getItem('recentScore');
finalScore.innerText = `${recentScore}%`;
const max_highScores = 5;

// clear localStorage api-url
localStorage.removeItem('categoryUrl');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
username.addEventListener('keyup', () => {
	saveScoreBtn.disabled = !username.value.match(/[a-zA-Z0-9_-]/);
});

saveHighScore = (e) => {
	console.log('Clicked the save Button');
	e.preventDefault();

	const score = {
		score : `${recentScore}%`,
		name  : username.value
	};
	highScores.push(score);
	highScores.sort((a, b) => b.score - a.score); // sorting the array in decending order
	highScores.splice(5); //cut off items after the fifth index
	localStorage.setItem('highScores', JSON.stringify(highScores));
	window.location.assign('/');
};
