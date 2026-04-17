import { loadTodos, saveTodos } from "./storage";

let todos = loadTodos();

export function getTodos() {
    return todos;
}

export function addTodo(title, priority, description, folder, date) {
    todos.push({
        title,
        priority,
        description,
        folder,
        date: date ? new Date(date) : new Date(),
        completed: false,
    });

    saveTodos(todos);
}

export function editTodo(index, title, priority, description, folder, date) {
    todos[index] = {
        ...todos[index],
        title,
        priority,
        description,
        folder,
        date: date ? new Date(date) : todos[index].date,
    };

    saveTodos(todos);
}

export function toggleTodo(index) {
    todos[index].completed = !todos[index].completed;

    saveTodos(todos);
}

export function deleteTodo(index) {
    todos.splice(index, 1);

    saveTodos(todos);
}