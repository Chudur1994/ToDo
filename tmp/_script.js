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
var todos = document.querySelectorAll(".todo"); // init

init();

function init() {
  var allTodos = Todo.getAllTodos();
  allTodos.forEach(function (todoObj) {
    todoContainer.appendChild(makeTodoEl(todoObj));
  });
}

sortBtn.addEventListener("click", function (e) {
  e.preventDefault();
  sortOptions.classList.toggle("show");
}); // open add item input promp

openAddBtn.addEventListener("click", function (e) {
  e.preventDefault(); // give focus to input

  updateUI("openAdd");
  addInput.focus();
}); // add the todo to list and close input prompt

confirmAdd.addEventListener("click", function (e) {
  e.preventDefault();

  if (inputIsValid()) {
    addTodo();
    updateUI("add");
  } else {
    invalidInput("Input is empty.");
  }
}); // if user clicks outside of prompt close it

window.addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target !== addInput && e.target !== addSettings && e.target !== dueDateLabel && e.target !== dueDatePicker && e.target !== openAddBtn && e.target !== confirmAdd) {
    updateUI("add");
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
  handleEnterKey(e);
});
dueDatePicker.addEventListener("keydown", function (e) {
  handleEnterKey(e);
});

function handleEnterKey(e) {
  // if input has text and the enter key is pressed
  if (e.keyCode == "13") {
    // 13 is enter key
    if (inputIsValid()) {
      addTodo();
      updateUI("add");
    } else {
      invalidInput("Input is empty.");
    }
  }
}

function addTodo() {
  var todo = new Todo(addInput.value, dueDatePicker.value);
  todo.save(); // save new todo

  addInput.value = "";
  todoContainer.appendChild(makeTodoEl(todo));
  console.log(Todo.getAllTodos());
} // this function is pretty crappy


function updateUI(action) {
  switch (action) {
    case "add":
      addContainer.classList.remove("show");
      confirmAdd.classList.remove("show");
      todosOverlay.classList.remove("show");
      openAddBtn.classList.remove("hide");
      break;

    case "openAdd":
      addContainer.classList.add("show");
      confirmAdd.classList.add("show");
      openAddBtn.classList.add("hide");
      todosOverlay.classList.add("show");

    default:
      break;
  }
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
  if (addInput.value == "" || dueDatePicker.value == "") {
    return false;
  } else {
    return true;
  }
}

function makeTodoEl(todoObj) {
  var todo = document.createElement("div");
  todo.classList.add("todo");
  var text = document.createElement("p");
  text.classList.add("todo-text");
  text.textContent = todoObj.text;
  var dateTime = document.createElement("span");
  dateTime.classList.add("date-time");
  dateTime.textContent = todoObj.due;
  var due = document.createElement("p");
  due.classList.add("todo-due");
  due.textContent = "Due: ";
  due.appendChild(dateTime);
  var todoControls = document.createElement("div");
  todoControls.classList.add("controls");
  var editBtn = document.createElement("span");
  editBtn.classList.add("edit-todo");
  editBtn.textContent = "Edit";
  var deleteBtn = document.createElement("span");
  deleteBtn.classList.add("delete-todo");
  deleteBtn.textContent = "Delete";
  todoControls.appendChild(editBtn);
  todoControls.appendChild(deleteBtn);
  var overlay = document.createElement("span");
  overlay.classList.add("overlay");
  todo.appendChild(text);
  todo.appendChild(due);
  todo.appendChild(todoControls);
  todo.appendChild(overlay);
  todo.addEventListener("click", function (e) {
    e.preventDefault();
    todoClickHandler(this);
  });
  todo.addEventListener("mouseenter", function (e) {
    e.preventDefault();
    todoMouseEnterHandler(this, todoObj);
  });
  todo.addEventListener("mouseleave", function (e) {
    e.preventDefault();
    todoMouseLeaveHandler(this);
  });
  return todo;
}

function todoClickHandler(todoEl) {
  var todos = document.querySelectorAll(".todo");
  todos.forEach(function (item) {
    item.classList.remove("selected");
  });
  todoEl.classList.add("selected");
  todoEl.querySelector(".overlay").classList.add("show");
  todoEl.querySelector(".controls").classList.add("show");
}

function todoMouseEnterHandler(todoEl, todoObj) {
  if (todoEl.classList.contains("selected")) {
    todoEl.querySelector(".overlay").classList.add("show");
    todoEl.querySelector(".controls").classList.add("show");
  }
}

function todoMouseLeaveHandler(todoEl) {
  if (todoEl.classList.contains("selected")) {
    todoEl.querySelector(".overlay").classList.remove("show");
    todoEl.querySelector(".controls").classList.remove("show");
  }
}