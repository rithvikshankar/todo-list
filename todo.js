const addTask = () => {
  let taskInput = document.getElementById('task-input');
  let taskList = document.getElementById('task-list');
  let addButton = document.querySelector('.add-button')

  let newTask = document.createElement('li');
  let taskText = document.createTextNode(taskInput.value);

  newTask.appendChild(taskText);
  taskList.appendChild(newTask);
  taskInput.value = ''
  addButton.disabled = true;
}

// To prevent users from making blank entries
const toggleButton = () => {
  let taskInput = document.getElementById('task-input');
  let addButton = document.querySelector('.add-button');

  if (taskInput.value.trim() !== '') {
    addButton.disabled = false;
  } else {
    addButton.disabled = true;
  }

}

// Adds the item to the list if the user clicks enter key
document.getElementById('task-input').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addTask();
  }
});