
const tasks = [];

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = 'flex justify-between items-center py-2 px-4';

        const taskText = document.createElement('span');
        taskText.textContent = task;
        taskText.className = 'text-lg';
        
        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.className = 'text-red-500 ml-2';
        deleteButton.setAttribute('data-index', index);
        deleteButton.addEventListener('click', deleteTask);

        taskItem.appendChild(taskText);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    });
}

function addTask(event) {
    event.preventDefault();
    const inputField = document.getElementById('todo-input');
    const task = inputField.value.trim();

    if (task !== '') {
        tasks.push(task);
        inputField.value = '';
        renderTasks();
    }
}

function deleteTask(event) {
    const index = event.target.getAttribute('data-index');
    tasks.splice(index, 1);
    renderTasks();
}

const todoForm = document.getElementById('todo-form');
todoForm.addEventListener('submit', addTask);
renderTasks();
