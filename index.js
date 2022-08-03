const {
	terminal,
	readline,
	cleanup,
	print,
	printTable,
	clear,
	bar,
	exit,
	spinner,
	init
} = require("./terminal.js");

const inputHandler = (key) => {
	if(key === "CTRL_C"){
		cleanup(0);
	}
};

const loop = async () => {
	try{
		
		setTimeout(loop, 0);
	}catch(error){
		throw new Error(error);
	}
};

const main = async () => {
	try{
		init(inputHandler, () => {
		});
		loop();
		//cleanup(0);
	}catch(error){
		cleanup(-1);
	}
};

main();
