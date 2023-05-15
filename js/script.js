//datos atraidos
const form = document.querySelector("#form");
const taskInput = document.querySelector("#task");
const deleteAll = document.getElementById("deleteAll");
const listTask = document.getElementById("lsTask");
const taskTotal = document.getElementById("taskTotal");
const taskComplete = document.getElementById("taskComplete");
let count = 0;
const taskArray = [];

deleteAll.addEventListener("click", deleteAllTask);

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (taskInput.value.length === 0) {
    form.classList.add("blink-2");
    setTimeout(() => {
      form.classList.remove("blink-2");
    }, 1000);
    return;
  }
  count++;

  const task = {
    id: count,
    text: taskInput.value,
    isComplete: false,
  };
  renderTask(task);
  addTask(task);
  countTask();
  console.log(taskArray);
  taskInput.value = "";
});

function addTask(task) {
  taskArray.push(task);
}

function renderTask(task) {
  const divTask = document.createElement("li");
  divTask.classList.add("list-task__task", "fade-in-top");
  divTask.id = task.id;
  const taskParagraph = document.createElement("span");
  taskParagraph.classList.add("task__text");
  taskParagraph.textContent = task.text;
  const button = document.createElement("button");
  button.classList.add("task__btn");
  button.innerHTML = `<svg
  xmlns="http://www.w3.org/2000/svg"
  fill="none"
  id="${task.id}"
  viewBox="0 0 24 24"
  stroke-width="1.5"
  stroke="currentColor"
  class="icon icon--delete"
>
  <path
    stroke-linecap="round"
    stroke-linejoin="round"
    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
  />`;
  divTask.append(taskParagraph, button);
  listTask.append(divTask);
  divTask.addEventListener("click", (e) =>
    toggleState(e, divTask, taskParagraph, button, task)
  );
  button.addEventListener("click", (e) => deleteTask(e));
}

function deleteTask(e) {
  let idTrash = e.target.id;
  const taskContext = document.getElementById(Number(idTrash));
  taskContext.classList.add("fade-out-bottom");
  setTimeout(() => {
    taskContext.remove();
  }, 700);
  let idFinded = taskArray.findIndex((task) => task.id === Number(idTrash));
  taskArray.splice(idFinded, 1);
  countTask();
  taskComplete.innerText = countTaskComplete().length
}

function deleteAllTask() {
  const tasks = document.querySelectorAll(".list-task__task");
  tasks.forEach((task) => {
    task.classList.add("fade-out-bottom");
  });
  setTimeout(() => {
    listTask.innerHTML = "";
    taskArray.splice(0, taskArray.length);
    countTask();
    taskComplete.innerText = countTaskComplete().length
  }, 700);
}

function toggleState(e, div, text, button, task) {
  let idTarget = e.target.id;
  let idFinded = taskArray.find((t) => t.id === Number(idTarget));
  if (!idFinded.isComplete) {
    div.classList.add("list-task__task--complete");
    text.classList.add("task__text--complete");
    button.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        id="${task.id}"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon icon--deleteComplete"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />`;
    idFinded.isComplete = true;
  } else {
    div.classList.remove("list-task__task--complete");
    text.classList.remove("task__text--complete");
    button.innerHTML = `<svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        id="${task.id}"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon icon--delete"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
        />`;
    idFinded.isComplete = false;
  }
  taskComplete.innerText = countTaskComplete().length
}

function countTask() {
  taskTotal.innerText = taskArray.length;
}

function countTaskComplete() {
  let completedTask = taskArray.filter((task) => {
    return task.isComplete === true;
  });
  return completedTask;
}

countTask()