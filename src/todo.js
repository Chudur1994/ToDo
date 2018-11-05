const todosArray = [
  {
    id: "000",
    text: "Find a job.",
    due: "Now",
    complete: false
  },
  {
    id: "111",
    text: "Breathe every other second.",
    due: "Tomorrow",
    complete: false
  },
  {
    id: "222",
    text: "Buy cat food.",
    due: "11/5/18 @ 2pm",
    complete: false
  }
];

class Todo {
  constructor(text, due) {
    this.id = Date.now();
    this.text = text;
    this.due = due;
    this.complete = false;
  }

  save() {
    todosArray.push(this);
  }

  // get the last added todo for undo purposes
  static getLastTodo() {
    if (todosArray.length < 1) {
      // no todos
      return false;
    } else {
      return todosArray[todosArray.length - 1];
    }
  }

  static removeTodo(id) {
    // find index of todo to remove
    const todoToRemoveIndex = todosArray.findIndex(todo => todo.id === id);
    if (!todoToRemoveIndex) {
      // id not found in array of todos
      return false;
    } else {
      return todosArray.splice(todoToRemoveIndex, 1); // remove it
    }
  }

  static getAllTodos() {
    return todosArray;
  }
}
