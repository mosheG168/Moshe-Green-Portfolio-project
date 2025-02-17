let todoInput = document.querySelector('.to-do-list-input input');
let todoButton = document.querySelector('.to-do-btn');
let todoList = document.querySelector('.to-do-list');
let shoppingInput = document.querySelector('.shopping-input input');
let shoppingButton = document.querySelector('.shopping-btn');
let shoppingList = document.querySelector('.shopping-list');

let todoHeader = document.querySelector('.to-do-list h2');
let shoppingHeader = document.querySelector('.shopping-list h2');

todoHeader.addEventListener('click', () => toggleListVisibility(todoList));
shoppingHeader.addEventListener('click', () => toggleListVisibility(shoppingList));

todoButton.addEventListener('click', (event) => {
    event.preventDefault();
    addTodo();
});

shoppingButton.addEventListener('click', (event) => {
    event.preventDefault();
    addShopping();
});

function toggleListVisibility(list) {
    const listItems = list.querySelector('.to-do-list-items, .shopping-list-items');
    listItems.classList.toggle('active');
}

function createButton(text, className, clickHandler) {
    const button = document.createElement('button');
    button.innerHTML = text;
    button.classList.add(className);
    button.addEventListener('click', clickHandler);
    return button;
}

function updateCompletedStatus() {
    let todos = Array.from(document.querySelectorAll('.todo-item')).map(item => ({
        text: item.innerText,
        completed: item.parentElement.classList.contains('completed')
    }));
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateCompletedShoppingStatus() {
    let shoppings = Array.from(document.querySelectorAll('.shopping-item')).map(item => ({
        text: item.innerText,
        completed: item.parentElement.classList.contains('completed')
    }));
    localStorage.setItem('shoppings', JSON.stringify(shoppings));
}

function createTodoElement(todoText, completed = false) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    if (completed) todoDiv.classList.add('completed'); 

    const newTodo = document.createElement('li');
    newTodo.innerText = todoText;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);

    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');

    const completedButton = createButton('✓', 'complete-btn', () => {
        todoDiv.classList.toggle('completed');
        updateCompletedStatus(); 
    });

    const trashButton = createButton('✗', 'trash-btn', () => {
        todoDiv.remove();
        updateLocalTodos();
    });

    buttonGroup.appendChild(completedButton);
    buttonGroup.appendChild(trashButton);
    todoDiv.appendChild(buttonGroup);

    todoList.appendChild(todoDiv);
}

function createShoppingElement(shoppingText, completed = false) {
    const shoppingDiv = document.createElement('div');
    shoppingDiv.classList.add('shopping');
    if (completed) shoppingDiv.classList.add('completed'); 

    const newShopping = document.createElement('li');
    newShopping.innerText = shoppingText;
    newShopping.classList.add('shopping-item');
    shoppingDiv.appendChild(newShopping);
    const buttonGroup = document.createElement('div');
    buttonGroup.classList.add('button-group');

    const completedButton = createButton('✓', 'complete-btn', () => {
        shoppingDiv.classList.toggle('completed');
        updateCompletedShoppingStatus(); 
    });

    const trashButton = createButton('✗', 'trash-btn', () => {
        shoppingDiv.remove();
        updateLocalShoppings();
    });

    buttonGroup.appendChild(completedButton);
    buttonGroup.appendChild(trashButton);
    shoppingDiv.appendChild(buttonGroup);
    shoppingList.appendChild(shoppingDiv);
}

function addTodo() {
    if (todoInput.value.trim() === '') return;

    createTodoElement(todoInput.value);
    saveLocalTodos(todoInput.value);
    todoInput.value = '';
}

function addShopping() {
    if (shoppingInput.value.trim() === '') return;

    createShoppingElement(shoppingInput.value);
    saveLocalShoppings(shoppingInput.value);
    shoppingInput.value = '';
}

function saveLocalTodos(todo) {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.push({ text: todo, completed: false });
    localStorage.setItem('todos', JSON.stringify(todos));
}

function saveLocalShoppings(shopping) {
    let shoppings = JSON.parse(localStorage.getItem('shoppings')) || [];
    shoppings.push({ text: shopping, completed: false });
    localStorage.setItem('shoppings', JSON.stringify(shoppings));
}

function updateLocalTodos() {
    let todos = Array.from(document.querySelectorAll('.todo-item')).map(item => item.innerText);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function updateLocalShoppings() {
    let shoppings = Array.from(document.querySelectorAll('.shopping-item')).map(item => item.innerText);
    localStorage.setItem('shoppings', JSON.stringify(shoppings));
}

function loadLocalItems() {
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
    let shoppings = JSON.parse(localStorage.getItem('shoppings')) || [];

    if (Array.isArray(todos)) {
        todos.forEach(todo => {
            if (todo.text && typeof todo.completed !== 'undefined') {
                createTodoElement(todo.text, todo.completed);
            }
        });
    }

    if (Array.isArray(shoppings)) {
        shoppings.forEach(shopping => {
            if (shopping.text && typeof shopping.completed !== 'undefined') {
                createShoppingElement(shopping.text, shopping.completed);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', loadLocalItems);
