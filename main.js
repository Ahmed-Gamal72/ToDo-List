//Setting Up Variables
let theInput = document.querySelector(".add-task input");
let theAddButton = document.querySelector(".add-task .plus");
let taskContainer = document.querySelector(".tasks-content");
let noTasksMsg = document.querySelector(".no-tasks-message");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");
let Tasks = [] ;
// Focus On Input Field
window.onload = function () {
  theInput.focus();
  allStorage();
};

//Adding The Task
theAddButton.onclick = function () {
  if (theInput.value === "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Task should not be empty",
    });
  } else {
    if (document.body.contains(document.querySelector(".no-tasks-message"))) {
      noTasksMsg.remove();
    }

    //Create Span Elment
    let mainSpan = document.createElement("span");

    // Create Delete Button
    let deleteElement = document.createElement("span");

    //Create mainSpan Text
    let text = document.createTextNode(theInput.value);

    //Create DeleteButton Text
    let deleteText = document.createTextNode("Delete");

    //Add text to mainSpan
    mainSpan.appendChild(text);
    //Add Class to mainSpan
    mainSpan.className = "task-box";

    //Add text to DeleteSpan
    deleteElement.appendChild(deleteText);
    //Add Class to DeleteSpan
    deleteElement.className = "delete";

    //Add Delete Button to main span
    mainSpan.appendChild(deleteElement);

    let valueOfSpan = document.querySelectorAll(".task-box");
    let count = 0;
    if (valueOfSpan !== null) {
      for (let i = 0; i < valueOfSpan.length; i++) {
        let actualData = valueOfSpan[i].firstChild.textContent;
        if (actualData === theInput.value) {
          count++;
        }
      }

      if (count > 0) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The Task already exist",
        });
      } else {
        taskContainer.appendChild(mainSpan);
        Tasks.push(theInput.value);
        localStorage.setItem("Task", JSON.stringify(Tasks));
      }
    } else {
      taskContainer.appendChild(mainSpan);
      localStorage.setItem("Task", JSON.stringify(Tasks));
    }
    //Add the Task To Th e Container

    //Empty The Input Value
    theInput.value = "";

    //Focus On Field
    theInput.focus();

    //Calculate Tasks
    calculateTasks();
  }
};

document.addEventListener("click", function (e) {
  //delete task
  if (e.target.className == "delete") {
    e.target.parentNode.remove();
    
    let deletedVal = e.target.parentNode.firstChild.textContent;
    window.localStorage.removeItem(deletedVal);
    let valueOfSpan = document.querySelectorAll(".task-box");
    if (valueOfSpan.length === 0) {
      taskContainer.appendChild(noTasksMsg);
    }

    //Calculate Tasks
    calculateTasks();
  }

  let valueOfSpan = document.querySelectorAll(".task-box");
  // Delete All
  if (e.target.className == "DeleteAll") {
    if (valueOfSpan !== null) {
      for (let i = 0; i < valueOfSpan.length; i++) {
        valueOfSpan[i].parentElement.removeChild(valueOfSpan[i]);
      }
      taskContainer.appendChild(noTasksMsg);
    }

    //Calculate Tasks
    calculateTasks();
    window.localStorage.clear();
  }
  //finish task
  if (e.target.classList.contains("task-box")) {
    e.target.classList.toggle("finished");

    //Calculate Tasks
    calculateTasks();
  }

  if (e.target.className == "FinishAll") {
    //finish All
    if (valueOfSpan !== null) {
      for (let i = 0; i < valueOfSpan.length; i++) {
        valueOfSpan[i].classList.add("finished");
      }
    }

    //Calculate Tasks
    calculateTasks();
  }
});

//Function To Calculate Tasks
function calculateTasks() {
  // calc all tasks
  tasksCount.innerHTML = document.querySelectorAll(
    ".tasks-content .task-box"
  ).length;

  // calc all complete tasks
  tasksCompleted.innerHTML = document.querySelectorAll(
    ".tasks-content .finished"
  ).length;
}

function allStorage() {

  var values = [],
      keys = Object.keys(localStorage),
      i = keys.length;

  while ( i-- ) {
      values.push( localStorage.getItem(keys[i]) );
  }

  return values;
}