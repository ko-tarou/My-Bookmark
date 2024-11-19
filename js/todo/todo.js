document.addEventListener('DOMContentLoaded', () => {
    const todoBoxes = document.querySelectorAll('.todo-box');

    todoBoxes.forEach((box, index) => {
        const todoList = box.querySelector('.todo-list');
        const addTaskButton = box.querySelector('.plus-button');
        const titleElement = box.querySelector('.todo-title');

        const storageKey = `todo-box-${index + 1}`;
        const titleStorageKey = `todo-title-${index + 1}`;

        // 初期化: タスクリストをロード
        loadTasks(todoList, storageKey, addTaskToList);

        // タイトルの初期化
        const savedTitle = loadFromStorage(titleStorageKey, `Box ${index + 1}`);
        titleElement.textContent = savedTitle;

        // タスク追加ボタン
        addTaskButton.addEventListener('click', () => {
            const taskText = promptForValue(`新しいタスクを入力してください (Box ${index + 1}):`);
            if (taskText) {
                addTaskToList(todoList, taskText, () => saveTasks(todoList, storageKey));
                saveTasks(todoList, storageKey);
            } else {
                alert('有効なタスクを入力してください。');
            }
        });

        // タイトルの編集
        titleElement.addEventListener('click', () => {
            const newTitle = promptForValue(`新しいタイトルを入力してください (Box ${index + 1}):`, titleElement.textContent);
            if (newTitle !== null) {
                titleElement.textContent = newTitle;
                saveToStorage(titleStorageKey, newTitle);
            }
        });
    });
});
