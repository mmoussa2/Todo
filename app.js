//Selectors:
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('change',filterTodo)

//FUNCTIONS
function addTodo(e){
  e.preventDefault();

  //Todo DIV
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  //Create Li
  const newTodo = document.createElement('li');
  newTodo.innerText = todoInput.value;
  newTodo.classList.add('todo-item');
  todoDiv.appendChild(newTodo);
  //add todo to localStorage
  saveLocalTodos(todoInput.value);

  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class="fas fa-check"></i>'
  completeButton.classList.add("complete-btn");
  todoDiv.appendChild(completeButton);

  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);
  //Append to list
  todoList.appendChild(todoDiv);
  //Clear Todo Input value
  todoInput.value = "";
}

function deleteCheck(e){
  const item = e.target;
  const todo = item.parentElement;
  if(item.classList[0] === 'trash-btn'){
    //Animation
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function(){
      todo.remove();
    })
  }
  if(item.classList[0] === 'complete-btn'){
    todo.classList.toggle('completed');
  }
}

function filterTodo(e){
  //const list = todoList.childNodes;
  const list = [].slice.call(todoList.children);

  list.forEach(function(todo) {

    switch(e.target.value){
      case "all":
      todo.style.display = "flex";
      break;
      case "completed":
        if(todo.classList.contains('completed')){
          todo.style.display ='flex';
         } else {
           todo.style.display = "none";
         }
         break;
      case "uncompleted":
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = "none";
        }
        break;
    }

      // if (e.target.value === "all") todo.style.display = "flex";
    // else if (e.target.value === "completed") {
    //   if (todo.classList.contains('completed')) {
    //     todo.style.display = 'flex';
    //   } else todo.style.display = "none";
    // } else if (e.target.value === "uncompleted") {
    //   if (!todo.classList.contains('completed')) {
    //     todo.style.display = 'flex';
    //   } else todo.style.display = "none";
    // }

  });
}

function saveLocalTodos(todo){
  const todos = checkLocalStorage();
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
  const todos = checkLocalStorage();
  todos.forEach(function(todo){
    //Todo DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
  //Create Li
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
 
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);

    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //Append to list
    todoList.appendChild(todoDiv);
 
  });
}

function removeLocalTodos(todo){
  const todos = checkLocalStorage();

  const todoText = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoText),1);
  localStorage.setItem('todos', JSON.stringify(todos));

}

function checkLocalStorage(){
  // check if already have data
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    //get data as array
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  return todos;
}