const path = require('path');
const electron = require('electron');
const {app, BrowserWindow} = electron;

// Globally declaring main window to prevent it from being garbage collected.
let mainWindow;

// Adds debug features like hotkeys for triggering dev tools and reload.
require('electron-debug')();

// This is the main URL which will be loaded into our app.
const mainURL = 'file://' + path.join(__dirname, '../renderer', 'index.html');

const APP_ICON = path.join(__dirname, '../resources', 'icon');

const iconPath = () => {
	return APP_ICON + (process.platform === 'win32' ? '.ico' : '.png');
};

// A function to create a new BrowserWindow.
function createMainWindow () {
	mainWindow = new BrowserWindow({
		defaultHeight: 600,
		defaultWidth: 1000,
		icon: iconPath()
	});
	mainWindow.loadURL(mainURL);
}

// Triggers when the app is ready.
app.on('ready', function(){
	createMainWindow();
});
