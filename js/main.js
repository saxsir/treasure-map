/*
 * グローバル変数の定義
 */
var ansX, ansY;
var row = 4, col = 4; // フィールドの大きさを定義

// bodyの最後まで読み込み終わったら呼ばれる関数
window.onload = function() {
  // マップ（テーブル）を初期化
  var field = document.getElementById('field');
  init(field);
};

/*
 * ゲームを初期化する関数
 */
function init(table) {
  // フィールドを描画
  for (var i=0; i<col; i++) {
    var tr = document.createElement('tr');
    for (var j=0; j<row; j++) {
      var td = document.createElement('td');
      // この要素がクリックされた時に呼ばれる関数
      td.setAttribute('onclick', 'judge('+j+','+i+', this);');
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }

  // 宝の位置を決める
  ansX = Math.floor((Math.random() * row)),
  ansY = Math.floor((Math.random() * col));

  console.log(ansX, ansY);
}

/*
 * クリックされた時に呼ばれる関数
 */
function judge(x, y, self) {
  if (hitTreasure(x, y) === true) {
    completeGame(self);
  }
  else {
    showHint(x, y);
  }
}

/*
 * クリックされた場所に宝があるか判定する関数
 */
function hitTreasure(x, y) {
  if (x === ansX && y === ansY) {
    return true;
  }
  return false;
}

/*
 * ゲームをクリアした時に呼ばれる関数
 */
function completeGame(self) {
  // 宝があった場所を赤く塗りつぶす
  self.setAttribute('style', 'background-color:rgb(255,0,0);');
  alert('ゲームクリア！');

  // クリアしたらどうしよう
}

/*
 * 宝の位置のヒントを出す関数
 */
function showHint(x, y) {
  var distance = Math.abs(ansX - x) + Math.abs(ansY - y);
  alert('あと' + distance + 'マス離れてるよ！');
}