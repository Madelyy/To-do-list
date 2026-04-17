import { getTodos, toggleTodo, deleteTodo } from "./todo";
import { format } from "date-fns";
import calendarIcon from "./icons/calendar-blank-outline.svg";
import editIcon from "./icons/pencil.svg";
import binIcon from "./icons/delete.svg";
import workIcon from "./icons/folder.svg";
import personalIcon from "./icons/account.svg";
import studyIcon from "./icons/school.svg";

export function openEditDialog(todo, index) {
    const dialog = document.getElementById("todo-dialog");

    document.getElementById("todo-title").value = todo.title;
    document.getElementById("todo-priority").value = todo.priority;
    document.getElementById("todo-description").value = todo.description;
    document.getElementById("todo-folder").value = todo.folder;
    document.getElementById("todo-date").value = format(todo.date, "yyyy-MM-dd");

    dialog.dataset.editIndex = index;
    dialog.showModal();
}

export function renderTodos(filter = "all") {
    const content = document.getElementById("content");
    content.innerHTML = "";

    let todos = getTodos();

    if (filter === "completed") {
        todos = todos.filter(todo => todo.completed);
    }

    if (filter === "work") {
        todos = todos.filter(todo => todo.folder === "Work");
    }

    if (filter === "personal") {
        todos = todos.filter(todo => todo.folder === "Personal");
    }

    if (filter === "study") {
        todos = todos.filter(todo => todo.folder === "Study");
    }

    todos.forEach((todo) => {
        // indice - - -- - -- - - -
        const realIndex = getTodos().indexOf(todo);

        const div = document.createElement("div");
        div.classList.add("card");

        const header = document.createElement("div");
        header.classList.add("card-header");

        const title = document.createElement("h3");
        title.textContent = todo.title;

        const actions = document.createElement("div");
        actions.classList.add("actions");

        const editBtn = document.createElement("button");
        const editImg = document.createElement("img");
        editImg.src = editIcon;
        editImg.classList.add("icon");

        editBtn.appendChild(editImg);
        editBtn.onclick = () => openEditDialog(todo, realIndex);

        const deleteBtn = document.createElement("button");
        const binImg = document.createElement("img");
        binImg.src = binIcon;
        binImg.classList.add("icon");

        deleteBtn.appendChild(binImg);
        deleteBtn.onclick = () => {
            deleteTodo(realIndex);
            renderTodos(filter);
        };

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        header.appendChild(title);
        header.appendChild(actions);

        const priority = document.createElement("p");
        priority.textContent = todo.priority.toUpperCase();
        priority.classList.add(`priority-${todo.priority}`);

        const description = document.createElement("p");
        description.textContent = todo.description;

        const folder = document.createElement("p");
        folder.textContent = todo.folder;
        folder.classList.add(`folder-${todo.folder}`);

        let icon;
        if (todo.folder === "Work") icon = workIcon;
        if (todo.folder === "Personal") icon = personalIcon;
        if (todo.folder === "Study") icon = studyIcon;

        if (icon) {
            const img = document.createElement("img");
            img.src = icon;
            img.classList.add("folder-icon");
            folder.prepend(img);
        }

        const dateContainer = document.createElement("div");
        dateContainer.classList.add("date-container");

        const calIcon = document.createElement("img");
        calIcon.src = calendarIcon;
        calIcon.classList.add("icon");

        const date = document.createElement("p");
        date.textContent = format(todo.date, "dd-MM-yyyy");

        dateContainer.appendChild(calIcon);
        dateContainer.appendChild(date);

        const completeBtn = document.createElement("button");
        completeBtn.classList.add("complete-btn");
        completeBtn.textContent = todo.completed ? "Undo" : "Done";

        completeBtn.onclick = () => {
            toggleTodo(realIndex);
            renderTodos(filter);
        };

        if (todo.completed) {
            title.style.textDecoration = "line-through";
            div.classList.add("completed");
        }

        div.appendChild(header);
        div.appendChild(priority);
        div.appendChild(description);
        div.appendChild(folder);
        div.appendChild(dateContainer);
        div.appendChild(completeBtn);

        content.appendChild(div);
    });
}