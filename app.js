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
    // Remove Task event
    taskList.addEventListener('click',removeTask);
    // Clear All task
    clearBtn.addEventListener('click',clearTask)
    // Filter task
    filter.addEventListener('keyup',filterTasks);

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

// Remove Task
function removeTask(e){
    if(e.target.parentElement.classList.contains('delete-item')){
        if(confirm("Are you sure ?")){
            e.target.parentElement.parentElement.remove();
        }
    }
}

function clearTask(){
    taskList.innerHTML = "";
    
    //faster way
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
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



