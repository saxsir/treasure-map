/*
 * グローバル変数の定義
 */
var ansX, ansY;
var row = 4, col = 4; // フィールドの大きさを定義

// bodyの最後まで読み込み終わったら呼ばれる
window.onload = function() {
  // フィールド（テーブル）を初期化
  var table = document.getElementById('field');
  initField(table);

  // 宝を埋める
  var x = Math.floor((Math.random() * row)),
      y = Math.floor((Math.random() * col));
  buryTreasure(x, y);
};

function initField(table) {
  // フィールドを描画
  for (var y=0; y<col; y++) {
    var tr = document.createElement('tr');
    for (var x=0; x<row; x++) {
      var td = document.createElement('td');
      // あとで参照できるように個別にidをつけておく
      var id = 'x'+x+'y'+y;
      td.setAttribute('id', id);
      td.setAttribute('onclick', 'judge('+x+','+y+',"' + id + '");');
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

/**
 * 宝の位置をセットする関数
 *
 */
function buryTreasure(x, y) {
  ansX = Math.floor((Math.random() * row)),
  ansY = Math.floor((Math.random() * col));

  console.log(ansX, ansY);
}

/*
 * クリックされた時に呼ばれる関数
 */
function judge(x, y, id) {
  if (hitTreasure(x, y) === true) {
    completeGame(id);
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
function completeGame(id) {
  // 宝があった場所を赤く塗りつぶす
  document.getElementById(id).setAttribute('style', 'background-color:rgb(255,0,0);');
  alert('ゲームクリア！');

  //TODO: クリアしたらどうしよう
}

/*
 * 宝の位置のヒントを出す関数
 */
function showHint(x, y) {
  var distance = Math.abs(ansX - x) + Math.abs(ansY - y);
  alert('あと' + distance + 'マス離れてるよ！');
}
