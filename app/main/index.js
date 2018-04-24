/* global require __dirname:true */
const path = require('path');
const menubar = require('menubar');

const mainURL = 'file://' + path.join(__dirname, '../renderer', 'index.html');
const iconUrl = path.join(__dirname, '../resources', 'tray.png');

const prop = {
	width: 600,
	height: 700,
	index: mainURL,
	icon: iconUrl,
	showDockIcon: true
};

const mb = menubar(prop);
setTimeout(() => {
	mb.on('ready', () => {
	});
}, 2);
