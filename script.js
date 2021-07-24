/** @format */

window.addEventListener('DOMContentLoaded', init);

const opts = [
	'*',
	'/',
	'+',
	'-',
	'9',
	'8',
	'7',
	'6',
	'5',
	'4',
	'3',
	'2',
	'1',
	'0',
	'.',
]; // all keys

const spec = ['*', '/', '+', '-']; // special function keys

function init() {
	document.title = 'JavaScript Calculator';
	let dec = false;
	let eva = false;

	const container = document.createElement('div');
	container.classList.add('container');
	container.style.maxWidth = '600px';
	container.style.margin = '0 auto';
	document.body.appendChild(container);

	const img = document.createElement('img');
	img.setAttribute('src', './logo/calc.png');
	img.style.width = '100%';
	img.style.height = '6rem';
	img.style.marginBottom = '10%';
	container.appendChild(img);

	const output = document.createElement('input');
	output.setAttribute('type', 'text');
	output.classList.add('output');
	output.style.width = '100%';
	output.style.lineHeight = '50px';
	output.style.fontSize = '3rem';
	output.style.textAlign = 'right';
	output.style.bordserRadius = '5px';
	output.style.border = '1px solid #000';
	container.appendChild(output);

	output.addEventListener('keydown', function (e) {
		if (e.keyCode == 13) {
			if (output.value === '') {
				cOutput('red');
			} else if (eva) {
				cOutput('red');
			} else {
				cOutput('black');
				output.value = eval(output.value);
			}
		}
	});

	const main = document.createElement('div');
	main.classList.add('main');
	main.style.width = '101%';
	container.appendChild(main);

	opts.forEach(function (val) {
		btnMaker(val, addOutput);
	});

	btnMaker('=', evalOutput);
	btnMaker('C', clearOutput);
	btnMaker('del', delOutput);

	function cOutput(v) {
		output.style.border = '2px solid ' + v;
		output.style.color = v;
	}

	function evalOutput() {
		if (output.value === '') {
			cOutput('red');
		} else if (eva) {
			cOutput('red');
		} else {
			cOutput('black');
			output.value = eval(output.value);
		}
		dec = output.value.includes('.');
	}

	function clearOutput() {
		output.value = '';
	}

	function delOutput() {
		if (output.value) {
			output.value = output.value.slice(0, -1);
		}
	}

	function btnMaker(txt, myFunction) {
		let btn = document.createElement('button');
		btn.setAttribute('type', 'button');
		btn.style.width = '23%';
		btn.style.lineHeight = '50px';
		btn.style.margin = '1%';
		btn.style.fontSize = '2rem';
		btn.val = txt;
		btn.textContent = txt;
		btn.addEventListener('click', myFunction);
		main.appendChild(btn);
	}

	function addOutput(e) {
		let char = e.target.val;
		cOutput('black');
		if (char == '.') {
			if (dec) {
				char = '';
				cOutput('red');
			} else {
				dec = true;
			}
		}

		eva = spec.includes(char);
		if (eva) {
			dec = false;
		}
		output.value += char;
	}
}
