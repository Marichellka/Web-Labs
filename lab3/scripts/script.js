import { startExecuteTask, subscribeToChanges } from './graphQL.js';
import './../imgs/loader.gif';
import './../style.css';

const form = document.querySelector('.toDoForm');
const formElements = form.elements;
form.addEventListener('submit', newElement);

export function displayList(list) {
	const ul = document.querySelector('.list');
	while (ul.firstChild) {
		ul.removeChild(ul.lastChild);
	}
	for (const task in list) {
		const li = document.createElement('li');
		const name = document.createTextNode(`${list[task].taskName}`);
		const date = document.createTextNode(` (${list[task].Date})`);
		li.appendChild(name);
		li.appendChild(date);
		if (list[task].Checked === true) {
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
	}
}

function newElement(event) {
	event.preventDefault();
	const li = document.createElement('li');
	const inputValue = formElements['taskName'].value;
	const t = document.createTextNode(inputValue);
	const ul = document.querySelector('.list');
	li.appendChild(t);
	if (inputValue === '') {
		alert('You must write something!');
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
}

function deleteTask(obj) {
	const div = obj.parentElement;
	const taskName = div.childNodes.item(0).nodeValue;
	startExecuteTask('deleteTask', { taskName });
	div.className = 'none';
}

document.querySelector('.noneSpinner').className = 'spinner';
startExecuteTask('getList', {}).then(data => {
	displayList(data.ToDoList);
	document.querySelector('.spinner').className = 'noneSpinner';
});
subscribeToChanges();

const list = document.querySelector('ul');
list.addEventListener('click', ev => {
	if (ev.target.tagName === 'LI') {
		const taskName = ev.target.childNodes.item(0).nodeValue;
		let isCheked = true;
		if (ev.target.className === 'checked') {
			isCheked = false;
		}
		startExecuteTask('setTaskChecked', { taskName, 'checked': isCheked });
		ev.target.classList.toggle('checked');
	}
}, false);
