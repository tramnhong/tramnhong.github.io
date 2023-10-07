"use strict";

//store list item in dict
let currentDict = {};
let counter = 0;

//load local storage
function loadStorage() {
  let todoitems = window.localStorage.getItem("currentDict");
  counter = window.localStorage.getItem("counter") ? window.localStorage.getItem("counter") : 0;
  if (todoitems === null) {
    currentDict = {};
    return;
  }
  currentDict = JSON.parse(todoitems);
  for (let [key, value] of Object.entries(currentDict)) {
    addItemWeb(key, value);
  }
}

//add new item to list 
function addItemWeb(cnt, inputValue) {
  const newLi = document.createElement("li");
  const textContent = document.createTextNode(inputValue);
  newLi.appendChild(textContent);
  if (inputValue === '') {
    return '';
  } else {
    document.getElementById("ul").appendChild(newLi);
  }

  //add symbol X to span, click to remove list
  document.getElementById("Input").value = "";
  const span = document.createElement("SPAN");
  const X = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(X);
  span.onclick = function () {
    let div = this.parentElement;
    div.style.display = "none";
    delete currentDict[cnt];
    saveList(currentDict);
  }
  newLi.appendChild(span);
}

//make the list, store in array
function makeList() {
  const inputValue = document.getElementById("Input").value;
  currentDict[counter] = inputValue;
  addItemWeb(counter, inputValue);
  counter++;
  saveList(currentDict);
  saveCounter(counter);
}

//cross task when click, back to normal when click again
const done = document.querySelector('ul');
done.addEventListener('click', function (event) {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('checked');
  }
}, false);

//save current list to local storage
function saveList(currentDict) {
  window.localStorage.setItem("currentDict", JSON.stringify(currentDict))
}

function saveCounter(cnt) {
  window.localStorage.setItem("counter", JSON.stringify(cnt))
}

loadStorage();

//clear storage
function clearStorage(){
  currentDict = {};
  counter = 0;
  saveList(currentDict);
}