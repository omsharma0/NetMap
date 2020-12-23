function drawNetwork(name)
{
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var c = canvas.getContext ('2d');
c.fillStyle = "red";
c.fillRect(100,100,100,100);
c.fillStyle = "blue";
c.fillText(name, 100,110,60);
console.log(canvas);
}