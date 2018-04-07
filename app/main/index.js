#!/usr/bin/env electron

const path = require('path');
const electron = require('electron');
const WindowStateKeeper = require('electron-window-state');

const {app, BrowserWindow, Menu} = electron;
const {recordIt} = require('./../speech_api/main');

const tray = require('./tray');

// Globally declaring mainWindow and tray to prevent it from being garbage collected.
let mainWindow;
let trayIcon;
let closing;

const record = () => {
	recordIt();
}

// Adds debug features like hotkeys for triggering dev tools and reload.
require('electron-debug')();

// This is the main URL which will be loaded into our app.
const mainURL = 'file://' + path.join(__dirname, '../renderer', 'index.html');

const APP_ICON = path.join(__dirname, '../resources', 'icon');

const iconPath = () => {
	return APP_ICON + (process.platform === 'win32' ? '.ico' : '.png');
};

function onTrayToggle() {
	mainWindow.isVisible() ? mainWindow.hide() : mainWindow.show();
}

function onTrayClose() {
	closing = true;
	mainWindow.close();
}

function onClosing(e) {
	// The window has asked to be closed
	if (!closing) {
		mainWindow.hide();
		e.preventDefault();
	}
}

function onClosed() {
	// Dereference the window
	// For multiple windows store them in an array
	app.quit();
}

// A function to create a new BrowserWindow.
function createMainWindow() {
	// Default main window state
	const mainWindowState = new WindowStateKeeper({
		defaultWidth: 1000,
		defaultHeight: 600
	});

	const win = new BrowserWindow({
		// Creating a new window
		title: 'SUSI AI',
		icon: iconPath(),
		x: mainWindowState.x,
		y: mainWindowState.y,
		width: mainWindowState.width,
		height: mainWindowState.height,
		minWidth: 600,
		minHeight: 500,
		webPreferences: {
			plugins: true,
			allowDisplayingInsecureContent: true,
			nodeIntegration: true
		},
		show: false,
		autoHideMenuBar: true
	});

	win.on('focus', () => {
		win.webContents.send('focus');
	});

	win.once('ready-to-show', () => {
		win.show();
	});

	win.on('close', onClosing);
	win.on('closed', onClosed);

	win.loadURL(mainURL);
	// Let mainWindowState update listeners automatically on main window.
	mainWindowState.manage(win);

	return win;
}

app.on('activate', () => {
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

// Triggers when the app is ready.
app.on('ready', () => {
	closing = false;
	// Assigning the globally declared mainWindow
	mainWindow = createMainWindow();

	// Initializing trayIcon
	trayIcon = tray.create(onTrayToggle, onTrayClose);

	// Grabbing the DOM
	const page = mainWindow.webContents;

	// Display web-content when DOM has loaded
	page.on('dom-ready', () => {
		mainWindow.show();
	});
	const template = [
    {
      label: 'Edit',
      submenu: [
        {role: 'undo'},
        {role: 'redo'},
        {type: 'separator'},
        {role: 'cut'},
        {role: 'copy'},
        {role: 'paste'},
        {role: 'pasteandmatchstyle'},
        {role: 'delete'},
        {role: 'selectall'},
        {label: 'Voice Input',
        click: record
      }
      ]
    },
    {
      label: 'View',
      submenu: [
        {role: 'reload'},
        {role: 'forcereload'},
        {role: 'toggledevtools'},
        {type: 'separator'},
        {role: 'resetzoom'},
        {role: 'zoomin'},
        {role: 'zoomout'},
        {type: 'separator'},
        {role: 'togglefullscreen'}
      ]
    },
    {
      role: 'window',
      submenu: [
        {role: 'minimize'},
        {role: 'close'}
      ]
    },
    {
      role: 'help',
      submenu: [
        {
          label: 'Learn More',
          click () { require('electron').shell.openExternal('https://electronjs.org') }
        }
      ]
    }
  ]
  
  if (process.platform === 'darwin') {
    template.unshift({
      label: app.getName(),
      submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
      ]
    })
  
    // Edit menu
    template[1].submenu.push(
      {type: 'separator'},
      {
        label: 'Speech',
        submenu: [
          {role: 'startspeaking'},
          {role: 'stopspeaking'}
        ]
      }
    )
  
    // Window menu
    template[3].submenu = [
      {role: 'close'},
      {role: 'minimize'},
      {role: 'zoom'},
      {type: 'separator'},
      {role: 'front'}
    ]
  }
  
  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		mainWindow.hide();
	}
});
