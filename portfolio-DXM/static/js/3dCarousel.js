/* BY CassiaNosch - https://github.com/Cassianosch/programador.cs-reels - Thank you for the amazing carousel! */

const carContainer = document.querySelector("#projectCarousel");
const containercarrossel = carContainer.querySelector(".container-carrossel");
const carrossel = carContainer.querySelector(".carrossel");
const carrosselItems = carrossel.querySelectorAll(".carrossel-item");
const carrosselFlip = carrossel.querySelectorAll(".carrossel-flip")
let carroselRotaY;
let carroselPrevRotaY;
let carouselUpdtID;

// startVal
let carMouseDown = false;
let currentMousePos = 0;
let lastMousePos = 0;
let lastMoveTo = 0;
let moveTo = 0;

const createcarrossel = () => {
  const carrosselProps = onResize();
  const length = carrosselItems.length; // length array
  const degress = 360 / length; // degree setup
  const gap = 20; // space between vinyls
  const tz = distanceZ(carrosselProps.w, length, gap);

  const fov = calculateFov(carrosselProps);
  const height = calculateHeight(tz);
  
  carContainer.style.width = tz * 2 + gap * length + (window.innerWidth < 1000?60:70) + "px";
  carContainer.style.height = height + (window.innerWidth < 1000?75:70) + "px";

  carrosselItems.forEach((item, i) => {
    const degressByItem = degress * i + "deg";
    item.style.setProperty("--rotatey", degressByItem);
    item.style.setProperty("--tz", tz + "px");
    item.firstElementChild.dataset.permaid = degress * i;
  });

  carrosselFlip.forEach((item, i) => {
    const degressByItem = degress * i + "deg";
    const angleCheck = degress*i>=180?true:false;
    item.style.setProperty("--rotatey", degressByItem) 
    /* item.style.setProperty("--tz", ((i%2===0?tz:0 )- 2)*(angleCheck?-1:1)  + "px")  */
    item.style.setProperty("--tz", ((i%2===0?tz:0 )- 2)*(angleCheck?1:-1)  + "px") 
    item.style.left = (`${(i%2===0?0:tz - 1)*(angleCheck?1:-1)}px`)
/*    item.style.setProperty("--tz", (tz-tz*i) + "px") 
    item.style.left = (`${(tz*i)}px`) */
  });
};

/* 
if deg >= 180

tz * degress*i>=180?-1:1
left *degress*i>=180?-1:1
*/

// anim play
const lerp = (a, b, n) => {
  return n * (a - b) + b;
};

// https://3dtransforms.desandro.com/carousel
const distanceZ = (widthElement, length, gap) => {
  return widthElement / 2 / Math.tan(Math.PI / length) + gap; // item distance calc
};

// perspective according to dist
const calculateHeight = (z) => {
  const t = Math.atan((90 * Math.PI) / 180 / 2);
  const height = t * 2 * z;

  return height;
};

// FOV of carousel items
const calculateFov = (carrosselProps) => {
  const perspective = window
    .getComputedStyle(containercarrossel)
    .perspective.split("px")[0];

  const length =
    Math.sqrt(carrosselProps.w * carrosselProps.w) +
    Math.sqrt(carrosselProps.h * carrosselProps.h);
  const fov = 2 * Math.atan(length / (2 * perspective)) * (180 / Math.PI);
  return fov;
};

// pos-x depending on left or right
const getPosX = (x) => {
  currentMousePos = x;

  moveTo = currentMousePos < lastMousePos ? moveTo - 2 : moveTo + 2;

  lastMousePos = currentMousePos;
};

const update = () => { //constant runner. start or pause at will
  cancelAnimationFrame(carouselUpdtID)
  lastMoveTo = lerp(moveTo, lastMoveTo, 0.05);
  carrossel.style.setProperty("--rotatey", lastMoveTo + "deg");
  carrossel.style.transform = `rotateY(${lastMoveTo}deg)`
  carouselUpdtID = requestAnimationFrame(update);
};

const onResize = () => {
  // size of carousel container
  const boundingcarrossel = containercarrossel.getBoundingClientRect();

  const carrosselProps = {
    w: boundingcarrossel.width,
    h: boundingcarrossel.height,
  };

  return carrosselProps;
};


containercarrossel.addEventListener("mouseover", ()=>{
  carrossel.classList.toggle("carrosselAutoRotate", false)
  /* carrossel.style.setProperty("--rotatey", lastMoveTo + "deg"); */
})
/* containercarrossel.addEventListener("mouseout", ()=>{carrossel.classList.toggle("carrosselAutoRotate", true)})   */

const initEvents = () => {
  // mouseVer
  carrossel.addEventListener("mousedown", () => {
    carMouseDown = true;
    carrossel.style.cursor = "grabbing";
  });
  carrossel.addEventListener("mouseup", () => {
    carMouseDown = false;
    carrossel.style.cursor = "grab";
  });
  carContainer.addEventListener("mouseleave", () => (carMouseDown = false));

  carrossel.addEventListener(
    "mousemove",
    (e) => carMouseDown && getPosX(e.clientX)
  );

  // touchVer
  function handleTouchMove(event) {
    event.preventDefault();
    console.log('Touch move on special element');
    // Your custom logic for touch move
  }
  carrossel.addEventListener('touchmove', handleTouchMove, { passive: false });

  carrossel.addEventListener("touchstart", (event) => {
    carMouseDown = true;
    carrossel.style.cursor = "grabbing";
  });
  carrossel.addEventListener("touchend", (event) => {
    carMouseDown = false;
    carrossel.style.cursor = "grab";
  });
  carContainer.addEventListener(
    "touchmove",
    (e) => carMouseDown && getPosX(e.touches[0].clientX)
  );

  window.addEventListener("resize", createcarrossel); 

  update();
  createcarrossel();
};



//event.preventDefault();
