const filter_options = document.getElementById('filter-options');

export default function filterTasks() {
    let el = filter_options;
    let tasks = document.querySelectorAll('.task');
    
    tasks.forEach((task) => {
        if((el.value === 'complete') && task.classList.contains('task-completed')) {
            task.style.display = 'block';
        }else if((el.value === 'incomplete') && !task.classList.contains('task-completed')) {
            task.style.display = 'block';
        }else if(el.value === 'all'){
            task.style.display = 'block';
        }else {
            task.style.display = 'none';
        }
    });
}

filter_options.addEventListener('change', filterTasks);