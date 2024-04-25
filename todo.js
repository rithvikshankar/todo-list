const getTasks = () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  return tasks;
};

const saveTasks = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const getCompletedTasks = () => {
  const completedTasks =
    JSON.parse(localStorage.getItem("completedTasks")) || [];
  return completedTasks;
};

const saveCompletedTasks = (completedTasks) => {
  localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
};

const addTask = () => {
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");
  const addButton = document.querySelector(".add-button");

  const taskTemplate = document.getElementById("task-li-template");

  let tasks = getTasks();

  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    tasks.push(taskInput.value); // Add the new task to the tasks array
    saveTasks(tasks); // Save the updated tasks array to localStorage

    // let newTask = document.createElement('li');
    // let taskText = document.createTextNode(taskInput.value);
    // let closeButton = document.createElement('span');
    // closeButton.innerHTML = "X"
    // closeButton.classList.add('close-button');

    // newTask.appendChild(taskText);
    // newTask.appendChild(closeButton)
    // taskList.appendChild(newTask);

    const taskNode = taskTemplate.content.cloneNode(true);
    // const newTask = taskNode.querySelector(".task-li");
    taskNode.querySelector(".task-li").setAttribute("data-task", taskText);
    taskNode.querySelector(".task-text").textContent = taskText;
    // taskNode
    //   .querySelector(".radio-btn")
    //   .addEventListener("click", () => markTasksCompleted(taskText));
    taskList.appendChild(taskNode);

    taskInput.value = "";
    addButton.disabled = true;
  }

  // Gives task-input-box an icon and text-indent again after submitting task
  document.getElementById("add-icon").style.display = "block";
  document.getElementById("task-input").style.textIndent =
    "var(--input-text-indent)";
};

// Remove task from task list and add it to completed list
// const markTasksCompleted = (taskText) => {
//   const tasks = getTasks();
//   const completedTasks = getCompletedTasks();
//   const updatedTasks = tasks.filter((task) => task !== taskText);
//   completedTasks.push(taskText);

//   saveTasks(updatedTasks);
//   saveCompletedTasks(completedTasks);

//   const completedTasksList = document.getElementById("completed-tasks-list");
//   const completedTaskTemplate = document.getElementById(
//     "completed-tasks-li-template"
//   );

//   completedTasksList.innerHTML = "";

//   completedTasks.forEach((completedTask) => {
//     const completedTaskNode = completedTaskTemplate.content.cloneNode(true);
//     completedTaskNode.querySelector(".completed-task-text").textContent =
//       completedTask;
//     completedTasksList.appendChild(completedTaskNode);
//   });

//   // const completedTaskNode = completedTaskTemplate.content.cloneNode(true);
//   // completedTaskNode.querySelector(".completed-task-text").textContent =
//   //   taskText;
//   // completedTasksList.appendChild(completedTaskNode);

//   // Clear the task list and rebuild it with the updated tasks
//   const taskList = document.getElementById("task-list");
//   taskList.innerHTML = "";

//   updatedTasks.forEach((task) => {
//     const taskTemplate = document.getElementById("task-li-template");
//     const newTask = taskTemplate.content.cloneNode(true);
//     newTask.querySelector(".task-li").setAttribute("data-task", task);
//     newTask.querySelector(".task-text").textContent = task;
//     taskList.appendChild(newTask);
//   });

//   // const taskList = document.getElementById("task-list");
//   // const nodeToRemove = taskList.querySelector(`li[data-task="${taskText}"]`);
//   // taskList.removeChild(nodeToRemove);
// };

const markTasksCompleted = (taskText) => {
  const tasks = getTasks();
  const completedTasks = getCompletedTasks();
  console.log(typeof completedTasks, completedTasks);
  const updatedTasks = tasks.filter((task) => task !== taskText);
  completedTasks.push(taskText);

  saveTasks(updatedTasks);
  saveCompletedTasks(completedTasks);

  // Remove the completed task from the task list in the DOM
  const taskList = document.getElementById("task-list");
  const taskToRemove = taskList.querySelector(`li[data-task="${taskText}"]`);
  taskList.removeChild(taskToRemove);

  // Add the completed task to the completed tasks list in the DOM
  const completedTasksList = document.getElementById("completed-tasks-list");
  const completedTaskTemplate = document.getElementById(
    "completed-tasks-li-template"
  );
  const completedTaskNode = completedTaskTemplate.content.cloneNode(true);
  completedTaskNode.querySelector(".completed-task-text").textContent =
    taskText;
  completedTasksList.appendChild(completedTaskNode);
};

// To prevent users from making blank entries
const toggleButton = () => {
  let taskInput = document.getElementById("task-input");
  let addButton = document.querySelector(".add-button");

  if (taskInput.value.trim() !== "") {
    addButton.disabled = false;
  } else {
    addButton.disabled = true;
  }
};

// Adds the item to the list on enter key
document
  .getElementById("task-input")
  .addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });

// Removes add-icon and removes text-indent when the user starts typing
document.getElementById("task-input").addEventListener("click", () => {
  document.getElementById("add-icon").style.display = "none";
  document.getElementById("task-input").style.textIndent = 0;
});

const handleTaskCompletion = (event) => {
  const target = event.target;
  if (target.classList.contains("radio-btn")) {
    console.log("Radio button clicked!");
    const taskText = target.parentNode.querySelector(".task-text").textContent;
    markTasksCompleted(taskText);
  }
};

document
  .getElementById("task-list")
  .addEventListener("click", handleTaskCompletion);

// Handle task completion using event delegation
// document.getElementById("task-list").addEventListener("click", (event) => {
//   const target = event.target;
//   if (target.classList.contains("radio-btn")) {
//     const taskText = target.parentNode.querySelector(".task-text").textContent;
//     markTasksCompleted(taskText);
//   }
// });

// Function to display tasks from localStorage on page load
const displayTasks = () => {
  let taskList = document.getElementById("task-list");
  let completedTaskList = document.getElementById("completed-tasks-list");
  let tasks = getTasks(); // Get tasks from localStorage
  let completedTasks = getCompletedTasks(); // Get completed tasks from localStorage

  tasks.forEach((task) => {
    let taskTemplate = document.getElementById("task-li-template");
    let newTask = taskTemplate.content.cloneNode(true);
    const taskText = task.trim();

    newTask.querySelector(".task-li").setAttribute("data-task", taskText);
    newTask.querySelector(".task-text").textContent = taskText;
    taskList.appendChild(newTask);
  });

  completedTasks.forEach((completedTask) => {
    console.log("completedTask is", completedTask);
    let completedTaskTemplate = document.getElementById(
      "completed-tasks-li-template"
    );
    let newCompletedTask = completedTaskTemplate.content.cloneNode(true);
    const completedTaskText = completedTask.trim();

    newCompletedTask
      .querySelector(".completed-task-li")
      .setAttribute("data-completed-task", completedTaskText);
    console.log(completedTaskText);
    newCompletedTask.querySelector(".completed-task-text").textContent =
      completedTaskText;
    completedTaskList.appendChild(newCompletedTask);
  });
};

// Call displayTasks on page load
displayTasks();
