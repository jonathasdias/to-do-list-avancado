const container_tasks = document.getElementById('container-tasks');
const form_todo_list = document.getElementById('form-todo-list');
const task = document.getElementById('input-add-task');
const form_edit  = document.getElementById('form-edit');

function todo({descricao, completed}, index) {
    return `
            <article class="task ${completed? 'task-completed':''}">
                <div class="container-btns-edit">
                    <button title="Edit" onclick='edit(${index})'><i class="fa-solid fa-pencil"></i></button>
                    <button title="Complete" onclick='isCompleted(${index})'><i class="fa-regular fa-bookmark"></i></button>
                    <button title="Delete" onclick='del(${index})'><i class="fa-solid fa-trash-can"></i></button>
                </div>
                <p class="descricao">${descricao}</p>
            </article>
    `
}

function edit(index) {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    let btn_cancel = document.getElementById('btn-cancel');
    let input_edit = document.getElementById('input-edit-description');

    form_edit.style.setProperty('display', 'grid')
    input_edit.value = taskList[index].descricao;
    input_edit.focus();

    form_edit.addEventListener('submit', (e)=> {
        e.preventDefault();

        if(input_edit.value.trim() === '') {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Type something or cancel editing!",
            });
            return;
        }
        taskList[index].descricao = input_edit.value;
        localStorage.setItem('tasks', JSON.stringify(taskList))
        form_edit.style.setProperty('display', 'none');
        loadTasks()
    })
    
    btn_cancel.addEventListener('click', (e)=> {
        e.preventDefault();
        form_edit.style.setProperty('display', 'none');
    })
}

function isCompleted(index) {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    taskList[index].completed = !taskList[index].completed;

    localStorage.setItem('tasks', JSON.stringify(taskList));

    loadTasks()
}

function del(index) {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];

    taskList.splice(index, 1);
    
    localStorage.setItem('tasks', JSON.stringify(taskList));

    loadTasks()
}

function loadTasks() {
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    
    container_tasks.innerHTML = '';

    taskList.forEach((task,index) => {
        container_tasks.innerHTML += todo(task,index);
    });
}

function AddTodo(e) {
    e.preventDefault();

    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    let newTask = {descricao:task.value, completed: false};

    if(task.value.trim() === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill in the empty field!",
        });
        return;
    }

    taskList.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    
    task.value = '';
    task.focus();

    loadTasks();
}

form_todo_list.addEventListener('submit', AddTodo);
document.addEventListener('DOMContentLoaded', loadTasks);