let add_tarefas = document.getElementById('add-tarefas');
let input_tarefa = document.getElementById('input-tarefa');
let btn_add = document.getElementById('btn-add');
let campoVazioElement = document.getElementsByClassName('alertaCampoVazio')[0];
let barra = document.getElementsByClassName('barra')[0];

function criacaoTarefas(){
    let tarefa = document.createElement('div');
    tarefa.className = 'tarefa'

    let tarefa_descricao = document.createElement('p');
    tarefa_descricao.className = 'tarefa-descricao'
    tarefa_descricao.innerHTML = input_tarefa.value;

    let btn_remove = document.createElement('button');
    btn_remove.className = 'btn-remove';
    btn_remove.innerHTML = '&#10006;';
    btn_remove.title = 'Remover Tarefa'

    let btn_concluido = document.createElement('button');
    btn_concluido.className = 'btn-concluido'
    btn_concluido.innerHTML = '&#10084;'
    btn_concluido.title = 'Concluir Tarefa?'

    let btn_editar = document.createElement('button');
    btn_editar.className = 'btn-editar'
    btn_editar.innerHTML = '&#10000;'
    btn_editar.title = 'Editar Tarefa'

    tarefa.appendChild(btn_remove);
    tarefa.appendChild(btn_concluido);
    tarefa.appendChild(btn_editar);
    tarefa.appendChild(tarefa_descricao);
    add_tarefas.appendChild(tarefa);
}

function tarefaConcluida(elClick,elPai){
    elClick.classList.toggle('tarefa-concluida')

    if(elClick.title == 'Concluir Tarefa?'){
        elClick.title = 'Desmarca Tarefa Concluida?'
        elPai.setAttribute('style','background-color:blue;')
        elPai.childNodes[3].setAttribute('style','text-decoration: line-through; color:white;')
    }else {
        elClick.title = 'Concluir Tarefa?'
        elPai.removeAttribute('style')
        elPai.childNodes[3].removeAttribute('style')
    }
}

function edicaoTarefa(elClick,elPai) {
    elClick.setAttribute('hidden','hidden')

    let tarefa_descricao = elPai.childNodes[3]

    let dv_aditar = document.createElement('div')
    dv_aditar.className = 'dv-editar'

    let inputEdit = document.createElement('input')
    inputEdit.className = 'input-edit'
    inputEdit.value = tarefa_descricao.innerHTML

    let btn_salvar = document.createElement('button')
    btn_salvar.className = 'btn-salvar'
    btn_salvar.innerHTML = '&#10004;'

    let btn_cancelar_edicao = document.createElement('button')
    btn_cancelar_edicao.className = 'btn-cancelar-edicao'
    btn_cancelar_edicao.innerHTML = 'Cancelar'

    dv_aditar.appendChild(inputEdit)
    dv_aditar.appendChild(btn_salvar)
    dv_aditar.appendChild(btn_cancelar_edicao)
    elPai.appendChild(dv_aditar)

    
    btn_salvar.addEventListener('click', ()=>{
        tarefa_descricao.innerHTML = inputEdit.value
        dv_aditar.remove()
        elClick.removeAttribute('hidden')
    });

    btn_cancelar_edicao.addEventListener('click', ()=>{
        dv_aditar.remove()
        elClick.removeAttribute('hidden')
    });
}

function alertaCampoVazio(){
    campoVazioElement.classList.remove('esconder')
    barra.classList.add('animacao-barra')
    btn_add.setAttribute('disabled', 'disabled')
    input_tarefa.focus()
    setTimeout(() => {
        campoVazioElement.classList.add('esconder')
        barra.classList.remove('animacao-barra')
        btn_add.removeAttribute('disabled')
    }, 5000)
}

btn_add.addEventListener('click', ()=>{
    if(input_tarefa.value.length < 1){
        alertaCampoVazio()
    }else {
        criacaoTarefas();
        input_tarefa.value = ''
        input_tarefa.focus()
    }
});

add_tarefas.addEventListener('click', (e)=>{
    let elClick = e.target
    let elPai = elClick.parentNode

    if(elClick.classList.contains("btn-remove")){
        elPai.remove()
    }else if(elClick.classList.contains("btn-concluido")){
        tarefaConcluida(elClick,elPai)
    }else if(elClick.classList.contains("btn-editar")){
        edicaoTarefa(elClick,elPai)
    }
});