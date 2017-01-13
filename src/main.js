var request = require('request');

// Global Variables
var send_button = document.getElementById('message-send-button');
var text = document.getElementById('message-text');
var list = document.getElementById('message-data');
var reply = "";

var send_message = function(message) {
  request({
    url: "http://api.asksusi.com/susi/chat.json?q=" + encodeURI(message),
    json: true
  }, function (err, response, data) {
    if (!err && response.statusCode === 200) {
      reply = data.answers[0].actions[0].expression;
      return true;
    } else {
      reply = "Sorry, seems like there is an error.";
      return false;
    }
  });
}

var append = function(text, attr){
  let el = document.createElement("li");
  el.setAttribute(attr.name, attr.val);
  el.appendChild(document.createTextNode(text));
  list.appendChild(el);
}

send_button.addEventListener('click', function() {
  let message = text.value;
  send_message(message);
  console.log(reply)
  append(message, { name: "class", val: "message-by-user" });
  if(typeof(reply) != undefined){
    append(reply, { name: "class", val: "message-by-susi" })
  }

});
