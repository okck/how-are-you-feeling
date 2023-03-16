console.log(document.cookie);

const deleteAllCookies = () => {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}

let deleteCookiesEl = document.getElementById('deleteAll');
deleteCookiesEl.addEventListener('click', deleteCookies);

let sliderColor;
let sliderBgColor;
let bgVal;

let cookieRadiiArrayString;
let cookieColorsArrayString;
let cookieXsArrayString;
let cookieYsArrayString;
let cookieTimeArrayString;

let cw;
let ch;
cw = window.innerWidth;
ch = window.innerHeight;

let hArray = [];
let rArray = [];
let xArray = [];
let yArray = [];
let timeArray = [];
let cookieSliderColor = 275;
let cookieSliderBgColor = 80;

let onLoadDate = new Date();
let onLoadTime = ((onLoadDate.getTime() / 1000) / 60).toFixed(2);
console.log(onLoadTime);

console.log(checkCookie("radii"));
console.log(getCookie("radii"));
console.log(checkCookie("sliderColor"));

if (checkCookie("radii")) {
  cookieRadiiArrayString = getCookie("radii");
} else {
  cookieRadiiArrayString = [];
}
console.log(cookieRadiiArrayString);
console.log(JSON.parse(cookieRadiiArrayString));
rArray = JSON.parse(cookieRadiiArrayString);

if (checkCookie("colors")) {
  cookieColorsArrayString = getCookie("colors");
} else {
  cookieColorsArrayString = [];
}
console.log(JSON.parse(cookieColorsArrayString));
hArray = JSON.parse(cookieColorsArrayString);

if (checkCookie("xs")) {
  cookieXsArrayString = getCookie("xs");
} else {
  cookieXsArrayString = [];
}
console.log(JSON.parse(cookieXsArrayString));
xArray = JSON.parse(cookieXsArrayString);

if (checkCookie("ys")) {
  cookieYsArrayString = getCookie("ys");
} else {
  cookieYsArrayString = [];
}
console.log(JSON.parse(cookieYsArrayString));
yArray = JSON.parse(cookieYsArrayString);

if (checkCookie("ms")) {
  cookieTimeArrayString = getCookie("ms");
} else {
  cookieTimeArrayString = [];
}
console.log(JSON.parse(cookieTimeArrayString));
timeArray = JSON.parse(cookieTimeArrayString);

if (checkCookie("sliderColor")) {
  cookieSliderColor = getCookie("sliderColor");
} else {
  cookieSliderColor = 210;
}
if (checkCookie("sliderBgColor")) {
  cookieSliderBgColor = getCookie("sliderBgColor");
} else {
  cookieSliderBgColor = 80;
}

let myFont;
function preload() {
  loadFont('assets/PPMondwest-Regular.otf');
}

function setup() {
  let myDiv = createDiv('how are you feeling?');
  myDiv.style('font-family', 'PPMondwest-Regular');
  myDiv.addClass('text');

  sliderColor = createSlider(175, 325, parseInt(cookieSliderColor));
  sliderBgColor = createSlider(0, 80, parseInt(cookieSliderBgColor));
  sliderBgColor.id('sliderBgColor');

  sliderColor.style('width', '150px');
  sliderColor.style('position', 'fixed');
  sliderColor.style('bottom', '5vh');
  sliderColor.style('left', 'calc(50vw + 85px)');
  sliderColor.style('transform', 'translateX(-50%)');

  sliderBgColor.style('width', '150px');
  sliderBgColor.style('position', 'fixed');
  sliderBgColor.style('bottom', '5vh');
  sliderBgColor.style('left', 'calc(50vw - 85px)');
  sliderBgColor.style('transform', 'translateX(-50%)');

  setCookie("sliderBgColor", bgVal, 999);

  createCanvas(cw, ch);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
  ellipseMode(RADIUS);
}
// let sliderBgEl = document.getElementById('sliderBgColor');
// sliderBgEl.addEventListener('input', function() {
//   console.log(sliderBgEl.val);
// })

function draw() {
  bgVal = sliderBgColor.value();
  setCookie("sliderBgColor", bgVal, 999);

  background(bgVal);

  for (let i=0; i < rArray.length; i++) {
    let timeDiff = onLoadTime - timeArray[i];

    // minutes
    // let opa = map(timeDiff, 0, 30, 1, 0);
    let opa = map(timeDiff, 0, 10080, 1, 0);

    drawGradient(xArray[i], yArray[i], rArray[i], hArray[i], opa);
  }
}
// setCookie("sliderBgColor", bgVal, 999);

function mousePressed() {
  if (mouseY < (.92 * height)) {

    // get radius
    let radius = int(random(25, 150));
    // console.log(radius);

    if (rArray.length < 220) {
      rArray.push(radius);
    } else {
      let rRemove = rArray.shift();
      rArray[219] = radius;
    }
    // console.log(rArray);
  
    // get color
    let val = sliderColor.value();
    let h = val;
    setCookie("sliderColor", val, 999);

    // console.log(h);
    if (hArray.length < 220) {
      hArray.push(h);
    } else {
      let hRemove = hArray.shift();
      hArray[219] = h;
    }
    // console.log(hArray);

    // log mousePos
    if (xArray.length < 220) {
      xArray.push(mouseX);
    } else {
      let xRemove = xArray.shift();
      xArray[219] = mouseX;
    }
    if (yArray.length < 220) {
      yArray.push(mouseY);
    } else {
      let yRemove = yArray.shift();
      yArray[219] = mouseY;
    }

    // get current Milliseconds
    let d = new Date();
    console.log(d.getTime());

    if (timeArray.length < 220) {
      timeArray.push(((d.getTime() / 1000) / 60)).toFixed(2);
    } else {
      let timeRemove = timeArray.shift();
      timeArray[219] = (((d.getTime() / 1000) / 60).toFixed(2));
    }

    // draw orb
    drawGradient(mouseX, mouseY, radius, h, 1);
    console.log(mouseX, mouseY);

    // console.log(rArray);
    // console.log(JSON.stringify(rArray));

    setCookie("radii", JSON.stringify(rArray), 999);
    setCookie("colors", JSON.stringify(hArray), 999);
    setCookie("xs", JSON.stringify(xArray), 999);
    setCookie("ys", JSON.stringify(yArray), 999);
    setCookie("ms", JSON.stringify(timeArray), 999);
  }
}

function drawGradient(x, y, radius, h, opa) {
  for (let r = radius; r > 0; --r) {
    fill(h, 90, 90, opa);
    ellipse(x, y, r, r);
    h = (h + 1) % 360;
  }
}

// cookie functions
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
      c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
      }
  }
  return "";
}

function checkCookie(cname) {
  if (getCookie(cname) != '') {
      return true;
  } else {
      return false;
  }
}

function deleteCookies() {
  deleteAllCookies();
  location.reload();
}