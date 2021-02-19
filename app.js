const form = document.querySelector("#tasks-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter")
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners(){
    // Add task event
    form.addEventListener('submit',addTask);

}

// Add Task
function addTask(e){
    if(taskInput.value===""){
        alert("Add a Task");
    }
    // create li element
    const li =  document.createElement('li');
    li.className = "collection-item";
    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    // create new link for delete item 
    const link = document.createElement('a');
    // add class
    link.className = 'delete-item secondary-content';
    // add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // append link to li
    li.appendChild(link);
    // append to ul
    taskList.appendChild(li);
    taskInput.value = '';

    e.preventDefault();
}



