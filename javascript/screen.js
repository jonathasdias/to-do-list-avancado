const container_todo = document.getElementById('todo-list');

function enableFullScreen() {
    if (container_todo.requestFullscreen) {
        container_todo.requestFullscreen();
    } else if (container_todo.webkitRequestFullscreen) {
        container_todo.webkitRequestFullscreen();
    } else if (container_todo.msRequestFullscreen) {
        container_todo.msRequestFullscreen();
    }
}

function disablefullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

document.querySelector('#btn-enlarge-screen').addEventListener('click', enableFullScreen);
document.querySelector('#btn-minimize-screen').addEventListener('click', disablefullscreen);