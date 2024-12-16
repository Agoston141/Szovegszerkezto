describe('Task Manager', function() {
    let addTaskButton;
    let taskInput;
    let todoItems;

    beforeEach(function() {
        document.body.innerHTML = `
            <input id="new-task-input" type="text">
            <button id="add-task-btn">Add Task</button>
            <ul id="todo-items"></ul>
        `;
       
        addTaskButton = document.getElementById('add-task-btn');
        taskInput = document.getElementById('new-task-input');
        todoItems = document.getElementById('todo-items');

        addTaskButton.addEventListener('click', function() {
            const taskText = taskInput.value.trim();
            if (taskText !== "") {
                const newTask = document.createElement('li');
                newTask.innerHTML = `<input type="checkbox"> ${taskText}`;
                todoItems.appendChild(newTask);
                taskInput.value = '';
            }
        });

        taskInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTaskButton.click();
            }
        });
    });

    it('should add a task to the list when the button is clicked', function() {
        taskInput.value = 'Test Task';
        addTaskButton.click();
        expect(todoItems.children.length).toBe(1);
        expect(todoItems.children[0].textContent.trim()).toBe('Test Task');
    });

    it('should clear the input after adding a task', function() {
        taskInput.value = 'Another Task';
        addTaskButton.click();
        expect(taskInput.value).toBe('');
    });

    it('should not add a task if the input is empty', function() {
        taskInput.value = '  ';
        addTaskButton.click();
        expect(todoItems.children.length).toBe(0);
    });

    it('should add a task when Enter key is pressed', function() {
        taskInput.value = 'Enter Task';
        const event = new KeyboardEvent('keypress', { key: 'Enter' });
        taskInput.dispatchEvent(event);
        expect(todoItems.children.length).toBe(1);
        expect(todoItems.children[0].textContent.trim()).toBe('Enter Task');
    });
});
