// タスクをリストに追加
function addTaskToList(todoList, taskText, dueDate = '', saveCallback) {
    const listItem = createElement('li', ['todo-item']);
    listItem.style.display = 'flex';
    listItem.style.flexDirection = 'column';

    // タスク名と削除ボタンの行
    const taskRow = createElement('div', [], '', { style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;' });
    const taskSpan = createElement('span', ['task-text'], taskText, { style: 'flex: 1;' });
    const deleteButton = createElement('button', ['delete-button'], '×', { 'aria-label': 'タスクを削除', style: 'margin-left: 10px;' });

    deleteButton.addEventListener('click', () => {
        todoList.removeChild(listItem);
        saveCallback(); // タスクを保存
    });

    taskRow.appendChild(taskSpan);
    taskRow.appendChild(deleteButton);

    // 期限の表示と設定ボタンの行
    const dueRow = createElement('div', [], '', { style: 'display: flex; justify-content: space-between; align-items: center;' });
    const dueDateElement = createElement('span', ['due-date'], dueDate || '期限未設定');
    const setDateButton = createElement('button', ['set-date-button'], '📅', { 'aria-label': '期限を設定', style: 'margin-left: 10px;' });

    setDateButton.addEventListener('click', () => {
        const datePicker = createElement('input', [], '', { type: 'date', style: 'position: absolute; left: 0; z-index: 1000;' });
        listItem.appendChild(datePicker);
        datePicker.focus();

        datePicker.addEventListener('change', () => {
            dueDateElement.textContent = datePicker.value;
            listItem.removeChild(datePicker);
            saveCallback(); // 保存を呼び出す
        });

        datePicker.addEventListener('blur', () => {
            if (listItem.contains(datePicker)) {
                listItem.removeChild(datePicker);
            }
        });
    });

    dueRow.appendChild(dueDateElement);
    dueRow.appendChild(setDateButton);

    listItem.appendChild(taskRow);
    listItem.appendChild(dueRow);

    todoList.appendChild(listItem);
}

// タスクリストを保存
function saveTasks(todoList, storageKey) {
    const tasks = Array.from(todoList.querySelectorAll('.todo-item')).map(item => {
        const taskText = item.querySelector('.task-text').textContent;
        const dueDate = item.querySelector('.due-date').textContent === '期限未設定'
            ? '' // 日付未設定の場合は空文字
            : item.querySelector('.due-date').textContent;
        return `${taskText}|${dueDate}`;
    });
    saveToStorage(storageKey, tasks.join('||')); // '||' で区切って保存
}

// タスクリストをロード
function loadTasks(todoList, storageKey, addTaskCallback) {
    const data = loadFromStorage(storageKey, ''); // デフォルト値は空文字列
    if (data) {
        const tasks = data.split('||'); // '||' でタスクを分割
        tasks.forEach(task => {
            const [taskText, dueDate] = task.split('|'); // タスク名と日付を分割
            if (taskText.trim() !== '') { // 空のタスクを無視
                addTaskCallback(todoList, taskText, dueDate, () => saveTasks(todoList, storageKey));
            }
        });
    }
}
