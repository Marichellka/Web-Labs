'use strict';

const form = document.getElementById('mailForm');

function sendRequest(body) {
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://lab2apiemail.azurewebsites.net/email');
	//xhr.open('POST', 'https://localhost:5003/email');
	xhr.setRequestHeader('content-type', 'application/json');
	xhr.send(JSON.stringify(body));

	xhr.onload = function() {
		document.getElementById('spinner').style.display = 'none';
		if (xhr.status === 400) {
			const { errors } = JSON.parse(xhr.response);
			const errorsList = [];

			for (const key in errors) {
				for (const error of errors[key]) {
					errorsList.push(error);
				}
			}

			const errorsString = errorsList.join('\n');
			alert(`Error ${xhr.status}: ${errorsString}`);
		} else if (xhr.status < 200 || xhr.status > 400) {
			alert(xhr.response);
		} else {
			alert(`Done!`);
		}
	};
	document.getElementById('mailForm').reset();
}

function retriveFormValue(event) {
	event.preventDefault();
	document.getElementById('spinner').style.display = 'block';
	const email = document.getElementById('email').value,
		name = document.getElementById('name').value,
		message = document.getElementById('message').value;

	const data = {
		Name: name,
		EmailAddress: email,
		Message: message,
	};
	console.log('data', data);
	sendRequest(data);
}

form.addEventListener('submit', retriveFormValue);
