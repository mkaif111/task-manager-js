const form = document.querySelector("#tasks-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter")
const taskInput = document.querySelector("#task");

// load all event listeners
loadEventListeners();

// load all event listeners
function loadEventListeners(){
    // Dom load event
    document.addEventListener('DOMContentLoaded',getTasks);
    // Add task event
    form.addEventListener('submit',addTask);
    // Remove Task event
    taskList.addEventListener('click',removeTask);
    // Clear All task
    clearBtn.addEventListener('click',clearTask)
    // Filter task
    filter.addEventListener('keyup',filterTasks);

}
// get Tasks
function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')==null)
        tasks = [];
    else
        tasks = JSON.parse(localStorage.getItem('tasks'));
    
    tasks.forEach((task)=>{
        const li = document.createElement('li');
        li.className = "collection-item";
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content'
        link.innerHTML = '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    })
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
    
    // Store in Local Storage 
    storeInLocalStorage(taskInput.value);

    taskInput.value = '';

    e.preventDefault();
}
// TStore Task
const storeInLocalStorage = (task)=>{
    let tasks;
    if(localStorage.getItem('tasks')==null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure ?")){
            e.target.parentElement.parentElement.remove();
            // remove task from Local Storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}

// remove task from local storage
const removeTaskFromLocalStorage = (taskItem)=>{
    let tasks;
    if(localStorage.getItem('tasks') === null)
        tasks = [];
    else
        tasks = JSON.parse(localStorage.getItem('tasks'));
    
    tasks.forEach((task,index)=>{
        if(taskItem.textContent === task)
            tasks.splice(index,1);
    })
    // store the remaining task in local storage
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTask(){
    taskList.innerHTML = "";
    
    //faster way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    // let tasks = [];
    // localStorage.setItem('tasks',JSON.stringify(tasks));
    localStorage.clear();
}

function filterTasks(e){ 
    const text = e.target.value.toLowerCase();
    document.querySelectorAll(".collection-item").forEach((task)=>{
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text)!=-1){
            task.style.display = "block";
            // task.style.backgroundColor = "yellow"
        }
        else{
            task.style.display = "none";
        }

    });
}



