import baseURL from './config.js';
import './imgs/background.jpg';
import './imgs/spinner.gif';
import './style.css';

const form = document.querySelector('.mailForm');
const spinner = document.querySelector('.spinner');
const messBox = document.querySelector('.alertMessage');

function showMessage(message) {
	messBox.classList.remove('none');
	const mess = document.createTextNode(message);
	messBox.appendChild(mess);
	const span = document.createElement('SPAN');
	const txt = document.createTextNode('OK');
	span.className = 'submit';
	span.appendChild(txt);
	messBox.appendChild(span);

	span.onclick = function() {
		messBox.replaceChildren();
		messBox.classList.add('none');
		spinner.classList.add('none');
	};
}

function sendRequest(data) {
	fetch(baseURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data) })
		.then(response => {
			if (response.status === 400) {
				response.json().then(data => {
					const { errors } = data;
					const arrayErrors = Object.values(errors);
					const errorsString = arrayErrors
						.reduce((previousValue, currentValue) =>
							previousValue + currentValue.join('\n') + '\n', '');
					showMessage(`Error ${response.status}:
						${errorsString}`);
				});
				return;
			}
			if (response.status === 429) {
				showMessage(`Error ${response.status}: 
					${response.statusText}`);
				return;
			}
			if (!response.ok) {
				showMessage(`Error ${response.status}`);
				return;
			}
			showMessage(`Done!`);
		})
		.catch(() => showMessage(`Network error. Please try again`));
}

function retriveFormValue() {
	spinner.classList.remove('none');
	const elements = form.elements;
	const data = Object.fromEntries(Array
		.from(elements, x => [x.name, x.value]));
	sendRequest(data);
}

document.querySelector('.submit').onclick = function() {
	retriveFormValue();
};

