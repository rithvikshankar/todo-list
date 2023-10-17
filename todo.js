const addTask = () => {
  let taskInput = document.getElementById('taskInput');
  let taskList = document.getElementById('taskList');

  let newTask = document.createElement('li');
  let taskText = document.createTextNode(taskInput.value);

  newTask.appendChild(taskText);
  taskList.appendChild(newTask);
  taskInput.value = ''
}