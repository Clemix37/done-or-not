import { v4 as uuidV4 } from "uuid";

// Creating the type
type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
};

// DOM Elements
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
let tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

// On th submit event from the form
form?.addEventListener("submit", e => {
  // Prevent refreshing the page
  e.preventDefault();
  // Check if input exist and contain value
  if(!input?.value) return;

  // We create the new task
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  // We add the new task to the list
  tasks.push(newTask);
  // And display it
  addListItem(newTask);
  // Save every task in the localStorage
  saveTasks();
  // We empty the input value
  input.value = "";
});

/**
 * Display the new task and attach the change event
 * @param task
 */
function addListItem(task:Task) {
  // We create every element we wanted
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");
  const btnSuppr = document.createElement("button");
  // We attach button elements
  btnSuppr.innerText = "Delete";
  btnSuppr.title = "Delete";
  btnSuppr.classList.add("btn-delete-task");
  btnSuppr.addEventListener("click", () => {
    // We filter the tasks without the one deleted
    tasks = tasks.filter(t => t.id !== task.id);
    // We clear the content of the list
    if(!!list) list.innerHTML = "";
    saveTasks();
    // We display them again
    tasks.forEach(addListItem);
  });
  // We attach the change event on the checkbox
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  // We display it as one block in the list
  label.append(task.title);
  item.append(checkbox, label, btnSuppr);
  list?.append(item);
}

/* Save tasks in the localStorage */
function saveTasks(){
  localStorage.setItem("done-not-tasks", JSON.stringify(tasks));
}

/**
 * Gets the tasks from localStorage and return them
 * @returns {Task[]}
 */
function loadTasks() : Task[] {
  const tasksJSON = localStorage.getItem("done-not-tasks");
  if(!tasksJSON) return [];
  return JSON.parse(tasksJSON);
}