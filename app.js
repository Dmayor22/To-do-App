document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTaskList();
    updateStats();
  }
});

// Task Variable in an empty array
let tasks = [];

// save Task tp local storage
const saveTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
// Functions for Add button
const addtask = () => {
  const inputValue = document.querySelector("#Input_task");
  const inputText = inputValue.value.trim();

  if (inputText) {
    tasks.push({
      inputText: inputText,
      completed: false,
    });
    inputValue.value = "";
    updateTaskList();
    updateStats();
    saveTask();
  }
};

const addbtn = (e) => {
  e.preventDefault();
  addtask();
};
// end 0f add button function above

// function for toggleComplete
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats();
  saveTask();
};

// function for deleteTask
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTask();
};

// function for editTask
const editTask = (index) => {
  const taskInput = document.querySelector("#Input_task");
  taskInput.value = tasks[index].inputText;

  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTask();
};

const updateStats = () => {
  const completedTasks = tasks.filter((taskItem) => taskItem.completed).length;
  const totalTasks = tasks.length;
  const progress = (completedTasks / totalTasks) * 100;

  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}% `;

  //stats number for task
  document.getElementById(
    "numbers"
  ).innerText = `${completedTasks} / ${totalTasks}`;

  if (tasks.length && completedTasks == totalTasks) {
    setTimeout(() => {
      document.querySelector(".task_list").innerHTML = null;
      tasks.length = null;
      document.getElementById("numbers").innerText = `0 / 0`;
      progressBar.style.width = 0;
      const modal = (document.getElementById("modal_box").style.display =
        "block");

      if (modal) {
        setTimeout(() => {
          document.getElementById("modal_box").style.display = "none";
          document.querySelector(".container").style.filter = "blur(0)";
        }, 3000);
      }
      document.querySelector(".container").style.filter = "blur(3px)";
      saveTask();
    }, 10000);
  }
};

//function for updating task to the UI
const updateTaskList = () => {
  const ul = document.querySelector(".task_list");
  ul.innerHTML = "";

  //looping through the tasks array to get User task and update the UI
  tasks.forEach((item, index) => {
    const html = `<div class="taskItem"><div class="task ${
      item.completed ? "completed" : ""
    }"><input type="checkbox" class="checkbox" ${
      item.completed ? "checked" : ""
    } /><p>${
      item.inputText
    }</p></div><div class="icons"><img src="img/edit.png" onClick="editTask(${index})"><img src="img/bin.png" onClick="deleteTask(${index})"></div></div>`;
    const listItem = document.createElement("li");
    listItem.innerHTML = html;
    ul.append(listItem);

    listItem.addEventListener("change", () => toggleTaskComplete(index));
  });
};

// Get Add button and Add loist items
let AddBtn = document.querySelector("#Addbtn");
AddBtn.addEventListener("click", addbtn);

//JsConfetti