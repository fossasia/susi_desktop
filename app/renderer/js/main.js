onload = function () {
	const webview = document.querySelector('webview');
	const loading = document.querySelector('#loading');

	function onStopLoad() {
		loading.style.display = 'none';
	}

	webview.addEventListener('did-stop-loading', onStopLoad);
	webview.addEventListener('did-start-loading', onStartLoad);
};
