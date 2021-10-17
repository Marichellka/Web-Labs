const form = document.getElementById('mailForm');

function sendRequest(data) {
	fetch('https://lab2apiemail.azurewebsites.net/email', {
		method: 'POST',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		redirect: 'follow',
		referrerPolicy: 'no-referrer',
		body: JSON.stringify(data),
	}).then(response => response.json())
		.then(result => {
			if (result.status === 400) {
				const { errors } = result;
				const errorsList = [];

				for (const key in errors) {
					for (const error of errors[key]) {
						errorsList.push(error);
					}
				}

				const errorsString = errorsList.join('\n');
				alert(`Error ${result.status}:\n${errorsString}`);
				document.getElementById('spinner').style.display = 'none';
			} else if (result.status < 200 || result.status > 400) {
				alert(`Error ${result.status}`);
				document.getElementById('spinner').style.display = 'none';
			} else if (result.status >= 200 || result.status < 300) {
				alert(`Done!`);
				document.getElementById('spinner').style.display = 'none';
			}
		}).catch(error => {
			alert(`Error ${error}`);
			document.getElementById('spinner').style.display = 'none';
		});
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
	document.getElementById('mailForm').reset();
	sendRequest(data);
}

form.addEventListener('submit', retriveFormValue);
