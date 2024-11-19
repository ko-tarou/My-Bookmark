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
            const savedTasks = JSON.parse(localStorage.getItem(storageKey)) || [];
            savedTasks.forEach(task => {
                addTaskToList(task);
            });
        };

        // ローカルストレージからタイトルをロード
        const loadTitle = () => {
            const savedTitle = localStorage.getItem(titleStorageKey);
            if (savedTitle) {
                titleElement.textContent = savedTitle;
            }
        };

        // タスクをローカルストレージに保存
        const saveTasks = () => {
            const tasks = Array.from(todoList.querySelectorAll('.todo-item span')).map(span => span.textContent);
            localStorage.setItem(storageKey, JSON.stringify(tasks));
        };

        // タイトルをローカルストレージに保存
        const saveTitle = () => {
            localStorage.setItem(titleStorageKey, titleElement.textContent);
        };

        // タスクをリストに追加する共通関数
        const addTaskToList = (task) => {
            const listItem = document.createElement('li'); // タスク要素を作成
            listItem.classList.add('todo-item'); // クラスを追加してスタイリング対応

            // タスク名をテキスト部分として追加
            const taskText = document.createElement('span');
            taskText.textContent = task;
            taskText.style.flex = '1'; // テキスト部分を伸縮可能に設定

            // 削除ボタンを作成
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '×'; // 削除ボタンのラベル
            deleteButton.classList.add('delete-button'); // クラスを追加
            deleteButton.setAttribute('aria-label', 'タスクを削除');

            // 削除ボタンのクリックイベント
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(listItem); // タスクアイテムをリストから削除
                saveTasks(); // ローカルストレージを更新
            });

            // タスクアイテムにテキストと削除ボタンを追加
            listItem.appendChild(taskText);
            listItem.appendChild(deleteButton);

            // タスクをリストに追加
            todoList.appendChild(listItem);
        };

        // タイトルを編集可能にする
        titleElement.addEventListener('click', () => {
            const newTitle = prompt(`新しいタイトルを入力してください (Box ${index + 1}):`, titleElement.textContent);
            if (newTitle !== null) {
                titleElement.textContent = newTitle.trim();
                saveTitle(); // ローカルストレージを更新
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
        loadTitle();
    });
});
