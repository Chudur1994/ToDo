const openAddBtn = document.querySelector(".add-btn");
const addContainer = document.querySelector(".add");
const confirmAdd = document.querySelector(".confirm-btn");
const addInput = document.querySelector("#add-input");
const addSettings = document.querySelector(".add-settings");
const dueDateLabel = document.querySelector(".add-settings label");
const dueDatePicker = document.querySelector(".add-settings input#due-date");
const todosOverlay = document.querySelector(".todos .overlay");
const messageModal = document.querySelector("#messageModal");
const todoContainer = document.querySelector(".todos");
const todos = document.querySelectorAll(".todo");

let lastAddedTodo = {
  timeStamp: "",
  text: ""
};

// open add item input promp
openAddBtn.addEventListener("click", function(e) {
  e.preventDefault();
  addContainer.classList.add("show");
  confirmAdd.classList.add("show");
  this.classList.add("hide");
  todosOverlay.classList.add("show");
  // give focus to input
  addInput.focus();
});

// add the todo to list and close input prompt
confirmAdd.addEventListener("click", function(e) {
  e.preventDefault();
  if (inputIsValid()) {
    addTodo();
  } else {
    invalidInput("Input is empty.");
  }
});

// if user clicks outside of prompt close it
window.addEventListener("click", function(e) {
  e.preventDefault();
  if (
    e.target !== addInput &&
    e.target !== addSettings &&
    e.target !== dueDateLabel &&
    e.target !== dueDatePicker &&
    e.target !== openAddBtn &&
    e.target !== confirmAdd
  ) {
    addContainer.classList.remove("show");
    confirmAdd.classList.remove("show");
    todosOverlay.classList.remove("show");
    openAddBtn.classList.remove("hide");
  }
});

addInput.addEventListener("keydown", function(e) {
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
  setTimeout(() => {
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
  const todo = document.createElement("div");
  todo.classList.add("todo");

  const text = document.createElement("p");
  text.classList.add("todo-text");
  text.textContent = lastAddedTodo.text;

  const timeStamp = document.createElement("p");
  timeStamp.classList.add("todo-due");
  timeStamp.textContent = lastAddedTodo.timeStamp;

  todo.appendChild(text);
  todo.appendChild(timeStamp);

  return todo;
}

//////////////////////////////////////////////////////////////////////////

const whatWorksBtn = document.querySelector(".what-works");

whatWorksBtn.addEventListener("click", function(e) {
  this.classList.add("hide");
  document.querySelector("#things-that-work").classList.add("show");
});

document.querySelector(".close").addEventListener("click", function(e) {
  whatWorksBtn.classList.remove("hide");
  document.querySelector("#things-that-work").classList.remove("show");
});
