const electron = require('electron');
const app = electron.app;
require('electron-context-menu')({
    prepend: (params, browserWindow) => [{
        visible: params.mediaType === 'text'
    }],
    //showInspectElement: false
});

const BrowserWindow = electron.BrowserWindow;

var mainWindow;
app.on('ready', function(){
	mainWindow = new BrowserWindow({
    width: 450
  });
	mainWindow.setMenu(null);
	mainWindow.loadURL('file://' + __dirname + '/static/index.html')

});
