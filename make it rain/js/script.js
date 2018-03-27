var canvas = document.getElementById('canvas'),
	canvasContext = canvas.getContext('2d'),
	interval,
	raindrops = [];

window.onload = function() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	var fps = 60;
	interval = setInterval(startRain, 1000/fps);

}

function startRain() {
	
	if(Math.random() <= 0.5)
		{
			createRaindrops();
		}
	moveRaindrops();
	drawRaindrops();
	
}

function createRaindrops() {
	
	///Create random number of raindrops between 1 and 5
	var numberOfRaindrops = parseInt(Math.random() * 4 + 1);
	for(var i = 1; i <= numberOfRaindrops; ++i) {
		var x, y, speed;
		
		///x will be random spawn point beetween 5 and canvas.height - 5
		x = parseInt(Math.random() * (canvas.width - 10) + 5);
		y = 0;
		
		//speed will be random between 1 and 4
		speed = parseInt(Math.random() * 3 + 1);
		var raindrop = new Raindrop(x, y, speed);
		
		//append raindrop to raindrops
		raindrops.push(raindrop);
	}
	
}

function moveRaindrops() {
	for(var  i = 0; i < raindrops.length; i++) {
		raindrops[i].y = raindrops[i].y + raindrops[i].speed;
		if(raindrops[i].y > canvas.height) {
			var aux = raindrops[i];
			raindrops[i] = raindrops[raindrops.length - 1];
			raindrops[raindrops.length - 1] = aux;
			raindrops.pop();
		}
	}
}

function drawRaindrops() {
	
	drawAndColorRect(0, 0, canvas.width, canvas.height, 'white');
	for(var i = 0; i < raindrops.length; i++) {
		var raindrop = raindrops[i];
		var img = document.createElement("img");
		img.src = "img/raindrop.png"
		canvasContext.drawImage(img,raindrop.x,raindrop.y, 10, 10);
	}
	
}

function Raindrop(x, y, speed) {
	this.position = "absolute";
	this.x = x;
	this.y = y;
	this.speed = speed;
}

function drawAndColorCirc(cx, cy, radius, color) {
	
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(cx, cy, radius, 0, 2 * Math.PI, false);
	canvasContext.fill();
	
}

function drawAndColorRect(startX, startY, sizeX, sizeY, color) {
	
	canvasContext.fillStyle = color;
	canvasContext.fillRect(startX, startY, sizeX, sizeY);
	
}