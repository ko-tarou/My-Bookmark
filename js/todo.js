document.addEventListener('DOMContentLoaded', () => {
    const todoBoxes = document.querySelectorAll('.todo-box'); // すべてのtodo-boxを取得

    todoBoxes.forEach((box, index) => {
        const todoList = box.querySelector('.todo-list'); // 対応するリストを取得
        const addTaskButton = box.querySelector('.plus-button'); // 対応するボタンを取得
        const titleElement = box.querySelector('.todo-title'); // タイトル要素を取得
        const storageKey = `todo-box-${index + 1}`; // タスク用のローカルストレージキー
        const titleStorageKey = `todo-title-${index + 1}`; // タイトル用のローカルストレージキー

        // ローカルストレージからタスクをロード
        const loadTasks = () => {
            // ストレージからタスクを取得
            const savedTasks = JSON.parse(localStorage.getItem(storageKey)) || [];
            savedTasks.forEach(task => {
                // 保存されたオブジェクトから `text` と `dueDate` を渡してタスクを追加
                addTaskToList(task.text, task.dueDate);
            });
        };

        // タスクをローカルストレージに保存
        const saveTasks = () => {
            // 現在のリストからタスクデータを収集し、ローカルストレージに保存
            const tasks = Array.from(todoList.querySelectorAll('.todo-item')).map(item => ({
                text: item.querySelector('.task-text').textContent, // タスク名
                dueDate: item.querySelector('.due-date').textContent.replace('期限: ', '') // 期限
            }));
            localStorage.setItem(storageKey, JSON.stringify(tasks)); // ローカルストレージに保存
        };

        // タスクをリストに追加する共通関数
        const addTaskToList = (taskText, dueDate = '') => {
            const listItem = document.createElement('li'); // タスク要素を作成
            listItem.classList.add('todo-item'); // クラスを追加してスタイリング対応
            listItem.style.display = 'flex';
            listItem.style.flexDirection = 'column'; // タスクと期限を上下に配置

            // タスク名と削除ボタンの行
            const taskRow = document.createElement('div');
            taskRow.style.display = 'flex';
            taskRow.style.justifyContent = 'space-between';
            taskRow.style.alignItems = 'center';
            taskRow.style.marginBottom = '5px';

            const taskSpan = document.createElement('span');
            taskSpan.textContent = taskText;
            taskSpan.classList.add('task-text'); // テキスト用クラス
            taskSpan.style.flex = '1'; // テキスト部分を伸縮可能に設定

            const deleteButton = document.createElement('button');
            deleteButton.textContent = '×'; // 削除ボタンのラベル
            deleteButton.classList.add('delete-button'); // クラスを追加
            deleteButton.setAttribute('aria-label', 'タスクを削除');
            deleteButton.style.marginLeft = '10px';

            // 削除ボタンのクリックイベント
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(listItem); // タスクアイテムをリストから削除
                saveTasks(); // ローカルストレージを更新
            });

            taskRow.appendChild(taskSpan);
            taskRow.appendChild(deleteButton);

            // 期限と期限ボタンの行
            const dueRow = document.createElement('div');
            dueRow.style.display = 'flex';
            dueRow.style.justifyContent = 'space-between';
            dueRow.style.alignItems = 'center';

            const dueDateElement = document.createElement('span');
            dueDateElement.textContent = dueDate ? `${dueDate}` : '期限未設定';
            dueDateElement.classList.add('due-date');

            const setDateButton = document.createElement('button');
            setDateButton.textContent = '📅'; // カレンダーアイコン
            setDateButton.classList.add('set-date-button');
            setDateButton.setAttribute('aria-label', '期限を設定');
            setDateButton.style.marginLeft = '10px';

            // 期限設定ボタンのクリックイベント
            setDateButton.addEventListener('click', () => {
                const datePicker = document.createElement('input');
                datePicker.type = 'date'; // 日付入力用
                datePicker.style.position = 'absolute'; // カレンダーを表示位置に配置
                datePicker.style.left = '0';
                datePicker.style.zIndex = '1000';
                listItem.appendChild(datePicker); // 一時的にリストアイテムに追加

                datePicker.focus(); // カレンダーを開く

                datePicker.addEventListener('change', () => {
                    const selectedDate = datePicker.value; // 選択された日付を取得
                    dueDateElement.textContent = `${selectedDate}`;
                    listItem.removeChild(datePicker); // カレンダーを削除
                    saveTasks(); // ローカルストレージを更新
                });

                datePicker.addEventListener('blur', () => {
                    if (listItem.contains(datePicker)) {
                        listItem.removeChild(datePicker);
                    }
                });
            });

            dueRow.appendChild(dueDateElement);
            dueRow.appendChild(setDateButton);

            // タスクアイテムに行を追加
            listItem.appendChild(taskRow);
            listItem.appendChild(dueRow);

            // タスクをリストに追加
            todoList.appendChild(listItem);
        };

        // タイトルを編集可能にする
        titleElement.addEventListener('click', () => {
            const newTitle = prompt(`新しいタイトルを入力してください (Box ${index + 1}):`, titleElement.textContent);
            if (newTitle !== null) {
                titleElement.textContent = newTitle.trim();
                localStorage.setItem(titleStorageKey, titleElement.textContent);
            }
        });

        // 新しいタスクを追加
        addTaskButton.addEventListener('click', () => {
            const task = prompt(`新しいタスクを入力してください (Box ${index + 1}):`).trim();
            if (task) {
                addTaskToList(task);
                saveTasks(); // ローカルストレージを更新
            } else {
                alert('有効なタスクを入力してください。');
            }
        });

        // ページ読み込み時にタスクとタイトルをロード
        loadTasks();
        const savedTitle = localStorage.getItem(titleStorageKey);
        if (savedTitle) titleElement.textContent = savedTitle;
    });
});
