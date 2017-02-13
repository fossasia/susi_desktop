// Global Variables
var send_button = document.getElementById('message-send-button');
var text = document.getElementById('message-text');
var list = document.getElementById('message-data');
var reply = undefined;
var url = "http://api.asksusi.com/susi/chat.json?q=";
var body = document.getElementById('window');
const {remote} = require('electron');
const {Menu, MenuItem} = remote;

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
  if (attr.val === "from-them") {
    addTime({ name: "class", val: "susi-time", text: "susi" });
  } else {
    addTime({ name: "class", val: "me-time", text: "you" });
  }
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

var addTime = function(attr) {
  let date = new Date();
  let time = document.createElement("div");
  time.setAttribute(attr.name, attr.val);
  time.innerHTML = attr.text + "    " + date.getHours() + ":" +date.getMinutes();
  list.appendChild(time);
}

text.onkeypress = function(e) {
  if (!e) e = window.event;
  var keyCode = e.keyCode || e.which;
  if (keyCode == '13'){
    e.preventDefault();
    let message = text.value;
    if (message.length !== 0) {
      text.value = "";
      send_message(message);
      append(message, { name: "class", val: "from-me" });
      addReply();
    }
    $('html,body').animate({
      scrollTop: $("#message-data").offset().top + list.scrollHeight}, 1200);
    }
}

var applyLightTheme = function() {
  if (document.getElementById('dark-theme') !== null) {
    $('#dark-theme').remove();
  }
  if (document.getElementById('light-theme') === null) {
    $('head').append('<link id="light-theme" rel="stylesheet" type="text/css" href="themes/light_theme.css">'); 
  }
  $(".theme-content").hide();
}

var applyDarkTheme = function() {
 if (document.getElementById('light-theme') !== null) {
    $('#light-theme').remove();
  }
  if (document.getElementById('dark-theme') === null) {
    $('head').append('<link id="dark-theme" rel="stylesheet" type="text/css" href="themes/dark_theme.css">'); 
  }
  $(".theme-content").hide();
}


// Customizing the app menu

const template = [
  {
    label: 'File',
    submenu: [
      {
        role: 'quit',
        accelerator: 'CmdOrCtrl+Q'
      }
    ]
  },
  {
    label: 'Edit',
    submenu: [
      {
        role: 'undo'
      },
      {
        role: 'redo'
      },
      {
        type: 'separator'
      },
      {
        role: 'cut'
      },
      {
        role: 'copy'
      },
      {
        role: 'paste'
      },
      {
        role: 'pasteandmatchstyle'
      },
      {
        role: 'delete'
      },
      {
        role: 'selectall'
      }
    ]
  },
  {
    label: 'View',
    submenu: [
      {
        role: 'reload'
      },
      {
        type: 'separator'
      },
      {
        role: 'resetzoom'
      },
      {
        role: 'zoomin'
      },
      {
        role: 'zoomout'
      },
      {
        type: 'separator'
      },
      {
        role: 'togglefullscreen'
      }
    ]
  },
  {
    role: 'window',
    submenu: [
      {
        role: 'minimize'
      },
      {
        role: 'close'
      }
    ]
  },
  {
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click () { require('electron').shell.openExternal('http://electron.atom.io') }
      }
    ]
  },
];

if (process.platform === 'darwin') {
  // Edit menu.
  template[1].submenu.push(
    {
      type: 'separator'
    },
    {
      label: 'Speech',
      submenu: [
        {
          role: 'startspeaking'
        },
        {
          role: 'stopspeaking'
        }
      ]
    }
  );
  // Window menu.
  template[3].submenu = [
    {
      label: 'Close',
      accelerator: 'CmdOrCtrl+Q',
      role: 'close'
    },
    {
      label: 'Minimize',
      accelerator: 'CmdOrCtrl+M',
      role: 'minimize'
    },
    {
      label: 'Zoom',
      role: 'zoom'
    },
    {
      type: 'separator'
    },
    {
      label: 'Bring All to Front',
      role: 'front'
    }
  ];
}

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

$(".theme").click(function () {
  $(".theme-content").toggle();
});

$(".settings").click(function () {
  $(".theme-content").hide();

  /* Other stuff to be added here */
});
