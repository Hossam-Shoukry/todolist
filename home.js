let container = document.querySelector(".container");
let theInput = document.querySelector(".input-div input");
let button = document.querySelector(".input-div span");
let taskDiv = document.querySelector(".taskDiv");
let empty = document.querySelector(".empty-span");


let arrayOfTasks=[]
if(localStorage.getItem("tasks")){
    arrayOfTasks=JSON.parse(localStorage.getItem("tasks"));
}
button.onclick=function(){
   if(theInput.value !==""){
    if(document.body.contains(empty)){
        empty.remove();
       }
    addTaskToArray(theInput.value);
   
    caleculate();

   }
   
   theInput.value=``;

}
function addTaskToArray(task){
    const tasks = {
        id : Date.now(),
        title :task,
        completed:false
    }
    arrayOfTasks.push(tasks);
    addElementsToPageForm(arrayOfTasks);
    addElementsToLocalStorage(arrayOfTasks);
}
function addElementsToPageForm(arrayOfTasks){
    taskDiv.innerHTML=``;
    arrayOfTasks.forEach(function(task){
        let div = document.createElement("div");
        div.className="task";
        div.setAttribute("data-id" , task.id);
        let span = document.createElement("span");
        if(task.completed){
            div.classList.add("finished");
        }
        span.className="del";
        span.appendChild(document.createTextNode("Delete"));
        div.appendChild(document.createTextNode(task.title));
        div.appendChild(span);
        taskDiv.appendChild(div);
    })
}

function addElementsToLocalStorage(arrayOfTasks){
  localStorage.setItem("tasks" , JSON.stringify(arrayOfTasks));
    
}
function getElementsFromLocalStorage(){
    let data = localStorage.getItem("tasks");
    if(data){
        let tasks =JSON.parse(data); 
        addElementsToPageForm(tasks);

    }
}getElementsFromLocalStorage();

taskDiv.addEventListener("click" ,function(e){
    if(e.target.classList.contains("del")){
        removeElementsFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if(e.target.classList.contains("task")){
        e.target.classList.toggle("finished");
        updatElements(e.target.getAttribute("data-id"))
        
    }
    browseEmptyTask();
    caleculate();
    
})
function removeElementsFromLocalStorage(taskId){
arrayOfTasks = arrayOfTasks.filter(function(task){
    return task.id != taskId 
})
addElementsToLocalStorage(arrayOfTasks);
}

function updatElements(taskId){
    for(let i = 0 ; i<arrayOfTasks.length;i++){
        if(taskId == arrayOfTasks[i].id){
            arrayOfTasks[i].completed ==false ? arrayOfTasks[i].completed=true : arrayOfTasks[i].completed=false;

        }
    }
    addElementsToLocalStorage(arrayOfTasks);
}
let taskNum = document.querySelector(".tasks-num");
let doneNum =document.querySelector(".done-num");

function caleculate(){
taskNum.innerHTML = document.querySelectorAll(".task").length;
localStorage.setItem("num",document.querySelectorAll(".finished").length);
doneNum.innerHTML=localStorage.getItem("num");
}caleculate();

function browseEmptyTask(){
    if(taskDiv.childElementCount == 0){
        let div = document.createElement("div");
        div.className ="empty-div";
        let span = document.createElement("span");
        span.className="empty-span";
        span.appendChild(document.createTextNode("Table Is Empty"));
        div.appendChild(span);
taskDiv.appendChild(div);
    }
}browseEmptyTask();