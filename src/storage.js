export function saveTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

export function loadTodos() {
    const data = localStorage.getItem("todos");

    if (!data) return [];

    const parsed = JSON.parse(data);

    return parsed.map(todo => ({
        ...todo,
        date: new Date(todo.date),
    }));
}