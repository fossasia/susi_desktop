onload = function() {

	const webview = document.querySelector('webview');
	const loading = document.querySelector('#loading');

	function onStopLoad() {
		console.log('finished');
		loading.style.display = 'none';
	}

	function onStartLoad() {
		console.log('started');
	}

	webview.addEventListener('did-stop-loading', onStopLoad);
	webview.addEventListener('did-start-loading', onStartLoad);

}