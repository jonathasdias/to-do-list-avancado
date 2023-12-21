import filterTasks from './taskFilter.js';
const container_tasks = document.getElementById('container-tasks');
const form_todo_list = document.getElementById('form-todo-list');
const task = document.getElementById('input-add-task');
const form_edit  = document.getElementById('form-edit');

function todo({descricao, completed}, index) {
    const article = document.createElement('article');
    article.classList = `task ${completed? 'task-completed':''}`;

    const div = document.createElement('div');
    div.className = "container-btns-edit";

    const btn_edit = document.createElement('button');
    btn_edit.title = "Edit";
    btn_edit.innerHTML = '<i class="fa-solid fa-pencil"></i>';
    btn_edit.onclick = ()=> edit(index);

    const btn_complete = document.createElement('button');
    btn_complete.title = "Complete";
    btn_complete.innerHTML = '<i class="fa-regular fa-bookmark"></i>';
    btn_complete.onclick = ()=> isCompleted(index);

    const btn_delete = document.createElement('button');
    btn_delete.title = "Delete";
    btn_delete.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    btn_delete.onclick = ()=> del(index);

    const p = document.createElement('p');
    p.className = "descricao";
    p.innerHTML = descricao;


    div.appendChild(btn_edit)
    div.appendChild(btn_complete)
    div.appendChild(btn_delete)
    article.appendChild(div)
    article.appendChild(p)

    return article;
}

function edit(index) {
    let task_list = JSON.parse(localStorage.getItem('tasks')) || [];
    let btn_cancel = document.getElementById('btn-cancel');
    let input_edit = document.getElementById('input-edit-description');

    form_edit.style.setProperty('display', 'grid')
    input_edit.value = task_list[index].descricao;
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
        task_list[index].descricao = input_edit.value;
        saveTasksToLocalStorage(task_list);
        form_edit.style.setProperty('display', 'none');
        loadTasks()
    })
    
    btn_cancel.addEventListener('click', (e)=> {
        e.preventDefault();
        form_edit.style.setProperty('display', 'none');
    })
}

function isCompleted(index) {
    let task_list = JSON.parse(localStorage.getItem('tasks')) || [];

    task_list[index].completed = !task_list[index].completed;

    saveTasksToLocalStorage(task_list);

    loadTasks()
}

function del(index) {
    let task_list = JSON.parse(localStorage.getItem('tasks')) || [];

    task_list.splice(index, 1);

    saveTasksToLocalStorage(task_list);

    loadTasks()
}

function loadTasks() {
    let task_list = JSON.parse(localStorage.getItem('tasks')) || [];
    
    container_tasks.innerHTML = '';

    task_list.forEach((task,index) => {
        container_tasks.appendChild(todo(task,index));
    });
    filterTasks();
}

function AddTodo(e) {
    e.preventDefault();

    let task_list = JSON.parse(localStorage.getItem('tasks')) || [];
    let newTask = {descricao:task.value, completed: false};

    if(task.value.trim() === '') {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fill in the empty field!",
        });
        return;
    }

    task_list.unshift(newTask);
    saveTasksToLocalStorage(task_list);
    
    task.value = '';
    task.focus();

    loadTasks();
}

function saveTasksToLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

form_todo_list.addEventListener('submit', AddTodo);
document.addEventListener('DOMContentLoaded', loadTasks);