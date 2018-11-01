const openAddBtn = document.querySelector(".controls-add");
const addContainer = document.querySelector(".add");
const confirmAdd = document.querySelector(".controls-confirm");
const addInput = document.querySelector("#add-input");
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
    e.target !== openAddBtn &&
    e.target !== confirmAdd
  ) {
    addContainer.classList.remove("show");
    confirmAdd.classList.remove("show");
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

  const number = document.createElement("p");
  number.classList.add("todo-number");
  number.textContent = `${todos.length + 1}.`;

  const text = document.createElement("p");
  text.classList.add("todo-text");
  text.textContent = lastAddedTodo.text;

  const timeStamp = document.createElement("p");
  timeStamp.classList.add("todo-timeStamp");
  timeStamp.textContent = lastAddedTodo.timeStamp;

  todo.appendChild(number);
  todo.appendChild(text);
  todo.appendChild(timeStamp);

  return todo;
}

{
  /* <p class="todo-number">1.</p>
<p class="todo-text">Lorem Lorem ipsum dolor sit amet. ipsum dolor, sit amet consectetur
    adipisicing elit. Fugit, sit.</p>
<p class="todo-timeStamp">Just now</p> */
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
