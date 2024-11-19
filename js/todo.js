document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const addTaskButton = document.getElementById('add-task-button');

    addTaskButton.addEventListener('click', () => {
        const task = prompt('新しいタスクを入力してください:');
        if (task) {
            const listItem = document.createElement('li');
            listItem.textContent = task;

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '×';
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(listItem);
            });

            listItem.appendChild(deleteButton);
            todoList.appendChild(listItem);
        }
    });
});
