//ページ読み込みイベントに登録
document.addEventListener("DOMContentLoaded", Main, false);

var BBS_URL = "https://script.google.com/macros/s/AKfycbwhKTCoMevjtDmWK1RUMGCi_gv_ciVKdJy7fk15b3f-IaIUbco/exec";

function Main()
{
  //メッセージの読み込み命令
  function load(){
    var params = {"cmd":"LIST"};
    sendJson(BBS_URL,params,onLoad);
  }
  //メッセージが送られてきたら処理する内容
  function onLoad(json){
    var html = "";
    var values = json.values;
    for(var index in values){
      var value = values[index];
      html = "<div>"+value[2]+":"+value[3]+"</div>" + html;
    }
    output.innerHTML =  html;
  }
  //書き込み命令
  function write(name,msg){
    var params = {"cmd":"WRITE","name":name,"msg":msg};
    sendJson(BBS_URL,params,onWrite);

  }
  //書き込みが完了したときに処理する内容
  function onWrite(json){
    if(json && json.result){
      inputs[2].value = "送信完了";
      load(); //書き込みが完了したあとに読み直す
    }
    else
      inputs[2].value = "送信エラー";
  }

  //各インスタンスの取得
  var inputs = document.querySelectorAll("input");
  var output = document.querySelector("div");

  //送信ボタンを押した場合の処理
  inputs[2].onclick = function(){
    var name = inputs[0].value;
    var msg = inputs[1].value;  //メッセージの取得
    inputs[2].value = "送信中";  //ボタン表示の変更
    write(name,msg);            //書き込み
  }

  load(); //ページを開いた直後に読み込みを行う

  //write("ふぉ","ふぉっふぉっふぉ");
}
