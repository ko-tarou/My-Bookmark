document.addEventListener('DOMContentLoaded', () => {
    const bookmarkButton = document.getElementById('bookmark-button');
    const todoButton = document.getElementById('todo-button');
    const gridContainer = document.getElementById('grid-container');
    const todoContainer = document.getElementById('todo-container');
    const body = document.body;

    const bookmarkColor = "#d3d3d3";
    const todoColor = "#625e5e";

    const changePage = (showGrid, navColor) => {
        gridContainer.style.display = showGrid ? 'block' : 'none';
        todoContainer.style.display = showGrid ? 'none' : 'block';
        body.style.backgroundColor = navColor;
    };

    bookmarkButton.addEventListener('click', () => changePage(true, bookmarkColor));
    todoButton.addEventListener('click', () => changePage(false, todoColor));

    changePage(true, bookmarkColor); // 初期表示をBookmarkに設定
});
