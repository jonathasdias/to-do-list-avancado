import { arr_filter_tasks } from "./taskFilter.js";

const search = document.getElementById('search');

function searchTask(e) {
    let el = e.target;
    
    arr_filter_tasks.forEach(task=> {
        let description = task.querySelector('.description');
        let taskText = task.querySelector('.description').innerHTML.toLocaleLowerCase();

        if(taskText.includes(el.value.toLocaleLowerCase())) {
            description.parentNode.style.display = 'block';
        }else {
            description.parentNode.style.display = 'none';
        }
    })
}

search.addEventListener('input', searchTask);