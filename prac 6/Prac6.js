var sun = new Image();
var moon = new Image();
var earth = new Image();
function init() {
  sun.src = 'https://mdn.mozillademos.org/files/1456/Canvas_sun.png';
  moon.src = 'https://mdn.mozillademos.org/files/1443/Canvas_moon.png';
  earth.src = 'https://mdn.mozillademos.org/files/1429/Canvas_earth.png';
  window.requestAnimationFrame(draw);
}


function draw() {
  var ctx = document.getElementById('canvas').getContext('2d');

  ctx.globalCompositeOperation = 'destination-over';
  ctx.clearRect(0, 0, 300, 300); // clear canvas

  // ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';

  //circle boundary
  ctx.strokeStyle = 'rgba(0, 153, 255, 0.4)';

  ctx.save();
  // Earth
  ctx.translate(150, 150);
  var time = new Date();
  //earth movement around the sun
  ctx.rotate(((2 * Math.PI) / 60) * time.getSeconds() + ((2 * Math.PI) / 60000) * time.getMilliseconds());
  ctx.translate(105, 0); //radius of circle for earth movement
  //ctx.fillRect(0, -12, 50, 24); // Shadow
  ctx.drawImage(earth, -12, -12);

  //Moon
  ctx.save();
  ctx.rotate(((2 * Math.PI) / 6) * time.getSeconds() + ((2 * Math.PI) / 6000) * time.getMilliseconds());
  ctx.translate(0, 28.5);//radius of circle for moon movement
  ctx.drawImage(moon,0,0);
  ctx.restore();



  ctx.restore();
  
  ctx.beginPath();
  //ctx.circle(0,0,150,150);
  ctx.arc(150, 150, 105, 0, Math.PI * 2, false); // Earth orbit
  ctx.stroke();
 
  ctx.drawImage(sun, 0, 0, 300, 300);

  window.requestAnimationFrame(draw);
}
