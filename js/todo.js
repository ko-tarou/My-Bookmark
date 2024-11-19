document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const addTaskButton = document.getElementById('add-task-button');

    // ローカルストレージへの保存
    const saveTasks = () => {
        const tasks = Array.from(todoList.children).map(item => item.textContent.replace('×', '').trim());
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    // ローカルストレージからタスクをロード
    const loadTasks = () => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        savedTasks.forEach(task => addTaskToList(task));
    };

    // タスクリストにタスクを追加
    const addTaskToList = (task) => {
        const listItem = document.createElement('li');
        listItem.textContent = task;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '×';
        deleteButton.setAttribute('aria-label', 'タスクを削除');
        deleteButton.addEventListener('click', () => {
            todoList.removeChild(listItem);
            saveTasks();
        });

        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    };

    // タスク追加ボタンのイベント
    addTaskButton.addEventListener('click', () => {
        const task = prompt('新しいタスクを入力してください:').trim();
        if (task) {
            addTaskToList(task);
            saveTasks();
        } else {
            alert('有効なタスクを入力してください。');
        }
    });

    // ページロード時にタスクをロード
    loadTasks();
});
