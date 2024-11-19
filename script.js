document.addEventListener('DOMContentLoaded', () => {
    const bookmarkButton = document.getElementById('bookmark-button');
    const todoButton = document.getElementById('todo-button');
    const navBar = document.getElementById('nav-bar');
    const gridContainer = document.getElementById('grid-container');
    const todoContainer = document.getElementById('todo-container');
    const body = document.body;

    // ページごとの色
    const bookmarkColor = "#d3d3d3"; // Bookmarkのヘッダー背景
    const todoColor = "#625e5e"; // ToDoのヘッダー背景
    const bookmarkBgColor = "#d3d3d3"; // Bookmarkの背景
    const todoBgColor = "#625e5e"; // ToDoの背景

    const changePage = (showGrid, navColor, bgColor) => {
        // 表示するコンテナの切り替え
        gridContainer.style.display = showGrid ? 'block' : 'none';
        todoContainer.style.display = showGrid ? 'none' : 'block';

        // 背景色とヘッダー色を同時に変更
        navBar.style.backgroundColor = navColor;
        body.style.backgroundColor = bgColor;
    };

    // Bookmarkページに切り替え
    bookmarkButton.addEventListener('click', () => {
        changePage(true, bookmarkColor, bookmarkBgColor);
    });

    // ToDoページに切り替え
    todoButton.addEventListener('click', () => {
        changePage(false, todoColor, todoBgColor);
    });

    // 初期状態をBookmarkに設定
    changePage(true, bookmarkColor, bookmarkBgColor);
});


document.addEventListener('DOMContentLoaded', () => {
    const bookmarkButton = document.getElementById('bookmark-button');
    const todoButton = document.getElementById('todo-button');
    const body = document.body;
    const gridContainer = document.getElementById('grid-container');
    const todoContainer = document.getElementById('todo-container');

    // Bookmarkページに切り替え
    bookmarkButton.addEventListener('click', () => {
        gridContainer.style.display = 'block';
        todoContainer.style.display = 'none';
        body.style.backgroundColor = '#d3d3d3'; // Bookmark用の背景色
    });

    // ToDoページに切り替え
    todoButton.addEventListener('click', () => {
        gridContainer.style.display = 'none';
        todoContainer.style.display = 'block';
        body.style.backgroundColor = '#625e5e'; // ToDo用の背景色
    });
});


//bookmark
document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const dialog = document.getElementById('dialog');
    const inputUrl = document.getElementById('input-url');
    const inputTitle = document.getElementById('input-title');
    const saveButton = document.getElementById('save-button');
    const cancelButton = document.getElementById('cancel-button');

    let currentSquare = null;
    let dragSrcEl = null;
    let gridData = JSON.parse(localStorage.getItem('gridData')) || [];

    const sectionNames = ['main', 'sub', 'work', 'study', 'ai', 'job', 'other', 'other'];

    sectionNames.forEach((sectionName, i) => {
        const titleRow = document.createElement('div');
        titleRow.classList.add('title-row');
        titleRow.textContent = sectionName;
        gridContainer.appendChild(titleRow);

        const rowGroup = document.createElement('div');
        rowGroup.classList.add('row-group');

        for (let j = 0; j < 6; j++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.dataset.index = i * 6 + j;
            square.setAttribute('draggable', 'true');

            const titleElement = document.createElement('div');
            titleElement.classList.add('title');
            titleElement.textContent = '';
            square.appendChild(titleElement);

            const plusButton = document.createElement('button');
            plusButton.classList.add('plus-button');
            plusButton.textContent = '+';
            plusButton.addEventListener('click', (event) => {
                event.stopPropagation();
                currentSquare = square;
                inputUrl.value = '';
                inputTitle.value = '';
                dialog.style.display = 'block';
            });
            square.appendChild(plusButton);

            // 新しく削除ボタンを追加
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.textContent = '×';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                const index = square.dataset.index;
                gridData[index] = null; // データを削除
                titleElement.textContent = ''; // タイトルを空に
                localStorage.setItem('gridData', JSON.stringify(gridData));
            });
            square.appendChild(deleteButton);

            // ドラッグ＆ドロップイベント
            square.addEventListener('dragstart', (e) => {
                dragSrcEl = square;
                e.dataTransfer.effectAllowed = 'move';
                e.dataTransfer.setData('text/html', square.innerHTML);
            });

            square.addEventListener('dragover', (e) => {
                if (e.preventDefault) {
                    e.preventDefault();
                }
                e.dataTransfer.dropEffect = 'move';
                return false;
            });

            square.addEventListener('drop', (e) => {
                if (e.stopPropagation) {
                    e.stopPropagation();
                }
                if (dragSrcEl !== square) {
                    const dragSrcIndex = dragSrcEl.dataset.index;
                    const dropTargetIndex = square.dataset.index;

                    const tempData = gridData[dragSrcIndex];
                    gridData[dragSrcIndex] = gridData[dropTargetIndex];
                    gridData[dropTargetIndex] = tempData;

                    const dragSrcTitle = dragSrcEl.querySelector('.title');
                    const dropTargetTitle = square.querySelector('.title');

                    [dragSrcTitle.textContent, dropTargetTitle.textContent] = [dropTargetTitle.textContent, dragSrcTitle.textContent];

                    localStorage.setItem('gridData', JSON.stringify(gridData));
                }
                return false;
            });

            square.addEventListener('click', () => {
                const index = square.dataset.index;
                const data = gridData[index];
                if (data && data.url) {
                    window.open(data.url, '_blank');
                }
            });

            rowGroup.appendChild(square);
        }

        gridContainer.appendChild(rowGroup);
    });

    gridData.forEach((item, index) => {
        if (item) {
            const square = gridContainer.querySelector(`[data-index='${index}']`);
            const titleElement = square.querySelector('.title');
            titleElement.textContent = item.title;
        }
    });

    saveButton.addEventListener('click', () => {
        const url = inputUrl.value;
        const title = inputTitle.value;
        if (currentSquare && url) {
            const index = currentSquare.dataset.index;
            gridData[index] = { url, title };
            const titleElement = currentSquare.querySelector('.title');
            titleElement.textContent = title;
            localStorage.setItem('gridData', JSON.stringify(gridData));
            dialog.style.display = 'none';
        }
    });

    cancelButton.addEventListener('click', () => {
        dialog.style.display = 'none';
    });
});



//todo
document.addEventListener('DOMContentLoaded', () => {
    const bookmarkButton = document.getElementById('bookmark-button');
    const todoButton = document.getElementById('todo-button');
    const gridContainer = document.getElementById('grid-container');
    const todoContainer = document.getElementById('todo-container');
    const todoList = document.getElementById('todo-list');
    const addTaskButton = document.getElementById('add-task-button');

    // ページ切り替えロジック
    bookmarkButton.addEventListener('click', () => {
        gridContainer.style.display = 'block';
        todoContainer.style.display = 'none';
    });

    todoButton.addEventListener('click', () => {
        gridContainer.style.display = 'none';
        todoContainer.style.display = 'block';
    });

    // ToDoリストのタスク追加ロジック
    addTaskButton.addEventListener('click', () => {
        const task = prompt('新しいタスクを入力してください:');
        if (task) {
            const listItem = document.createElement('li');
            listItem.textContent = task;

            // 削除ボタンを作成
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '×';
            deleteButton.style.marginLeft = '10px';
            deleteButton.addEventListener('click', () => {
                todoList.removeChild(listItem);
            });

            listItem.appendChild(deleteButton);
            todoList.appendChild(listItem);
        }
    });
});


