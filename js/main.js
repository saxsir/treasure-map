/*
 * グローバル変数の定義
 */
var ansX, ansY;

// フィールドの大きさを定義
var areaLength = 640, row = 4, col = 4;

// bodyの最後まで読み込み終わったらゲームスタート
window.onload = function() {
  var canvas = document.getElementById('field');
  if(!canvas.getContext){ return false; }
  // htmlのcanvasのサイズを書き換え
  canvas.width = canvas.height = areaLength;

  // canvasに描画する準備
  var ctx = canvas.getContext('2d');

  // クリックイベントを追加
  // @todo: IEでも動くように修正する
  canvas.addEventListener('click', function(event){
    // クリックされたマスの座標を取得
    var rect = event.target.getBoundingClientRect();
    var x = getPointX(event.clientX - rect.left),
      y = getPointY(event.clientY - rect.top);
    if (x < 0 || y < 0) {
      console.log('座標を取得できませんでした');
      return false; //この先の処理を行わない
    }

    // もしクリックした場所に宝があればクリア
    if (hitTreasure(x, y) === true) {
      completeGame(ctx);
    }
    else {
      showHint(x, y);
    }
  });

  // 初期化
  init(ctx);
};

/*
 * ゲームを初期化する関数
 */
function init(ctx) {
  // フィールドを描画
  ctx.beginPath();
  for (var i=0; i<=row; i++) {
    ctx.moveTo(i*areaLength/row, 0);
    ctx.lineTo(i*areaLength/row, 640);
  }
  for (var i=0; i<=col; i++) {
    ctx.moveTo(0, i*areaLength/col);
    ctx.lineTo(areaLength, i*areaLength/col);
  }
  ctx.closePath();
  ctx.stroke();

  // 宝の位置を決める
  ansX = Math.floor((Math.random() * row)),
  ansY = Math.floor((Math.random() * col));
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
function completeGame(ctx) {
  // 宝があった場所を赤く塗りつぶす
  var sqWidth = areaLength/row,
    sqHeight = areaLength/col;
  ctx.fillStyle = "rgb(200, 0, 0)";
  ctx.fillRect(ansX * sqWidth, ansY * sqHeight, sqWidth, sqHeight);

  alert('ゲームクリア！');
}

/*
 * 宝の位置のヒントを出す関数
 */
function showHint(x, y) {
  var distance = Math.abs(ansX - x) + Math.abs(ansY - y);
  alert('あと' + distance + 'マス離れてるよ！');
}

/*
 * マウスの座標から、クリックされたマスのX座標を取得する関数
 */
function getPointX(mouseX) {
  var sqWidth = areaLength/row;
  for (var i=0; i<row; i++) {
    if (i*sqWidth < mouseX && mouseX < (i+1)*sqWidth) {
      return i;
    }
  }
  return -1;
}

/*
 * マウスの座標から、クリックされたマスのY座標を取得する関数
 */
function getPointY(mouseY) {
  var sqHeight = areaLength/col;
  for (var i=0; i<col; i++) {
    if (i*sqHeight < mouseY && mouseY < (i+1)*sqHeight) {
      return i;
    }
  }

  return -1;
}
