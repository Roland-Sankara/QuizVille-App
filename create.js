const question = document.querySelector('#question');
const answer = document.querySelector('#answer');
const wrong1 = document.querySelector('#wrong1');
const wrong2 = document.querySelector('#wrong2');
const wrong3 = document.querySelector('#wrong3');
const topic = document.querySelector('#topic');
const category = document.querySelector('#category');
const submit = document.querySelector('#submit-btn');

submit.addEventListener('click', (e) => {
	submit.innerText = 'Loading . . . ';
	e.preventDefault();
	let wrong_answers = [];
	wrong_answers.push(wrong1.value, wrong2.value, wrong3.value)

	// the request body
	console.log(wrong_answers);
	const content = {
		question          : question.value,
		category          : category.value,
		correct_answer    : answer.value,
		incorrect_answers : wrong_answers,
		topic             : topic.value.toLowerCase()
	};
	const requestOptions = {
		method  : 'POST',
		headers : { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` },
		body    : JSON.stringify(content)
	};
	fetch(' https://quizville-app.herokuapp.com/api/questions/', requestOptions)
		.then((res) => {
			if (!res.ok) {
				throw new Error('Something Went Wrong!');
			}
			return res.json();
		})
		.then((res) => {
			console.log(res.message);
			alert(res.message);
		})
		.catch((error) => {
			alert('Failed to create Question');
			submit.innerText = 'Submit!';
			console.log(error);
		});
});
