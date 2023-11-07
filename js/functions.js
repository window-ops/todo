document.addEventListener("DOMContentLoaded", function() {
  // Load todos from local storage
  var todos = JSON.parse(localStorage.getItem("todos")) || [];

  // Render todos
  renderTodos();

  // Add todo
  document.getElementById("add-todo").addEventListener("click", function() {
    var todo = document.getElementById("todo-input").value;
    if (todo !== "") {
      todos.push({
        text: todo,
        done: false
      });
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
      document.getElementById("todo-input").value = "";
    }
  });

  // Render todos
  function renderTodos() {
    document.getElementById("todo-list").innerHTML = "";
    for (var i = 0; i < todos.length; i++) {
      var todo = todos[i];
      var todoClass = todo.done ? "list-group-item list-group-item-action list-group-item-success" : "list-group-item list-group-item-action";
      var todoText = todo.done ? "<del>" + todo.text + "</del>" : todo.text;
      var todoButton = todo.done ? "Not Done" : "Done";
      document.getElementById("todo-list").innerHTML += '<li class="' + todoClass + ' d-flex align-items-center"><span class="todo-text">' + todoText + '</span><div class="btn-group ms-auto"><button class="btn btn-success done-todo">' + todoButton + '</button><button class="btn btn-danger delete-todo">Delete</button></div></li>';
    }
  }

  // Done todo
  document.addEventListener("click", function(event) {
    if (event.target.classList.contains("done-todo")) {
      var li = event.target.closest("li");
      var index = Array.prototype.indexOf.call(li.parentNode.children, li);
      todos[index].done = !todos[index].done;
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    }
  });

  // Delete todo
  document.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-todo")) {
      var index = event.target.closest("li").index;
      todos.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    }
  });
});