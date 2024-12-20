document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskInput = document.getElementById('new-task-input');
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Kérlek, írj be valamit a mezőbe!");
    } else {
        const newTask = document.createElement('li');
        newTask.innerHTML = `<input type="checkbox"> ${taskText}`;
        document.getElementById('todo-items').appendChild(newTask);
        taskInput.value = ''; // Input mező ürítése
    }
});

document.getElementById('new-task-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('add-task-btn').click();
    }
});