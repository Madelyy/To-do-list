import "./styles.css";
import { addTodo } from "./todo";
import { renderTodos } from "./dom";
import { editTodo } from "./todo";

const titleInput = document.getElementById("todo-title");
const prioritySelect = document.getElementById("todo-priority");
const descriptionInput = document.getElementById("todo-description");
const folderSelect = document.getElementById("todo-folder");
const dateInput = document.getElementById("todo-date");
const dialog = document.getElementById("todo-dialog");
const openBtn = document.getElementById("open-dialog");
const closeBtn = document.getElementById("close-dialog");
const form = document.getElementById("todo-form");

const allBtn = document.getElementById("all-tasks");
const doneBtn = document.getElementById("done");
const workBtn = document.getElementById("work");
const personalBtn = document.getElementById("personal");
const studyBtn = document.getElementById("study");

let currentFilter = "all-tasks";

openBtn.onclick = () => {
    delete dialog.dataset.editIndex;
    form.reset();
    dialog.showModal();
};

closeBtn.onclick = () => {
    dialog.close();
};

allBtn.onclick = () => {
    currentFilter = "all";
    renderTodos(currentFilter);
};

doneBtn.onclick = () => {
    currentFilter = "completed";
    renderTodos(currentFilter);
};

workBtn.onclick = () => {
    currentFilter = "work";
    renderTodos(currentFilter);
};

personalBtn.onclick = () => {
    currentFilter = "personal";
    renderTodos(currentFilter);
};

studyBtn.onclick = () => {
    currentFilter = "study";
    renderTodos(currentFilter);
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const editIndex = dialog.dataset.editIndex !== undefined ? Number(dialog.dataset.editIndex) : undefined;

    if (editIndex !== undefined) {
        editTodo(
            editIndex,
            titleInput.value,
            prioritySelect.value,
            descriptionInput.value,
            folderSelect.value,
            dateInput.value,
        );

        delete dialog.dataset.editIndex;

    } else {
        addTodo(
            titleInput.value,
            prioritySelect.value,
            descriptionInput.value,
            folderSelect.value,
            dateInput.value,
        );
    }

    form.reset();
    dialog.close();

    renderTodos(currentFilter);
});

renderTodos(currentFilter);