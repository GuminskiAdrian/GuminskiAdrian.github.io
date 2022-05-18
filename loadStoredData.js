//on load add every task stored in local storage to task list
window.onload = () => {
    if(localStorage.length > 0){
        for(j = 0; j < localStorage.length; j++){
           let task = localStorage.getItem('taskNr'+j);
           let checked = localStorage.getItem('taskChk'+j);
           //if checked+current number exists it means that this task is checked as done
           //else if only task of current number exists it means that this task is yet to be done
           if (task && checked){
                addNewTaskToList(task, 1);
           } else if (task){
                addNewTaskToList(task, 0);
           }
        }
    }
}