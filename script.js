document.addEventListener("DOMContentLoaded", function() {
    // ローカルストレージから入力データを復元
    const savedNum1 = localStorage.getItem("num1");
    const savedNum2 = localStorage.getItem("num2");
    const savedMultiplier1 = localStorage.getItem("multiplier1");
    const savedMultiplier2 = localStorage.getItem("multiplier2");

    if (savedNum1 !== null) {
        document.getElementById("num1").value = savedNum1;
    }
    if (savedNum2 !== null) {
        document.getElementById("num2").value = savedNum2;
    }
    if (savedMultiplier1 !== null) {
        document.getElementById("multiplier1").value = savedMultiplier1;
    }
    if (savedMultiplier2 !== null) {
        document.getElementById("multiplier2").value = savedMultiplier2;
    }

    // ページ読み込み時にプレビューを更新
    updatePreview();
});

function saveInput() {
    const num1 = document.getElementById("num1").value;
    const num2 = document.getElementById("num2").value;
    const multiplier1 = document.getElementById("multiplier1").value;
    const multiplier2 = document.getElementById("multiplier2").value;

    // ローカルストレージに保存
    localStorage.setItem("num1", num1);
    localStorage.setItem("num2", num2);
    localStorage.setItem("multiplier1", multiplier1);
    localStorage.setItem("multiplier2", multiplier2);
}

function updatePreview() {
    const num1 = Math.floor(parseFloat(document.getElementById("num1").value) || 0); // 小数点以下切り捨て
    const num2 = Math.floor(parseFloat(document.getElementById("num2").value) || 0); // 小数点以下切り捨て
    const multiplier1 = parseFloat(document.getElementById("multiplier1").value) || 1; // 小数も反映
    const multiplier2 = parseFloat(document.getElementById("multiplier2").value) || 1; // 小数も反映

    const modifiedNum1 = Math.floor(num1 * multiplier1); // 結果は整数に切り捨て
    const modifiedNum2 = Math.floor(num2 * multiplier2); // 結果は整数に切り捨て

    const larger = Math.max(modifiedNum1, modifiedNum2);
    const smaller = Math.min(modifiedNum1, modifiedNum2);
    const result = Math.floor(larger - (Math.floor(smaller / 2))); // 結果は整数に切り捨て

    // 結果を表示
    document.getElementById("result-text").textContent = `結果: ${result}`;

    // 入力データを保存
    saveInput();
}

function clearAll() {
    document.getElementById("num1").value = "";
    document.getElementById("num2").value = "";
    document.getElementById("multiplier1").value = "1";
    document.getElementById("multiplier2").value = "1";

    // ローカルストレージのデータもクリア
    localStorage.removeItem("num1");
    localStorage.removeItem("num2");
    localStorage.removeItem("multiplier1");
    localStorage.removeItem("multiplier2");

    // プレビューもクリア
    document.getElementById("result-text").textContent = "結果: ";
}

function copyToClipboard() {
    const resultText = document.getElementById("result-text").textContent.split(": ")[1];
    
    if (resultText) {
        // クリップボードにコピー
        navigator.clipboard.writeText(resultText).then(() => {
            alert("結果がクリップボードにコピーされました");
        }).catch(err => {
            alert("クリップボードへのコピーに失敗しました");
        });
    } else {
        alert("計算を行ってからコピーしてください");
    }
}
