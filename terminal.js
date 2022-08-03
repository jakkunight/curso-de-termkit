const terminal = require("terminal-kit").terminal;

const readline = () => new Promise((resolve, reject) => {
	terminal.inputField({}, (error, input) => {
		if(error){
			terminal("\n");
			reject(error);
		}
		if(input){
			terminal("\n");
			resolve(input);
		}
	});
});
const print = (text, colors = terminal.white.bgBlack()) => {
	colors();
	terminal(text);
	terminal.white.bgBlack();
};
const printTable = (table) => {
	terminal.table(table, {
		hasBorder: true,
		fit: true
	});
};
const exit = (code) => {
	terminal.processExit(code);
};
const clear = () => {
	terminal.clear();
};
const cleanup = (code) => {
	terminal.hideCursor(false);
	terminal.clear();
	terminal.grabInput(false);
	terminal.processExit(code || 0);
};
const fullscreen = () => {
	terminal.fullscreen();
};
const progressBar = (_title, _width, _x, _y) => terminal.progressBar({
	percent: true,
	barChar: "#",
	barHeadChar: "#",
	title: _title,
	syncMode: true,
	x: _x,
	y: _y,
	width: _width
});
const bar = (number, colors) => {
	terminal.bar(number, {
		barStyle: colors
	});
	terminal.white.bgBlack();
};
const init = (inputHandler, fn) => {
	terminal.hideCursor(true);
	terminal.grabInput(true);
	terminal.on("key", inputHandler);
	fn();
};

const spinner = () => {
	terminal.spinner();
};

module.exports = {
	terminal,
	readline,
	print,
	printTable,
	cleanup,
	exit,
	clear,
	progressBar,
	bar,
	init,
	spinner,
};
