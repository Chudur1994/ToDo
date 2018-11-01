"use strict";

var openAddBtn = document.querySelector(".add-btn");
var addContainer = document.querySelector(".add");
var confirmAdd = document.querySelector(".confirm-btn");
var sortBtn = document.querySelector(".sort-btn");
var sortOptions = document.querySelector(".sort-options");
var sortDate = document.querySelector(".sort-date");
var sortDuration = document.querySelector(".sort-duration");
var addInput = document.querySelector("#add-input");
var addSettings = document.querySelector(".add-settings");
var dueDateLabel = document.querySelector(".add-settings label");
var dueDatePicker = document.querySelector(".add-settings input#due-date");
var todosOverlay = document.querySelector(".todos .overlay");
var messageModal = document.querySelector("#messageModal");
var todoContainer = document.querySelector(".todos");
var todos = document.querySelectorAll(".todo");
var lastAddedTodo = {
  timeStamp: "",
  text: ""
};
sortBtn.addEventListener("click", function (e) {
  e.preventDefault();
  sortOptions.classList.toggle("show");
}); // open add item input promp

openAddBtn.addEventListener("click", function (e) {
  e.preventDefault();
  addContainer.classList.add("show");
  confirmAdd.classList.add("show");
  this.classList.add("hide");
  todosOverlay.classList.add("show"); // give focus to input

  addInput.focus();
}); // add the todo to list and close input prompt

confirmAdd.addEventListener("click", function (e) {
  e.preventDefault();

  if (inputIsValid()) {
    addTodo();
  } else {
    invalidInput("Input is empty.");
  }
}); // if user clicks outside of prompt close it

window.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target !== addInput && e.target !== addSettings && e.target !== dueDateLabel && e.target !== dueDatePicker && e.target !== openAddBtn && e.target !== confirmAdd) {
    addContainer.classList.remove("show");
    confirmAdd.classList.remove("show");
    todosOverlay.classList.remove("show");
    openAddBtn.classList.remove("hide");
  }

  if (e.target !== sortBtn && e.target !== sortDate && e.target !== sortDuration) {
    sortOptions.classList.remove("show");
  }
});
sortDate.addEventListener("click", function (e) {
  // do action
  sortOptions.classList.remove("show");
  this.classList.add("active");
  sortDuration.classList.remove("active");
});
sortDuration.addEventListener("click", function (e) {
  sortOptions.classList.remove("show");
  this.classList.add("active");
  sortDate.classList.remove("active");
});
addInput.addEventListener("keydown", function (e) {
  // if input has text and the enter key is pressed
  if (e.keyCode == "13") {
    if (!inputIsValid()) {
      invalidInput("Input is empty.");
    } else {
      addTodo();
    }
  }
});

function addTodo() {
  lastAddedTodo.text = addInput.value;
  addInput.value = "";
  lastAddedTodo.timeStamp = new Date().toLocaleString();
  addContainer.classList.remove("show");
  confirmAdd.classList.remove("show");
  todosOverlay.classList.remove("show");
  openAddBtn.classList.remove("hide");
  todoContainer.appendChild(makeTodoEl());
}

function invalidInput(message) {
  messageModal.textContent = message;
  messageModal.classList.add("show");
  setTimeout(function () {
    messageModal.classList.remove("show");
  }, 1500);
}

function inputIsValid() {
  // add more checks later
  if (addInput.value == "") {
    return false;
  } else {
    return true;
  }
}

function makeTodoEl() {
  var todo = document.createElement("div");
  todo.classList.add("todo");
  var text = document.createElement("p");
  text.classList.add("todo-text");
  text.textContent = lastAddedTodo.text;
  var timeStamp = document.createElement("p");
  timeStamp.classList.add("todo-due");
  timeStamp.textContent = lastAddedTodo.timeStamp;
  todo.appendChild(text);
  todo.appendChild(timeStamp);
  return todo;
}