// To-Do list but we say tasks instead of to-dos

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const taskInput = document.querySelector('.add-task input');
    const submitButton = document.querySelector('#submitButton');
    const incompleteTasksContainer = document.querySelector('.incomplete-tasks');
    const completedTasksContainer = document.querySelector('.completed-tasks');

    // Load tasks from localStorage
    loadTasks();

    // Add new task 
    submitButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
            saveTasks();
        }
    });

    // Add event listener for "Enter" key
    taskInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent the default form submission
            submitButton.click();
        }
    });

    // Handle task actions
    incompleteTasksContainer.addEventListener('click', function(event) {
        if (event.target.id === 'delete-task') {
            deleteTask(event.target);
        } else if (event.target.id === 'task-completed') {
            completeTask(event.target);
        }
    });

    completedTasksContainer.addEventListener('click', function(event) {
        if (event.target.id === 'delete-task') {
            deleteTask(event.target);
        }
    });


    // if task is completed it goes to completedTasksContainer
    function addTask(taskText, isCompleted = false) {
        let taskContainer;
        if (isCompleted) {
            taskContainer = completedTasksContainer;
        } else {
            taskContainer = incompleteTasksContainer;
        }
    
        const taskDiv = document.createElement('div');
        if (isCompleted) {
            taskDiv.className = 'task-checked';
        } else {
            taskDiv.className = 'task';
        }
        // We inject this new task into the HTML
        taskDiv.innerHTML = `
            <p>${taskText}</p>
            <i class="fa-solid fa-clipboard-check" id="task-completed"></i>
            <i class="fa-solid fa-trash-can" id="delete-task"></i>
        `;
        taskContainer.appendChild(taskDiv);
    }
    

    function deleteTask(taskIcon) {
        const taskDiv = taskIcon.parentElement;
        taskDiv.remove();
        saveTasks();
    }
    // a completed task is sent to the completedTaskContainer Div
    function completeTask(taskIcon) {
        const taskDiv = taskIcon.parentElement;
        taskDiv.remove();
        taskDiv.className = 'task-checked';
        completedTasksContainer.appendChild(taskDiv);
        saveTasks();
    }


    function saveTasks() {
        const incompleteTasks = [];
        const completedTasks = [];

        incompleteTasksContainer.querySelectorAll('.task').forEach(task => {
            incompleteTasks.push(task.querySelector('p').textContent);
        });

        completedTasksContainer.querySelectorAll('.task-checked').forEach(task => {
            completedTasks.push(task.querySelector('p').textContent);
        });

        // Saves the different types of tasks to localStorage
        localStorage.setItem('incompleteTasks', JSON.stringify(incompleteTasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));

        // Console.log the contents of local storage
        console.log('Incomplete Tasks:', JSON.parse(localStorage.getItem('incompleteTasks')));
        console.log('Completed Tasks:', JSON.parse(localStorage.getItem('completedTasks')));
    };





    function loadTasks() {
        const incompleteTasks = JSON.parse(localStorage.getItem('incompleteTasks')) || [];
        const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

        incompleteTasks.forEach(taskText => addTask(taskText));
        completedTasks.forEach(taskText => addTask(taskText, true));
    }

    // Function to log local storage contents to the console
    function logLocalStorage() {
        console.log('Incomplete Tasks:', JSON.parse(localStorage.getItem('incompleteTasks')));
        console.log('Completed Tasks:', JSON.parse(localStorage.getItem('completedTasks')));
    }

    // Call this function to log the contents of local storage whenever needed
    logLocalStorage();
});


