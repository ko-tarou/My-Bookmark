// 汎用的なDOM要素を作成する関数
function createElement(tag, classNames = [], textContent = '', attributes = {}) {
    const element = document.createElement(tag);
    classNames.forEach(cls => element.classList.add(cls));
    if (textContent) element.textContent = textContent;
    Object.keys(attributes).forEach(key => element.setAttribute(key, attributes[key]));
    return element;
}

// プロンプトで値を取得
function promptForValue(message, defaultValue = '') {
    const value = prompt(message, defaultValue);
    return value ? value.trim() : null;
}
