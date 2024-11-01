import TaskManager from "./classes/TaskManager.js";
import ConfirmModal from "./classes/ConfirmModal.js";
import InputModal from "./classes/InputModal.js";

let manager = new TaskManager();
window.onLoadApp = function onLoadApp() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  manager.tasks = tasks;
  showTasks();
};

window.addNewTask = function addNewTask() {
  let description = document.getElementById("description").value;
  manager.addTask(description);
  document.getElementById("description").value = "";
  showTasks();
  saveTasks();
};

window.checkKeyPressedBeofreAddNewTask =
  function checkKeyPressedBeofreAddNewTask(event) {
    console.log(event.key);

    if (event.key == "Enter") {
      addNewTask();
    }
  };
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(manager.tasks));
}
function showTasks() {
  document.getElementById("activeTasks").innerHTML = "";
  document.getElementById("completedTasks").innerHTML = "";
  for (let task of manager.tasks) {
    if (task.completed) {
      document.getElementById("completedTasks").innerHTML += `
      <div class="mb-2">
        <li class='list-group-item d-inline-block w-50 text-break text-decoration-line-through'> ${task.description}</li>
        <button class='btn btn-success me-1' onclick='unDoTask(${task.id})'><i class="fa-solid fa-arrow-rotate-left"></i></button>
        <button class='btn btn-primary me-1' onclick='updateTask(${task.id},"${task.description}")'><i class="text-light fa-sharp fa-solid fa-pencil"></i></button>
        <button class='btn btn-danger me-1' onclick='deleteTask(${task.id})'><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    } else {
      document.getElementById("activeTasks").innerHTML += `
      <div class="mb-2">
        <li class='list-group-item d-inline-block  w-50 text-break'> ${task.description}</li>
        <button class='btn btn-success me-1' onclick='completeTask(${task.id})'><i class="fa-solid fa-check"></i></button>
        <button class='btn btn-primary me-1' onclick='updateTask(${task.id},"${task.description}")'><i class="text-light fa-sharp fa-solid fa-pencil"></i></button>
        <button class='btn btn-danger me-1' onclick='deleteTask(${task.id})'><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    }
  }
}

window.completeTask = function completeTask(id) {
  manager.completeTask(id);
  showTasks();
  saveTasks();
};

window.unDoTask = function unDoTask(id) {
  manager.unDoTask(id);
  showTasks();
  saveTasks();
};

window.updateTask = function updateTask(id, oldDesc) {
  const inputModal = new InputModal(
    {
      onSave: function (newDesc) {
        if (newDesc !== null && newDesc !== "") {
          manager.updateTaskDescription(id, newDesc);
          showTasks();
          saveTasks();
        } else alert("Invalid input");
      },
      onCancel: function () {},
    },
    oldDesc
  );

  inputModal.show();
};

window.deleteTask = function deleteTask(id) {
  const confirmModal = new ConfirmModal({
    message: "Do you really want to delete this tesk?",
    confirmText: "Yes, delete",
    cancelText: "No, keep it",
    onConfirm: function () {
      manager.deleteTask(id);
      showTasks();
      saveTasks();
    },
    onCancel: function () {
      console.log("Action cancelled.");
    },
  });

  //show the modal
  confirmModal.show();
};
