document.addEventListener('DOMContentLoaded', () => {

    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            
            if (task.completed) {
                li.classList.add('completed');
            }

            const taskText = document.createElement('span');
            taskText.textContent = task.text;
            
            taskText.addEventListener('click', () => {
                toggleTaskComplete(index);
            });

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', () => {
                deleteTask(index);
            });

            li.appendChild(taskText);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function addTask(e) {
        e.preventDefault();
        const taskText = taskInput.value.trim(); 

        if (taskText !== '') {
            const newTask = {
                text: taskText,
                completed: false
            };

            tasks.push(newTask);
            saveTasks();
            renderTasks();
            taskInput.value = '';
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function toggleTaskComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    }

    taskForm.addEventListener('submit', addTask);

    renderTasks();
});