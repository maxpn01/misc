// TODOS:
// - add subtodo functionality
// - fix out of order localstorage deletion

class Todo {
    constructor(text, completed, subtodo) {
        this.text = text;
        this.completed = completed;
        this.subtodo = subtodo;
    }
}

const d = document,
      todoInput = d.querySelector(".todo-input"),
      addBtn = d.querySelector(".add"),
      todosEl = d.querySelector(".todos");

let todos = JSON.parse(localStorage.getItem('todos')) || [];            


todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTodo();
});
addBtn.addEventListener("click", addTodo);

updateUI();

function addTodo() {
    const newTodo = new Todo(todoInput.value, false, {});

    todos.push(newTodo);

    updateLS();
    addTodoUI(newTodo, todos.length - 1);
}

function editTodo(todoN, newText) {
    todos[todoN].text = newText;

    updateLS();
}

function completeTodo(todoN) {
    if (!todos[todoN].completed) todos[todoN].completed = true;
    else todos[todoN].completed = false;

    updateLS();
}

function deleteTodo(todoN) {
    todos.splice(todoN, 1);

    updateLS();
}


// function addSubTodo(todoN, subtodo) {
//     todos[todoN].subtodo = subtodo;

//     addTodoUI(subtodo, todos.length - 1)

//     updateLS();
// }

function addTodoUI(todo, todoIndex) {
    if (todo.text) {
        const todoEl = d.createElement("div");
        todoEl.classList.add("todo");

        if (todo && todo.completed)
            todoEl.classList.add("completed");

        todoEl.innerHTML = `
            <input type="text" value="${todo.text}" class="todo-text" disabled>
            <button class="edit">edit</button>
            <button class="complete">complete</button>
            <button class="subtodo">subtodo</button>
            <button class="delete">delete</button>
        `;

        todosEl.appendChild(todoEl);

        const todoText = todoEl.querySelector(".todo-text"),
              editBtn = todoEl.querySelector(".edit"),
              completeBtn = todoEl.querySelector(".complete"),
              subtodoBtn = todoEl.querySelector(".subtodo"),
              deleteBtn = todoEl.querySelector(".delete");

        editBtn.addEventListener("click", () => {
            if (todoText.disabled) todoText.disabled = false;
            else {
                editTodo(todoIndex, todoText.value);
                todoText.disabled = true;
            }
        });

        completeBtn.addEventListener("click", () => {
            completeTodo(todoIndex)
            editBtn.disabled = !editBtn.disabled;
            subtodoBtn.disabled = !subtodoBtn.disabled;
        });

        // subtodoBtn.addEventListener("click", () => {
        //     addSubTodo(todoIndex, new Todo("todo text", false, {}));
        // });

        deleteBtn.addEventListener("click", () => {
            deleteBtn.parentElement.remove()
            deleteTodo(todoIndex);
        });

        clearInput();
    }
}

function updateUI() {
    if (todos) {
        todos.forEach((todo, todoIndex) => {
            if (todo) addTodoUI(todo, todoIndex);
            if (todo.subtodo) addTodoUI(todo.subtodo, todoIndex);
        })
    }
}

function updateLS() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function clearInput() { 
    todoInput.value = "";
}