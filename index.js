const electron = require('electron');
const app = electron.app;


const BrowserWindow = electron.BrowserWindow;

var mainWindow;
app.on('ready',function(){
	mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });
	 mainWindow.loadURL('file://' + __dirname + '/Main/index.html')

});
