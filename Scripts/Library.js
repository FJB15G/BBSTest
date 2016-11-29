//---------------------------------------------------------
//AjaxにJSONデータの送信
//	引数	url			接続先アドレス
//			data		送信用オブジェクト
//			proc		送信完了後のコールバックファンクション(null可)
//	戻り値	procがnullの場合は、同期通信後データを返す
function sendJson(url, data, proc) {
  var xmlHttp = new XMLHttpRequest();
  try {
    if (proc == null) {
      xmlHttp.open('POST', url, false);
      return JSON.parse(xmlHttp.responseText);
    }
    else {
      xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4) {
          var obj = null;
          try
          {
            obj = JSON.parse(xmlHttp.responseText);
          } catch (e)
          {
            proc(null);
            return;
          }
          proc(obj);
        }
      }
    }
    if (data == null) {
      xmlHttp.open('GET', url, true);
      xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xmlHttp.send(null);
    }
    else {
      xmlHttp.open('POST', url, true);
      xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      if (sessionStorage.getItem("Session"))
        xmlHttp.setRequestHeader("X-Session", sessionStorage.getItem("Session"));
      xmlHttp.send(JSON.stringify(data));
    }
  }
  catch (e) {
    alert("読み込みエラー");
    proc(null);
    return null;
  }
  return null;
}
