const input = document.getElementById('todo-input');
const addTodoBtn = document.getElementById('add-todo-btn');
const todoList = document.getElementById('todo-list');


document.addEventListener('DOMContentLoaded', loadTodos);



addTodoBtn.addEventListener('click', () => {
  const todoText = input.value.trim();

  if (todoText !== '') {
    const newTodo = { text: todoText, completed: false };
    createTodoItem(newTodo);
    saveTodoToLocal(newTodo);
    input.value = ''; 
  }
});


function createTodoItem(todo) {
  const li = document.createElement('li');

  li.innerHTML = `
    <span>${todo.text}</span>
    <div>
      <button class="complete-btn">✔️</button>
      <button class="delete-btn">✖️</button>
    </div>
  `;

  
  if (todo.completed) {
    li.classList.add('completed');
  }


  li.querySelector('.complete-btn').addEventListener('click', () => {
    li.classList.toggle('completed');
    updateTodoStatusInLocal(todo.text);
  });

  // Кнопка "Удалить"
  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.style.opacity = '0'; 
    setTimeout(() => {
      li.remove();
      removeTodoFromLocal(todo.text);
    }, 300); 
  });

  todoList.appendChild(li);
}


function saveTodoToLocal(todo) {
  const todos = getTodosFromLocal();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}


function getTodosFromLocal() {
  const todos = localStorage.getItem('todos');
  return todos ? JSON.parse(todos) : [];
}



function loadTodos() {
  const todos = getTodosFromLocal();
  todos.forEach(createTodoItem);
}


function updateTodoStatusInLocal(todoText) {
  const todos = getTodosFromLocal();
  const updatedTodos = todos.map((todo) => {
    if (todo.text === todoText) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
}

function removeTodoFromLocal(todoText) {
  const todos = getTodosFromLocal();
  const updatedTodos = todos.filter((todo) => todo.text !== todoText);
  localStorage.setItem('todos', JSON.stringify(updatedTodos));
}
[
    { "text": "Learn JavaScript", "completed": true },
    { "text": "Build a Todo App", "completed": false }
  ]