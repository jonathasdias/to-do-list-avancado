const search = document.getElementById('search');

function searchTask(e) {
    let el = e.target;
    let descricoes = document.querySelectorAll('.descricao');
    
    descricoes.forEach(descricao=> {
        let taskText = descricao.innerHTML.toLocaleLowerCase();

        if(taskText.includes(el.value.toLocaleLowerCase())) {
           descricao.parentNode.style.display = 'block';
        }else {
            descricao.parentNode.style.display = 'none';
        }
    })
}

search.addEventListener('input', searchTask);