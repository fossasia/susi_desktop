// Global Variables
var send_button = document.getElementById('message-send-button');
var text = document.getElementById('message-text');
var list = document.getElementById('message-data');
var reply = undefined;
var url = "http://api.asksusi.com/susi/chat.json?q=";
var body = document.getElementById('window');

function checkResponse(response) {
  if(response.status===200) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function getJSON(response) {
  return response.json();
}

var send_message = function(message) {
  fetch(url + encodeURI(message), { method: "get", cache: "no-store" })
    .then(checkResponse)
    .then(getJSON)
    .then(function(data) {
      reply = undefined;
      reply = data.answers[0].data[0].answer;
    })
    .catch(function(err) {
      reply=undefined;
      reply = "Sorry. There seems to be a problem."
    })
}

var append = function(text, attr){
  let el = document.createElement("div");
  el.setAttribute(attr.name, attr.val);
  el.appendChild(document.createTextNode(text));
  list.appendChild(el);
  let clear = document.createElement("div");
  clear.setAttribute("class", "clear");
  list.appendChild(clear);
}

var addReply = function() {
  if(reply != undefined) {
    append(reply, { name: "class", val: "from-them" });
    reply = undefined;
  }
}

text.onkeypress = function(e){
  if (!e) e = window.event;
  var keyCode = e.keyCode || e.which;
  if (keyCode == '13'){
    e.preventDefault();
    let message = text.value;
    text.value = "";
    send_message(message);
    append(message, { name: "class", val: "from-me" });
    addReply();
    body.scrollTop = list.scrollHeight;
  }
}
