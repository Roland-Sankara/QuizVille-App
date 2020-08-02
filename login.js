const username = document.querySelector('#username');
const password = document.querySelector('#password');
const button2 = document.querySelector('#submit-btn2');

button2.addEventListener('click', (e) => {
	button2.innerText = "Loading . . ."
	e.preventDefault();
	// the request body
	const content = {
		username : username.value,
		password : password.value
	};
	const requestOptions = {
		method  : 'POST',
		headers : { 'Content-Type': 'application/json' },
		body    : JSON.stringify(content)
	};
	fetch('https://quizville-app.herokuapp.com/api/users/login', requestOptions)
		.then((res) => {
			if (!res.ok) {
				throw new Error('Something Went Wrong!');
			}
			return res.json();
		})
		.then((res) => {
			localStorage.setItem('token', res.token);
			alert('Login Successfull');
			window.location.assign('/base.html');
		})
		.catch((error) => {
			alert('Wrong username or password\nEnter Valid Username and Password');
			username.value = ' ';
			password.value = ' ';
			button2.innerText = 'Submit!';
			console.log(error);
		});
});
