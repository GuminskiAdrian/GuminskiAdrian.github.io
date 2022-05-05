const button = document.querySelector("#taskButton");

function addNewTaskToList(task) {
  const list = document.querySelector("#taskList");

  const newTaskContainer = document.createElement("div");
  newTaskContainer.classList.add("newTaskContainer");
  
  const newTask = document.createElement("input");
  newTask.setAttribute("type", "text");
  newTask.setAttribute("value", task);
  newTask.classList.add("newTask");
  newTask.setAttribute("readOnly", true);

  const editButton = document.createElement("img");
  editButton.setAttribute("src", "icons/edit.png")
  editButton.classList.add("editButton");
  editButton.setAttribute("alt", "Edit");
  
  const deleteButton = document.createElement("img");
  deleteButton.setAttribute("src", "icons/delete.png")
  deleteButton.classList.add("deleteButton");

  newTaskContainer.appendChild(newTask);
  newTaskContainer.appendChild(editButton);
  newTaskContainer.appendChild(deleteButton);
  list.appendChild(newTaskContainer);

  deleteButton.addEventListener('click', function(){
    list.removeChild(newTaskContainer);
  });

  editButton.addEventListener('click', function(){
    if(editButton.alt == "Edit"){
      newTask.removeAttribute("readonly");
      editButton.setAttribute("alt", "Save");
      newTask.style.backgroundColor = "rgb(175, 238, 186)";
    } else {
      newTask.setAttribute("readOnly", true);
      editButton.setAttribute("alt", "Edit");
      newTask.style.backgroundColor = "white"
    }
  });
}

button.addEventListener("click", function(){
  const task = document.querySelector("#taskInput").value;
  addNewTaskToList(task)
});

const save = document.querySelector("#listSaver");
const reset = document.querySelector("#reset");

save.addEventListener("click", function(){
  localStorage.clear();
  // znalezienie wszystkich elementow z clasą newTask żeby potem pobrać ich wartości i wpisac je do local storage
  const tasks = document.getElementsByClassName("newTask");

  for(j = 0; j <tasks.length; j++){
    localStorage.setItem('taskNr'+j, tasks[j].value);
  }

  alert("Your list has been saved");
});

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