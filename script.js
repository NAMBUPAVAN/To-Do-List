let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

displayTasks();

function addTask(){

    let input = document.getElementById("taskInput");

    let task = input.value.trim();

    if(task===""){

        alert("Please enter a task");

        return;
    }

    tasks.push({

        text:task,

        completed:false

    });

    saveTasks();

    input.value="";
}

function displayTasks(){

    let list=document.getElementById("taskList");

    list.innerHTML="";

    tasks.forEach((task,index)=>{

        let li=document.createElement("li");

        if(task.completed){

            li.classList.add("completed");
        }

        li.innerHTML=`

        <span class="task-text">${task.text}</span>

        <div class="actions">

        <i class="fa-solid fa-check" onclick="toggleTask(${index})"></i>

        <i class="fa-solid fa-pen" onclick="editTask(${index})"></i>

        <i class="fa-solid fa-trash" onclick="deleteTask(${index})"></i>

        </div>

        `;

        list.appendChild(li);

    });

}

function toggleTask(index){

    tasks[index].completed=!tasks[index].completed;

    saveTasks();

}

function editTask(index){

    let newTask=prompt("Edit Task",tasks[index].text);

    if(newTask!==null && newTask.trim()!==""){

        tasks[index].text=newTask.trim();

        saveTasks();

    }

}

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();

    }

}

function saveTasks(){

    localStorage.setItem("tasks",JSON.stringify(tasks));

    displayTasks();

}

document.getElementById("taskInput").addEventListener("keypress",function(e){

    if(e.key==="Enter"){

        addTask();

    }

});