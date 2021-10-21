var done = document.getElementsByClassName("fa-check-circle");
var trash = document.getElementsByClassName("fa-trash");

// const tasks = document.querySelectorAll('.task')

// Array.from(tasks).forEach((element) => {
//   element.addEventListener('click', markFinished)
// }) 

Array.from(done).forEach(function(element) {
  element.addEventListener('click', function(){
    const task = this.parentNode.parentNode.childNodes[1].innerText
    fetch('tasks', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'tasks': task,
        'finished': true,
      })
    })
    .then(response => {
      if (response.ok) return response.json()
    })
    .then(data => {
      console.log(data)
      window.location.reload(true)
    })
  });
});

Array.from(trash).forEach(function(element) {
  element.addEventListener('click', function(){
    const task = this.parentNode.parentNode.childNodes[1].innerText
    fetch('/tasks', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'tasks': task,
      })
    }).then(function (response) {
      window.location.reload(true)
    })
  });
});

// const userInput = document.querySelector('#inputTask')
// const submitUserInput = document.querySelector('#addTask')
const clearAll = document.querySelector('#clearAll')
const clearCompleted = document.querySelector('#clearCompleted')

clearAll.addEventListener('click', clearAllTasks)
clearCompleted.addEventListener('click', clearCompletedTasks)

function enterKeySubmit(event){
  if (event.keyCode === 13){
    addTaskToList()
  }
}

function remainingTasks(){
  let allTasks = document.querySelectorAll('li').length
  let finishedTasks = document.querySelectorAll('.finished').length
  let remainingTasks = allTasks - finishedTasks

  document.querySelector('#remaining').innerText = remainingTasks
  return remainingTasks
}

function clearAllTasks(){
  let allTasks = document.querySelectorAll('li')
  
  allTasks.forEach(element => element.remove())

  remainingTasks()
}


function clearCompletedTasks(){
  let finishedTasks = document.querySelectorAll('.finished')
  
  finishedTasks.forEach(element => element.remove())

  remainingTasks()
}



















/* 
  forEach is a higher order method (takes in a whole function as an argument). forEach is looping through the node list elements (like an array) and the argument 'element' represents each iteration of the loop (similar to what 'i' does in a for loop)

  These two functions do the exact same thing:

  allTasks.forEach(element => element.remove())

    finishedTasks.forEach(function(element){
    element.remove()
  })

*/