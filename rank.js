const highScoresList = document.querySelector('#highScoresList');
//saving User record
fetch('https://quizville-app.herokuapp.com/api/records/', {
	method  : 'GET',
	headers : { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }
})
	.then((res) => {
		if (!res.ok) {
			throw new Error('Something Went Wrong >> Failed to save records!');
		} else {
			return res.json();
		}
	})
	.then((res) => {
		let rankArray = res.results.sort((a, b) => b.score - a.score);
		rankArray.splice(5);
		highScoresList.innerHTML = rankArray
			.map((result) => `<li class="high-score">${result.username} => ${result.score}</li>`)
			.join('');
	})
	.catch((err) => {
		alert(err);
		console.log(err);
	});
