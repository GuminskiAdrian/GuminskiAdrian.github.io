//on load add every task stored in local storage to task list
window.onload = () => {
    if(localStorage.length > 0){
        for(j = 0; j < localStorage.length; j++){
           let task = localStorage.getItem('taskNr'+j);
           addNewTaskToList(task);
        }
    }
}