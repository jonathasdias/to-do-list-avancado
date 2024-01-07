const filter_options = document.getElementById('filter-options');
const search = document.getElementById('search');
export const arr_filter_tasks = [];

export default function filterTasks() {
    let el = filter_options;
    let tasks = document.querySelectorAll('.task');
    arr_filter_tasks.length = 0;

    search.value = '';
    
    tasks.forEach((task) => {
        if((el.value === 'complete') && task.classList.contains('task-completed')) {
            task.style.display = 'block';
            arr_filter_tasks.push(task);
        }else if((el.value === 'incomplete') && !task.classList.contains('task-completed')) {
            task.style.display = 'block';
            arr_filter_tasks.push(task);
        }else if(el.value === 'all'){
            task.style.display = 'block';
            arr_filter_tasks.push(task);
        }else {
            task.style.display = 'none';
        }
    });
}

filter_options.addEventListener('change', filterTasks);