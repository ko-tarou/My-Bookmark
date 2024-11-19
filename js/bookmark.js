document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.getElementById('grid-container');
    const dialog = document.getElementById('dialog');
    const inputUrl = document.getElementById('input-url');
    const inputTitle = document.getElementById('input-title');
    const saveButton = document.getElementById('save-button');
    const cancelButton = document.getElementById('cancel-button');

    let currentSquare = null;
    let gridData = JSON.parse(localStorage.getItem('gridData')) || [];

    const sectionNames = ['main', 'sub', 'work', 'study', 'ai', 'job', 'other', 'other'];

    // グリッドを初期化する関数
    const initializeGrid = () => {
        sectionNames.forEach((name, i) => {
            const titleRow = document.createElement('div');
            titleRow.classList.add('title-row');
            titleRow.textContent = name;
            gridContainer.appendChild(titleRow);

            const rowGroup = document.createElement('div');
            rowGroup.classList.add('row-group');

            for (let j = 0; j < 6; j++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.dataset.index = i * 6 + j;

                // データがある場合、表示を更新
                const index = i * 6 + j;
                if (gridData[index]) {
                    const titleElement = document.createElement('div');
                    titleElement.classList.add('title');
                    titleElement.textContent = gridData[index].title || '';
                    square.appendChild(titleElement);
                }

                // イベントリスナーを設定
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
    };

    // 保存ボタンの処理
    saveButton.addEventListener('click', () => {
        const url = inputUrl.value;
        const title = inputTitle.value;
        if (currentSquare && url) {
            const index = currentSquare.dataset.index;
            gridData[index] = { url, title };
            localStorage.setItem('gridData', JSON.stringify(gridData));
            currentSquare.querySelector('.title').textContent = title;
            dialog.style.display = 'none';
        }
    });

    cancelButton.addEventListener('click', () => {
        dialog.style.display = 'none';
    });

    // 初期化処理
    initializeGrid();
});
