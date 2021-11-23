import config from './config.js';
import './imgs/background.jpg';
import './imgs/spinner.gif';
import './style.css';

const form = document.querySelector('.mailForm');
const spinner = document.querySelector('.noneSpinner');
const messBox = document.querySelector('.none');

function showMessage(message) {
	messBox.classList.add('alertMessage');
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
		messBox.classList.remove('alertMessage');
		messBox.classList.add('none');
		spinner.classList.add('noneSpinner');
		spinner.classList.remove('spinner');
	};
}

function sendRequest(data) {
	fetch(config['address'], {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data) })
		.then(response => {
			if (!response.ok) {
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
			showMessage(`Done!`);
		})
		.catch(() => showMessage(`Network error. Please try again`));
}

function retriveFormValue() {
	spinner.classList.remove('noneSpinner');
	spinner.classList.add('spinner');
	const elements = form.elements;
	const data = {};
	for (const element of elements) {
		data[element.name] = element.value;
	}
	sendRequest(data);
}

document.querySelector('.submit').onclick = function() {
	retriveFormValue();
};

