const username = document.querySelector('#username');
const password = document.querySelector('#password');
const contact = document.querySelector('#contact');
const button1 = document.querySelector('#submit-btn1');

button1.addEventListener('click', (e) => {
	button1.innerText = 'Loading . . .';
	e.preventDefault();
	// the request body
	const content = {
		username : username.value,
		password : password.value,
		contact  : contact.value
	};
	const requestOptions = {
		method  : 'POST',
		headers : { 'Content-Type': 'application/json' },
		body    : JSON.stringify(content)
	};
	fetch('https://quizville-app.herokuapp.com/api/users/signup', requestOptions)
		.then((res) => {
			if (!res.ok) {
				throw new Error('Something Went Wrong!');
			}
			return res.json();
		})
		.then((res) => {
			localStorage.setItem('token', res.token);
			alert(res.message);
			window.location.assign('/base.html');
		})
		.catch((error) => {
			alert('Something went wrong!\nCheck Network Connection\nTry again later!!');
			username.value = ' ';
			password.value = ' ';
			contact.value = ' ';
			button1.innerText = 'Submit!';
			console.log(error);
		});
});
