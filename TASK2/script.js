const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
  if (taskInput.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  const currentDate = new Date();
  const time = currentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const date = currentDate.toLocaleDateString();

  const task = {
    text: taskInput.value,
    dateTime: `${date} | ${time}`,
  };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTask(task);
  taskInput.value = "";
}

function displayTask(task) {
  const li = document.createElement("li");

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("task-info");

  const taskText = document.createElement("span");
  taskText.classList.add("task-text");
  taskText.textContent = task.text;

  const taskTime = document.createElement("span");
  taskTime.classList.add("task-time");
  taskTime.textContent = task.dateTime;

  infoDiv.appendChild(taskText);
  infoDiv.appendChild(taskTime);

  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete";
  delBtn.onclick = function () {
    li.remove();
    deleteTask(task);
  };

  li.appendChild(infoDiv);
  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => displayTask(task));
}

function deleteTask(taskToDelete) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task.text !== taskToDelete.text || task.dateTime !== taskToDelete.dateTime);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
