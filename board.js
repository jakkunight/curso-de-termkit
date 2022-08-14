const {
	terminal,
	init,
	cleanup,
	exit,
	print,
	printTable,
	bar,
	progressBar,
	readline
} = require("./terminal.js");

class PLAYER {
	constructor(token){
		if(!token || typeof token != "number" || (token != 1 && token != -1)){
			throw new Error("Invalid token. Expected (1|-1).");
		}
		this.token = token;
		if(token > 0){
			this.figure = "X";
		}else{
			this.figure = "O";
		}
		this.score = 0;
	}
	incrementScore(){
		this.score++;
	}
}

class GAME {
	constructor(width, height, points){
		if(!width || !height || !points || points < 3 || width < points || height < points){
			throw new Error("Invalid data. Expected (int >= 3, int >=3, int >=)3.");
		}
		this.height = height;
		this.width = points;
		this.points = points;
		this.matrix = new Array();
		this.matrix.length = width;
		for(let i = 0; i < this.matrix.length; i++){
			this.matrix[i] = new Array();
			this.matrix[i].length = height;
		}
		for(let i = 0; i < width; i++){
			for(let j = 0; j < height; j++){
				this.matrix[i][j] = 0;
			}
		}
	}
	match(player){
		if(!(player instanceof PLAYER)){
			throw new Error("No valid player. Expected (PLAYER).");
		}
		for(let i = 0; i < this.width; i++){
			let column = 0;
			let mainDiagonal = 0;
			let secondaryDiagonal = 0;
			for(let j = 0; j < this.height - this.points + 1; j++){
				for(let k = 0; k < this.points; k++){
					column += this.matrix[i][j + k];
					if(i + k < this.width && j + k < this.height){
						mainDiagonal += this.matrix[i + k][j + k];
					}
					if(i + k < this.height){
						secondaryDiagonal += this.matrix[i + k][this.height - 1 - k];
					}
				}
				if(column == this.points * player.token){
					player.incrementScore();
				}
				if(mainDiagonal == this.points * player.token){
					player.incrementScore();
				}
				if(secondaryDiagonal == this.points * player.token){
					player.incrementScore();
				}
				column = 0;
				mainDiagonal = 0;
				secondaryDiagonal = 0;
			}
		}
		for(let i = 0; i < this.height; i++){
			let row = 0;
			let mainDiagonal = 0;
			let secondaryDiagonal = 0;
			for(let j = 0; j < this.width - this.points + 1; j++){
				for(let k = 0; k < this.points; k++){
					row += this.matrix[j + k][i];
					if(i + k < this.width && j + k < this.height){
						mainDiagonal += this.matrix[j + k][i + k];
					}
					if(i + k < this.height){
						secondaryDiagonal += this.matrix[j + k][this.height - 1 - k];
					}
				}
				console.log("secondaryDiagonal:", secondaryDiagonal);
				if(row == this.points * player.token){
					player.incrementScore();
				}
				if(mainDiagonal == this.points * player.token){
					player.incrementScore();
				}
				if(secondaryDiagonal == this.points * player.token){
					player.incrementScore();
				}
				row = 0;
				mainDiagonal = 0;
			}
		}
	}
	putToken(player, x, y){
		if(player instanceof PLAYER && x >= 0 && y >= 0){
			this.matrix[x][y] = player.token;
		}else{
			throw new Error("No valid data. Expected (PLAYER, int >= 0, int >= 0).");
		}
	}
};

const main = async () => {
	try{
		console.log("Loading game...");
		let game = new GAME(3, 3, 3);
		console.log("Loading player data...");
		let a = new PLAYER(1);
		console.log("Loading player data...");
		let b = new PLAYER(-1);
		console.log(game.matrix);
		console.log(a);
		game.putToken(a, 0, 2);
		game.putToken(a, 1, 1);
		game.putToken(a, 2, 0);
		game.match(a);
		console.log(game.matrix);
		console.log(a);
	}catch(e){
		console.error(e);
		return -1
	}
};
main();
