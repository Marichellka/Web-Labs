const form = document.querySelector('.mailForm');

function showMessage(message) {
	const divMes = document.querySelector('.none');
	divMes.className = 'alertMessage';
	const mess = document.createTextNode(message);
	divMes.appendChild(mess);
	const span = document.createElement('SPAN');
	const txt = document.createTextNode('OK');
	span.className = 'submit';
	span.appendChild(txt);
	divMes.appendChild(span);

	span.onclick = function() {
		const div = this.parentElement;
		while (div.firstChild) {
			div.removeChild(div.lastChild);
		}
		div.className = 'none';
		document.querySelector('.spinner').className = 'noneSpinner';
	};
}

function sendRequest(data) {
	fetch('https://lab2apiemail.azurewebsites.net/email', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data) })
		.then(response => {
			if (response.status === 400) {
				response.json().then(data => {
					const { errors } = data;
					const errorsList = [];
					for (const key in errors) {
						for (const error of errors[key]) {
							errorsList.push(error);
						}
					}
					const errorsString = errorsList.join('\n');
					showMessage(`Error ${response.status}:
						${errorsString}`);
				});
			} else {
				showMessage(`Done!`);
			}
		})
		.catch(() => {
			showMessage(`Network error. Please try again`);
		});
}

function retriveFormValue(event) {
	event.preventDefault();
	document.querySelector('.noneSpinner').className = 'spinner';
	const elements = form.elements;
	const data = {};
	for (const element of elements) {
		console.log(element.name);
		console.log(element.value);
		data[element.name] = element.value;
	}
	delete data[''];
	sendRequest(data);
}

form.addEventListener('submit', retriveFormValue);
