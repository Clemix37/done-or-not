import {v4 as uuidV4} from "../_snowpack/pkg/uuid.js";
const list = document.querySelector("#list");
const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-title");
let tasks = loadTasks();
tasks.forEach(addListItem);
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input?.value)
    return;
  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(newTask);
  addListItem(newTask);
  saveTasks();
  input.value = "";
});
function addListItem(task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const btnSuppr = document.createElement("button");
  btnSuppr.innerText = "Delete";
  btnSuppr.title = "Delete";
  btnSuppr.classList.add("btn-delete-task");
  btnSuppr.addEventListener("click", () => {
    tasks = tasks.filter((t) => t.id !== task.id);
    if (!!list)
      list.innerHTML = "";
    saveTasks();
    tasks.forEach(addListItem);
  });
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(task.title);
  item.append(checkbox, label, btnSuppr);
  list?.append(item);
}
function saveTasks() {
  localStorage.setItem("done-not-tasks", JSON.stringify(tasks));
}
function loadTasks() {
  const tasksJSON = localStorage.getItem("done-not-tasks");
  if (!tasksJSON)
    return [];
  return JSON.parse(tasksJSON);
}
