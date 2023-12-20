const search = document.getElementById('search');

search.addEventListener('input', (e)=>{
    let el = e.target;
    let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
    let taskResearched = taskList.filter(item=> item.descricao.toUpperCase().includes(el.value.toUpperCase()))

    if(taskResearched) {
        container_tasks.innerHTML = '';
        taskResearched.forEach((task, index)=> {
            container_tasks.innerHTML += todo(task, index);
        })
    }else {
        loadTasks();
    }
})