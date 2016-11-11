window.onload = function () {
	var blocks = document.querySelectorAll('.block');
	blocks.forEach(function (block) {
		block.addEventListener('click', function (event) {
			console.log(event);
		}, false)
	})
}