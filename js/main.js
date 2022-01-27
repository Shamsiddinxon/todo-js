"use strict";
let elForm = document.querySelector(".form");
let elInput = document.querySelector(".form__input--todo");
let elInputName = document.querySelector(".form__input--name");
let elList = document.querySelector(".todo__result");
let elResultTitle = document.querySelector(".list__title");
let elAllBtn = document.querySelector(".btn-bottom");
let elAllBtnDesc = document.querySelector(".des-all");
let elAllComDesc = document.querySelector(".des-com");
let elAllUmcDesc = document.querySelector(".des-umc");

let checkedTodos = [];
const noCheckedTodos = [];

const nameValu = function (value) {
  window.localStorage.setItem("localValue", JSON.stringify(value));
  let localNameValue = JSON.parse(window.localStorage.getItem("localValue"));
  elResultTitle.textContent = `Salom ${localNameValue} sizning rejalaringiz:`;
};

// RENDER CARD ADD
const renderTodos = function (arr, element) {
  arr.forEach(function (todo) {
    elAllBtnDesc.textContent = todos.length;
    elAllComDesc.textContent = todos.filter((todo) => todo.isCompleted).length;
    elAllUmcDesc.textContent = todos.filter(function (todo) {
      return !todo.isCompleted;
    }).length;

    checkedTodos.push = todos.filter((todo) => todo.isCompleted);
    noCheckedTodos.push = todos.filter((todo) => !todo.isCompleted);

    let newLi = document.createElement("li");
    let newCheckbox = document.createElement("input");
    let newDesc = document.createElement("p");
    let newbtnDelete = document.createElement("button");
    let newbtnDeleteImg = document.createElement("img");

    newCheckbox.type = "checkbox";
    elList.setAttribute("class", "list");
    newLi.setAttribute("class", "item");
    newDesc.classList.add("item-desc");
    newDesc.textContent = todo.title;;


    newbtnDelete.classList.add("delete-btn");
    newCheckbox.classList.add("checkbox-btn");
    newbtnDelete.dataset.todoId = todo.id;
    newCheckbox.dataset.checkId = todo.id;

    if (todo.isCompleted) {
      newCheckbox.checked = true;
      newLi.style.textDecoration = "line-through";
      newLi.style.backgroundColor = "lightgreen";
      newbtnDelete.style.backgroundColor = "lightgreen";
    }

    element.appendChild(newLi);
    newLi.appendChild(newDesc);
    newLi.appendChild(newCheckbox);
    newLi.appendChild(newbtnDelete);
    newbtnDelete.appendChild(newbtnDeleteImg);
  });
};

const localTodos = JSON.parse(window.localStorage.getItem("localTodos"));
let todos = localTodos || [];


renderTodos(todos, elList);

// DELETE BTN
elList.addEventListener("click", function (evt) {
  if (evt.target.matches(".delete-btn")) {
    let btnTodoId = evt.target.dataset.todoId * 1;
    let foundIndex = todos.findIndex((todo) => todo.id === btnTodoId);

    todos.splice(foundIndex, 1);

    elList.innerHTML = null;

    renderTodos(todos, elList);
    window.localStorage.setItem("localTodos", JSON.stringify(todos));
  } else if (evt.target.matches(".checkbox-btn")) {
    let checkTodoId = evt.target.dataset.checkId * 1;

    let foundCheckTodo = todos.find((todo) => todo.id === checkTodoId);
    foundCheckTodo.isCompleted = !foundCheckTodo.isCompleted;
    elList.innerHTML = null;

    window.localStorage.setItem("localTodos", JSON.stringify(todos));
    renderTodos(todos, elList);
  }
});

// CARD PUSH

elForm.addEventListener("submit", function (evt) {
  document.querySelector(".btn-bottom").classList.remove("none");
  evt.preventDefault();

  nameValu(elInputName.value);

  let newTodo = {
    id: todos[todos.length - 1]?.id + 1 || 0,
    title: elInput.value,
    isCompleted: false,
  };

  todos.push(newTodo);
  window.localStorage.setItem("localTodos", JSON.stringify(todos));

  elList.innerHTML = null;
  elInput.value = null;
  renderTodos(todos, elList);
});

// TOP BUTTONS

elAllBtn.addEventListener("click", function (evt) {
  if (evt.target.matches(".btn-all")) {
    elList.innerHTML = null;
    renderTodos(todos, elList);
  } else if (evt.target.matches(".btn-com")) {
    elList.innerHTML = null;
    renderTodos(checkedTodos.push, elList);
  } else if (evt.target.matches(".btn-umc")) {
    elList.innerHTML = null;
    renderTodos(noCheckedTodos.push, elList);
  }
});

if (localTodos.length != 0) {
  let value = JSON.parse(window.localStorage.getItem("localValue"));
  nameValu(value);
  document.querySelector(".btn-bottom").classList.remove("none");
} else {
  document.querySelector(".btn-bottom").classList.add("none");
}
