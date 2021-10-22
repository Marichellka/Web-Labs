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
		body: JSON.stringify(data) })
		.then(response => {
			if (response.status === 400) {
				response.json()
					.then(data => {
						const errorsList = [];
						for (const key in data) {
							for (const error of data[key]) {
								errorsList.push(error);
							}
						}
						const errorsString = errorsList.join('\n');
						alert(`Error ${response.status}:\n${errorsString}`);
					});
			} else if (!response.ok) {
				alert(`Error ${response.status}: ${response.statusText}`);
			} else {
				alert(`Done!`);
			}
			document.getElementById('spinner').style.display = 'none';
		})
		.catch(() => {
			alert(`Network error. Please try again`);
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
