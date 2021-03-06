const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore1 = document.getElementById('finalScore1');
const finalScore2 = document.getElementById('finalScore2');
const recentScore = localStorage.getItem('recentScore');
const scorePercent = localStorage.getItem('scorePercent');
const totalScore = document.querySelector('#totalPoints');
let ranking = `${recentScore / 10} points`;
let dbScore = `${recentScore / parseInt(localStorage.getItem('pointsMetric'))}`;
finalScore1.innerText = `>> ${Math.round(scorePercent)}% <<`;
finalScore2.innerText = ranking;
const max_highScores = 5;
let totalPoints = 0;

// the request body
const content = {
	topic    : localStorage.getItem('topic'),
	category : localStorage.getItem('category'),
	score    : dbScore
};
const requestOptions = {
	method  : 'POST',
	headers : { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
	body    : JSON.stringify(content)
};

//save to database
fetch('https://quizville-app.herokuapp.com/api/results/', requestOptions)
	.then((res) => {
		console.log('One');
		if (!res.ok) {
			throw new Error('Something Went Wrong >> Failed to save Result');
		} else {
			return res.json();
		}
	})
	.then((res) => {
		alert(res.message);
		console.log(res.message);
		return fetch('https://quizville-app.herokuapp.com/api/results/score', {
			method  : 'GET',
			headers : { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }
		});
	})
	.then((res) => {
		if (!res.ok) {
			throw new Error('Something Went Wrong >> Failed to get results!');
		} else {
			return res.json();
		}
	})
	.then((res) => {
		totalScore.innerText = `|===> ${res.result} total points`;
		totalPoints = res.result;
		console.log(res.result);
		return fetch('https://quizville-app.herokuapp.com/api/records/user', {
			method  : 'POST',
			headers : { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
			body    : JSON.stringify({
				score  : totalPoints,
				topics : [ localStorage.getItem('topic') ]
			})
		});
	})
	.then((res) => {
		console.log('Three');
		if (!res.ok) {
			throw new Error('Something Went Wrong >> Failed to save records!');
		} else {
			return res.json();
		}
	})
	.then((res) => {
		console.log(res.message);
	})
	.catch((err) => {
		//alert(err.error);
		console.log(err);
	});

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
username.addEventListener('keyup', () => {
	saveScoreBtn.disabled = !username.value.match(/[a-zA-Z0-9_-]/);
});

saveHighScore = (e) => {
	console.log('Clicked the save Button');
	e.preventDefault();

	const score = {
		score : ranking,
		name  : username.value
	};
	highScores.push(score);
	highScores.sort((a, b) => b.score - a.score); // sorting the array in decending order
	highScores.splice(5); //cut off items after the fifth index
	localStorage.setItem('highScores', JSON.stringify(highScores));
	window.location.assign('/base.html');
};
