var moon = document.getElementById("moon"),
  audio = document.getElementById("audio"),
  dragging = false,
  radius = 75, //radius of the background
  area = Math.PI * radius * radius, //are of the background that changes
  iniCoords = [0, 0]; //co -ordinates x and y values

function init() {
  moon.addEventListener("mousedown", selectMoon);
  document.body.addEventListener("mousemove", moveMoon);
  document.body.addEventListener("mouseup", dropMoon);
  setMoonData(window.innerWidth / 2 + radius * 2.5, window.innerHeight / 2); //2.5 because of left more on x
  audio.play(); 
}
//part1 above  

//part2 below 
function selectMoon(evt) {
  dragging = true; 
  var coords = getCoords(evt),
    sizePosition = moon.getBoundingClientRect(); //returns the size of an element and its position relative to the viewport.
  iniCoords = [coords[0] - sizePosition.left - radius, coords[1] - sizePosition.top - radius];
} 
function moveMoon(evt) {
  if (!dragging) return;
  var coords = getCoords(evt);
  setMoonData(coords[0] - iniCoords[0], coords[1] - iniCoords[1]); //affects momvememnt
}

function setMoonData(x, y) {
  moon.style.left = (x / window.innerWidth) * 100 + "%"; //topbottom
  moon.style.top = (y / window.innerHeight) * 100 + "%"; //leftright

  var offset = Math.hypot(
      x - window.innerWidth / 2,
      y - window.innerHeight / 2
    ), //squrt of sum of squares of argument
    sector = Math.acos(offset / 2 / radius) / Math.PI,
    triangle =
      Math.sqrt(radius * radius - (offset * offset) / 4) * (offset / 2),
    overlap = ((area * sector - triangle) * 2) / area || 0,
    opacity = 400 - offset, // to make translucents 400 is for how far before dark night
    expOverlap = Math.pow(overlap, 10); // 10 to change the disatance when music starts

  //Bling bling
  moon.style.boxShadow =  
    "inset " +
    (x - window.innerWidth / 2) / 10 +
    "px " +
    (y - window.innerHeight / 2) / 10 +
    "px 50px rgba(255, 255, 119, " +
    opacity +
    ")";
    document.body.style.background =
    "hsl(" +
    (180+ Math.floor(200 * expOverlap)) +
    ", 59%, " +
    (1 - expOverlap) * 25 +
    "%)";
  audio.volume = overlap;
  console.log(overlap); // Volume
} 

// to drop moon
function dropMoon() {
  dragging = false;
}
function getCoords(evt) {
  console.log(evt);
  return [[evt][0].clientX, [evt][0].clientY]; //EVT IS OBJ, [0] IS WHICH VALUE.CLIEXNTX IS FINAL VALUE
} 

// Math.hypot = function (a, b) {
//   return Math.sqrt(a * a + b * b);
// };
init();