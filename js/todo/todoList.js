function addTaskToList(todoList, taskText, dueDate = '期限未設定', saveCallback) {
    console.log('addTaskToList called with:', { taskText, dueDate, saveCallback });

    // 不正なタスク名は処理しない
    if (!taskText || typeof taskText !== 'string' || taskText.trim() === '') {
        console.warn('Invalid taskText passed to addTaskToList:', taskText);
        return;
    }

    // `dueDate` が文字列以外の型の場合は "期限未設定" にする
    if (typeof dueDate !== 'string') {
        console.warn('Invalid dueDate passed to addTaskToList, setting to "期限未設定":', dueDate);
        dueDate = '期限未設定';
    }

    const listItem = createElement('li', ['todo-item']);
    listItem.style.display = 'flex';
    listItem.style.flexDirection = 'column';

    const taskRow = createElement('div', [], '', { style: 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;' });
    const taskSpan = createElement('span', ['task-text'], taskText, { style: 'flex: 1;' });
    const deleteButton = createElement('button', ['delete-button'], '×', { 'aria-label': 'タスクを削除', style: 'margin-left: 10px;' });

    deleteButton.addEventListener('click', () => {
        console.log('Task deleted:', taskText);
        todoList.removeChild(listItem);
        saveCallback(); // 削除後の保存
    });

    taskRow.appendChild(taskSpan);
    taskRow.appendChild(deleteButton);

    const dueDateRow = createElement('div', [], '', { style: 'display: flex; justify-content: space-between; align-items: center;' });
    const dueDateSpan = createElement('span', ['due-date'], dueDate); // 初期値として期限を設定
    const setDateButton = createElement('button', ['set-date-button'], '📅', { 'aria-label': '期限を設定', style: 'margin-left: 10px;' });

    setDateButton.addEventListener('click', () => {
        const datePicker = createElement('input', [], '', { type: 'date', style: 'position: absolute; left: 0; z-index: 1000;' });
        listItem.appendChild(datePicker);
        datePicker.focus();

        datePicker.addEventListener('change', () => {
            const selectedDate = datePicker.value;
            console.log('Date selected:', selectedDate);
            if (selectedDate) {
                dueDateSpan.textContent = selectedDate;
                saveCallback(); // 日付設定後の保存
            }
            listItem.removeChild(datePicker);
        });

        datePicker.addEventListener('blur', () => {
            if (listItem.contains(datePicker)) {
                listItem.removeChild(datePicker);
            }
        });
    });

    dueDateRow.appendChild(dueDateSpan);
    dueDateRow.appendChild(setDateButton);

    listItem.appendChild(taskRow);
    listItem.appendChild(dueDateRow);

    todoList.appendChild(listItem);
    console.log('Task added to list:', { taskText, dueDate });
}

function saveTasks(todoList, storageKey) {
    console.log('saveTasks called with:', { todoList, storageKey });

    const tasks = Array.from(todoList.querySelectorAll('.todo-item')).map(item => {
        const taskTextElement = item.querySelector('.task-text');
        const dueDateElement = item.querySelector('.due-date');

        if (!taskTextElement || !dueDateElement) {
            console.warn('Missing elements in task item, skipping:', item);
            return null;
        }

        const taskText = taskTextElement.textContent.trim();
        const dueDate = dueDateElement.textContent.trim();

        console.log('saveTasks: Task details:', { taskText, dueDate });

        if (!taskText) {
            console.warn('Invalid taskText, skipping:', { taskText, dueDate });
            return null;
        }

        return `${taskText}:${dueDate === '期限未設定' ? '' : dueDate}`;
    }).filter(Boolean); // 無効なタスクを除外

    console.log('saveTasks: Data to save:', tasks.join('|'));
    saveToStorage(storageKey, tasks.join('|'));
}

function loadTasks(todoList, storageKey, addTaskCallback) {
    const data = loadFromStorage(storageKey, ''); // デフォルト値を空文字列に設定
    console.log('loadTasks: Raw data from storage:', data);

    if (data) {
        const tasks = data.split('|'); // タスクを '|' で分割
        console.log('loadTasks: Split tasks:', tasks);

        tasks.forEach(task => {
            if (task.trim() !== '') {
                const [taskText, dueDate] = task.split(':'); // ':' でタスク名と期限を分割
                console.log('loadTasks: Task details:', { taskText, dueDate });

                // 不正なデータを検出してスキップ
                if (!taskText || typeof taskText !== 'string' || taskText.trim() === '') {
                    console.warn('Invalid taskText, skipping:', task);
                    return;
                }

                // `dueDate` が空の場合は "期限未設定" にする
                const validDueDate = dueDate?.trim() || '期限未設定';

                // 正しいデータをタスクリストに追加
                addTaskCallback(todoList, taskText.trim(), validDueDate, () => saveTasks(todoList, storageKey));
            }
        });
    }
}

