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

  // debug
  // 宝の位置を表示する
  console.log(ansX, ansY);
};

/**
 * フィールドを描画する
 *
 * @param object [table] 描画対象のDOM要素
 *
 */
function initField(table) {
  // rowとcolはグローバル変数
  for (var y = 0; y < col; y++) {
    var tr = document.createElement('tr');
    for (var x = 0; x < row; x++) {
      var td = document.createElement('td');

      // あとで参照できるように個別にidをつけておく
      // ex) 左上は0x0y, 右隣が1x0y
      var id = 'x'+x+'y'+y;
      td.setAttribute('id', id);
      td.setAttribute('onclick', 'judge('+x+','+y+',"' + id + '");'); //onclick="judge(x, y, id);"
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

/**
 * 宝の位置をセットする
 *
 * @param
 *    int [x] 宝のX座標
 *    int [y] 宝のY座標
 *
 */
function buryTreasure(x, y) {
  ansX = Math.floor((Math.random() * row)),
  ansY = Math.floor((Math.random() * col));
}

/**
 * クリックされたら呼ばれる
 *
 * @param
 *    int [x] クリックされた要素のX座標
 *    int [y] クリックされた要素のY座標
 *    string [id] クリックされた要素のid
 */
function judge(x, y, id) {
  if (hitTreasure(x, y) === true) {
    completeGame(id);
  } else {
    showHint(x, y);
  }
}

/**
 * 渡されたx, yの位置に宝があるか判定する
 *
 * @param
 *    int [x]
 *    int [y]
 *
 * @return boolean
 *
 */
function hitTreasure(x, y) {
  if (x === ansX && y === ansY) {
    return true;
  } else {
    return false;
  }
}

/*
 * ゲームをクリアした時に呼ばれる関数
 */
function completeGame(id) {
  // 宝があった場所を赤く塗りつぶす
  document.getElementById(id).setAttribute('style', 'background-color:rgb(255,0,0);');
  alert('ゲームクリア！');
}

/*
 * 宝の位置のヒントを出す関数
 */
function showHint(x, y) {
  var distance = Math.abs(ansX - x) + Math.abs(ansY - y);
  alert('あと' + distance + 'マス離れてるよ！');
}
