//ページ読み込みイベントに登録
document.addEventListener("DOMContentLoaded", Main, false);

var BBS_URL = "https://script.google.com/macros/s/AKfycbwhKTCoMevjtDmWK1RUMGCi_gv_ciVKdJy7fk15b3f-IaIUbco/exec";

function Main()
{
  //-------------------------------------------
  //メッセージの読み込み命令
  function load(){
    var params = {"cmd":"LIST","id":lastId};        //送信パラメータの設定
    sendJson(BBS_URL,params,onLoad);                //データの送信
    //-------------------------------------------
    //メッセージが送られてきたら処理する内容
    //データ内容 0:ID 1:日付 2:名前 3:メッセージ
    function onLoad(json){
      var values = json.values;
      for(var index in values){
        var value = values[index];                  //配列からデータを受け取る
        var div = document.createElement('div');    //出力用のタグを生成
        div.innerHTML = value[2]+":"+value[3];      //メッセージを作成
        lastId = value[0];                          //最後に受け取ったIDを保存
        output.insertBefore(div, output.firstChild);//先頭に追加
      }
    }
  }

  //-------------------------------------------
  //書き込み命令
  function write(name,msg){
    var params = {"cmd":"WRITE","name":name,"msg":msg}; //送信パラメータの設定
    sendJson(BBS_URL,params,onWrite);                   //データの送信
    //-------------------------------------------
    //書き込みが完了したときに処理する内容
    function onWrite(json){
      if(json && json.result){
        inputs[2].value = "送信完了";
        load(); //書き込みが完了したあとに読み直す
      }
      else
        inputs[2].value = "送信エラー";
    }
  }

  //-------------------------------------------
  //各インスタンスの取得
  var inputs = document.querySelectorAll("input");
  var output = document.querySelector("div");

  //送信ボタンを押した場合の処理
  inputs[2].onclick = function(){
    var name = inputs[0].value; //名前の取得
    var msg = inputs[1].value;  //メッセージの取得
    inputs[2].value = "送信中";  //ボタン表示の変更
    write(name,msg);            //書き込み
  }

  var lastId = 0;   //最後に受け取ったメッセージID
  load();           //メッセージを読み込む
}
