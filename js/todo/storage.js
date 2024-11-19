function loadFromStorage(key, defaultValue = '') {
    const data = localStorage.getItem(key);
    return data !== null ? data : defaultValue; // データがない場合はデフォルト値を返す
}

function saveToStorage(key, value) {
    localStorage.setItem(key, value); // そのまま文字列を保存
}
