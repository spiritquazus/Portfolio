function detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    let deviceType = 'unknown';
    
    const isIpad = /iPad|Macintosh/i.test(userAgent) && 'ontouchend' in document;
    const isMobile = /iPhone|iPod|Android|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    const isTablet = /iPad|Tablet|PlayBook|Silk/i.test(userAgent) || 
                     (isIpad && (window.innerWidth <= 1024 && window.innerHeight <= 1366));

    switch (true) {
      case isMobile:
        deviceType = 'mobile';
        break;
      case isTablet:
        deviceType = 'tablet';
        break;
      case !isMobile && !isTablet:
        deviceType = 'desktop';
        break;
      default:
        deviceType = 'unknown';
        break;
    }

    return deviceType;
}

 

console.log("DXM: gFloat activated. Have fun! Original work by Hyperplexed and Camille")

let mouseDownChk = false;
function gFloatHandleOnDown(e) {
    const _container = this;
    _container.dataset.mouseDownAt = e.clientX;
    mouseDownChk = true;
}

function gFloatHandleOnUp(e) {
    const _container = this;
    mouseDownChk = false;
    _container.dataset.mouseDownAt = "0";  
    _container.dataset.prevPercentage = _container.dataset.percentage;
}

function gFloatHandleOnMove(e) {
    if(!mouseDownChk) return;
    
    const _container = this;

    const mouseDelta = parseFloat(_container.dataset.mouseDownAt) - e.clientX;
    const maxDelta = window.innerWidth / 2;
    const percentage = (mouseDelta / maxDelta) * -100;
    const nextPercentageUnconstrained = parseFloat(_container.dataset.prevPercentage) + percentage;
    const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -50);

    _container.dataset.percentage = nextPercentage;
    _container.animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    document.getElementById("gallerySliderExtra").animate({
        transform: `translate(${nextPercentage}%, -50%)`
    }, { duration: 1200, fill: "forwards" });

    for(const _img of _container.getElementsByClassName("sliderImg")) {
        _img.animate({
            objectPosition: `${100 + nextPercentage}% center`
        }, { duration: 1200, fill: "forwards" });
    }
}

function gFloatAssign(_container){
    _container.onmousedown = gFloatHandleOnDown;
    _container.onmousemove = gFloatHandleOnMove;
    _container.onmouseup = gFloatHandleOnUp;
    _container.ontouchstart = gFloatHandleOnDown;
    _container.ontouchmove = console.log("TEST")
    _container.ontouchmove = gFloatHandleOnMove;
    _container.ontouchend = gFloatHandleOnUp;
    _container.draggable = false;
    _container.dataset.prevPercentage = 0;
}

const gallerySlider1 = document.getElementById('gallerySlider1'),
sliderCont = Array.from(document.querySelectorAll(".sOpen")),
sliderVinyls = Array.from(document.querySelectorAll(".vinyl"));

const deviceType = detectDevice();

if (gallerySlider1) {
  gallerySlider1.setAttribute('data-device', deviceType);
  sliderVinyls.forEach((elem)=>elem.setAttribute('data-device', deviceType))
}

gFloatAssign(gallerySlider1)


document.documentElement.style.setProperty('--device-type', deviceType);
console.log(`Visitor type: ${deviceType}.`);



sliderCont.forEach(((elem, i)=>{
    if (Object.keys(elem.dataset).length > 0){
        elem.addEventListener("mouseup", (event)=>{
            moveToPage(event.currentTarget.dataset.redir)
        })
        elem.addEventListener("mouseover", (event)=>{
            sliderVinyls[i].classList.toggle("projectFocus")
        })
        elem.addEventListener("mouseout", (event)=>{
            sliderVinyls[i].classList.toggle("projectFocus")
        })
    }
}));


gallerySlider1.animate({
    transform: `translate(${-25}%, -50%)`
}, { duration: 600, fill: "forwards" });

document.getElementById("gallerySliderExtra").animate({
    transform: `translate(${-25}%, -50%)`
}, { duration: 600, fill: "forwards" });

