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
	span.classList.add('submit');
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
	list.sort((a, b) => a.id - b.id);
	list.forEach(task => {
		const li = document.createElement('li');
		const name = document.createTextNode(`${task.taskName}`);
		const date = document.createTextNode(` (${task.Date})`);
		li.setAttribute('id', task.id);
		li.appendChild(name);
		li.appendChild(date);
		if (task.Checked === true) {
			li.className = 'checked';
		}
		const span = document.createElement('SPAN');
		const txt = document.createTextNode('\u00D7');
		span.classList.add('close');
		span.appendChild(txt);
		li.appendChild(span);
		ul.appendChild(li);

		span.onclick = function() {
			deleteTask(this);
		};
	});
	spinner.classList.add('none');
}

function newElement(event) {
	event.preventDefault();
	const inputValue = formElements['taskName'].value;
	if (inputValue === '') {
		showMessage('You must write something!');
		return;
	}
	formElements['taskName'].value = '';
	startExecuteTask('addTask', { 'task': {
		'taskName': inputValue,
	} });
}

function deleteTask(obj) {
	const divTask = obj.parentElement;
	const id = divTask.id;
	startExecuteTask('deleteTask', { id });
}

startExecuteTask('getList', {}).then(data => {
	displayList(data.ToDoList);
	subscribeToChanges();
});

ul.addEventListener('click', ev => {
	if (ev.target.tagName === 'LI') {
		let isCheked = true;
		if (ev.target.className === 'checked') {
			isCheked = false;
		}
		const id = ev.target.id;
		startExecuteTask('setTaskChecked', { id, 'checked': isCheked });
	}
}, false);

