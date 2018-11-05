"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var todosArray = [{
  id: "000",
  text: "Find a job.",
  due: "Now",
  complete: false
}, {
  id: "111",
  text: "Breathe every other second.",
  due: "Tomorrow",
  complete: false
}, {
  id: "222",
  text: "Buy cat food.",
  due: "11/5/18 @ 2pm",
  complete: false
}];

var Todo =
/*#__PURE__*/
function () {
  function Todo(text, due) {
    _classCallCheck(this, Todo);

    this.id = Date.now();
    this.text = text;
    this.due = due;
    this.complete = false;
  }

  _createClass(Todo, [{
    key: "save",
    value: function save() {
      todosArray.push(this);
    } // get the last added todo for undo purposes

  }], [{
    key: "getLastTodo",
    value: function getLastTodo() {
      if (todosArray.length < 1) {
        // no todos
        return false;
      } else {
        return todosArray[todosArray.length - 1];
      }
    }
  }, {
    key: "removeTodo",
    value: function removeTodo(id) {
      // find index of todo to remove
      var todoToRemoveIndex = todosArray.findIndex(function (todo) {
        return todo.id === id;
      });

      if (!todoToRemoveIndex) {
        // id not found in array of todos
        return false;
      } else {
        return todosArray.splice(todoToRemoveIndex, 1); // remove it
      }
    }
  }, {
    key: "getAllTodos",
    value: function getAllTodos() {
      return todosArray;
    }
  }]);

  return Todo;
}();