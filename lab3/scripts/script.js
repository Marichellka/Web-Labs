import { startExecuteTask, subscribeToChanges } from './graphQL.js';
import './../imgs/loader.gif';
import './../style.css';

const form = document.querySelector('.toDoForm');
const formElements = form.elements;
form.addEventListener('submit', newElement);
const ul = document.querySelector('.list');
const spinner = document.querySelector('.spinner');
const messBox = document.querySelector('.message');

export function showMessage(message) {
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

export function displayList(list) {
	ul.replaceChildren();
	list.forEach(task => {
		const li = document.createElement('li');
		const name = document.createTextNode(`${task.taskName}`);
		const date = document.createTextNode(` (${task.Date})`);
		li.appendChild(name);
		li.appendChild(date);
		if (task.Checked === true) {
			li.className = 'checked';
		}
		const span = document.createElement('SPAN');
		const txt = document.createTextNode('\u00D7');
		span.className = 'close';
		span.appendChild(txt);
		li.appendChild(span);
		ul.appendChild(li);

		span.onclick = function() {
			deleteTask(this);
		};
	});
}

function newElement(event) {
	event.preventDefault();
	spinner.classList.remove('none');
	const li = document.createElement('li');
	const inputValue = formElements['taskName'].value;
	const t = document.createTextNode(inputValue);
	li.appendChild(t);
	if (inputValue === '') {
		showMessage('You must write something!');
		return;
	} else {
		ul.appendChild(li);
	}
	formElements['taskName'].value = '';

	const span = document.createElement('SPAN');
	const txt = document.createTextNode('\u00D7');
	span.className = 'close';
	span.appendChild(txt);
	li.appendChild(span);

	span.onclick = span.onclick = function() {
		deleteTask(this);
	};
	startExecuteTask('addTask', { 'task': {
		'taskName': inputValue,
	} });
	spinner.classList.add('none');
}

function deleteTask(obj) {
	spinner.classList.remove('none');
	const divTask = obj.parentElement;
	const taskName = divTask.childNodes.item(0).nodeValue;
	startExecuteTask('deleteTask', { taskName });
	ul.removeChild(divTask);
	spinner.classList.add('none');
}

spinner.classList.remove('none');
startExecuteTask('getList', {}).then(data => {
	displayList(data.ToDoList);
	spinner.classList.add('none');
	subscribeToChanges();
});

const list = document.querySelector('ul');
list.addEventListener('click', ev => {
	if (ev.target.tagName === 'LI') {
		spinner.classList.remove('none');
		const taskName = ev.target.childNodes.item(0).nodeValue;
		let isCheked = true;
		if (ev.target.className === 'checked') {
			isCheked = false;
		}
		startExecuteTask('setTaskChecked', { taskName, 'checked': isCheked });
		spinner.classList.add('none');
		ev.target.classList.toggle('checked');
	}
}, false);

