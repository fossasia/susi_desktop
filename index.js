const electron = require('electron');
const app = electron.app;


const BrowserWindow = electron.BrowserWindow;

var mainWindow;
app.on('ready', function(){
	mainWindow = new BrowserWindow({
    width: 360,
    height: 600
  });

	mainWindow.loadURL('file://' + __dirname + '/static/index.html')

});
