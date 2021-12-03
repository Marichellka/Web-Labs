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
	spinner.classList.remove('none');
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
		span.classList.add('close');
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
	const li = document.createElement('li');
	const inputValue = formElements['taskName'].value;
	const t = document.createTextNode(inputValue);
	li.appendChild(t);
	if (inputValue === '') {
		showMessage('You must write something!');
		return;
	}

	formElements['taskName'].value = '';
	const span = document.createElement('SPAN');
	const txt = document.createTextNode('\u00D7');
	span.classList.add('close');
	span.appendChild(txt);
	li.appendChild(span);

	span.onclick = span.onclick = function() {
		deleteTask(this);
	};
	startExecuteTask('addTask', { 'task': {
		'taskName': inputValue,
	} }).then(data => {
		if (data !== undefined) {
			ul.appendChild(li);
		}
	});
}

function deleteTask(obj) {
	const divTask = obj.parentElement;
	const taskName = divTask.childNodes.item(0).nodeValue;
	startExecuteTask('deleteTask', { taskName })
		.then(data => {
			if (data !== undefined) {
				ul.removeChild(divTask);
			}
		});
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
		const taskName = ev.target.childNodes.item(0).nodeValue;
		let isCheked = true;
		if (ev.target.className === 'checked') {
			isCheked = false;
		}
		startExecuteTask('setTaskChecked', { taskName, 'checked': isCheked })
			.then(data => {
				if (data !== undefined) {
					ev.target.classList.toggle('checked');
				}
			});
	}
}, false);

