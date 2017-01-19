// Global Variables
var send_button = document.getElementById('message-send-button');
var text = document.getElementById('message-text');
var list = document.getElementById('message-data');
var reply = "";
var url = "http://api.asksusi.com/susi/chat.json?q=";

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
  fetch(url + encodeURI(message))
    .then(checkResponse)
    .then(getJSON)
    .then(function(data) {
      reply = data.answers[0].data[0].answer;
    })
    .catch(function(err) {
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

send_button.addEventListener('click', function() {
  let message = text.value;
  send_message(message);
  append(message, { name: "class", val: "from-me" });
  append(reply, { name: "class", val: "from-them" })
});
