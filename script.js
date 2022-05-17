const button = document.querySelector("#taskButton");

function addNewTaskToList(task, isChecked) {
  //getting taskList container
  const list = document.querySelector("#taskList");
  
  //creating container for new task
  const newTaskContainer = document.createElement("div");
  newTaskContainer.classList.add("newTaskContainer");
  
  //container for edit and delete buttons
  const newTaskContainerBttn = document.createElement("div");
  newTaskContainerBttn.classList.add("newTaskContainerBttn");

  //input with actual task to do
  const newTask = document.createElement("input");
  newTask.setAttribute("type", "text");
  newTask.setAttribute("value", task);
  newTask.classList.add("newTask");
  newTask.setAttribute("readOnly", true);

  //checbox
  const checkBox = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  //if task checbox is checked than add styles and class
  if(isChecked == 1){
    checkBox.setAttribute("checked", true);
    newTask.classList.add('doneTask');
    newTask.style.backgroundColor =  "rgb(66, 197, 66)";
  }
  checkBox.classList.add("checkBox");

  //edit button
  const editButton = document.createElement("img");
  editButton.setAttribute("src", "icons/edit.svg")
  editButton.classList.add("editButton");
  editButton.setAttribute("alt", "Edit");
  
  //delete button
  const deleteButton = document.createElement("img");
  deleteButton.setAttribute("src", "icons/delete.svg")
  deleteButton.classList.add("deleteButton");

  //adding elements to DOM
  newTaskContainer.appendChild(checkBox);
  newTaskContainer.appendChild(newTask);
  newTaskContainerBttn.appendChild(editButton);
  newTaskContainerBttn.appendChild(deleteButton);
  newTaskContainer.appendChild(newTaskContainerBttn);
  list.appendChild(newTaskContainer);

  deleteButton.addEventListener('click', function(){
    list.removeChild(newTaskContainer);
  });

  editButton.addEventListener('click', function(){
    if(editButton.alt == "Edit"){
      newTask.removeAttribute("readonly");
      editButton.setAttribute("alt", "Save");
      newTask.style.backgroundColor = "rgb(196, 240, 248)";
    } else {
      newTask.setAttribute("readOnly", true);
      editButton.setAttribute("alt", "Edit");
      newTask.style.backgroundColor = "white";
    }
  });

  checkBox.addEventListener('change', function(){
    if(checkBox.checked === true){
      newTask.classList.add('doneTask');
      newTask.style.backgroundColor =  "rgb(66, 197, 66)";
    } else {
      newTask.classList.remove('doneTask');
      newTask.style.backgroundColor =  "white";
    }
  });

}

button.addEventListener("click", function(){
  const task = document.querySelector("#taskInput").value;
  addNewTaskToList(task);
  document.querySelector("#taskInput").value = '';
});

const save = document.querySelector("#listSaver");
const reset = document.querySelector("#reset");

//saving tasks in local storage

save.addEventListener("click", function(){
  localStorage.clear();
  //adding every item with 'newTask' class to local storage
  const tasks = document.getElementsByClassName("newTask");

  //every checked checkbox
  const checkedBoxes = document.getElementsByClassName("checkBox");

  for(j = 0; j <tasks.length; j++){
    localStorage.setItem('taskNr'+j, tasks[j].value);

    //checking whitch box in order is checked
    if (checkedBoxes[j].checked == true) {
      localStorage.setItem('taskChk'+j, j.toString());
    }
  }

  alert("Your list has been saved");
});

//clearing local storage and currently displayed task list
reset.addEventListener("click", function(){
  localStorage.clear();

  const list = document.querySelector("#taskList");
  let tasks = document.getElementsByClassName("newTaskContainer").length - 1;
  
  while(tasks >= 0){
    const task = document.querySelector('.newTaskContainer');
    list.removeChild(task);
    tasks--;
  }
});