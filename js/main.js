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
        todoContainer.style.display = showGrid ? 'none' : 'flex';
        body.style.backgroundColor = navColor;
    };

    const updateAriaPressed = (buttonToActivate, buttonToDeactivate) => {
        buttonToActivate.setAttribute('aria-pressed', 'true');
        buttonToDeactivate.setAttribute('aria-pressed', 'false');
    };

    const updateButtonState = (activeButton, inactiveButton) => {
        activeButton.disabled = true;
        inactiveButton.disabled = false;
    };

    const initializePage = () => {
        changePage(true, bookmarkColor);
        updateAriaPressed(bookmarkButton, todoButton);
        updateButtonState(bookmarkButton, todoButton);
    };

    bookmarkButton.addEventListener('click', () => {
        changePage(true, bookmarkColor);
        updateAriaPressed(bookmarkButton, todoButton);
        updateButtonState(bookmarkButton, todoButton);
    });

    todoButton.addEventListener('click', () => {
        changePage(false, todoColor);
        updateAriaPressed(todoButton, bookmarkButton);
        updateButtonState(todoButton, bookmarkButton);
    });

    initializePage();
});
