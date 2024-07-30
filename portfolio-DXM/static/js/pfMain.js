let deviceType = detectDevice();
let typingInterval;
let typingIntervalBis;


const translatorObj = {
    triviaPrev: 0,

    "greetings": "Nice to meet you, I am",

    "dxmTrivia0": "The decorative texts around the screen may seem like fluff, but they actually either represent stylistic choices or the credits.",
    "dxmTrivia1": 'The primary font used is "Bebas Neue", then "Geist" and "Anderson Grotesk".',
    "dxmTrivia2": "You can click on the hamburger menu, located in the top-right of the screen, to access additional settings.",
    "dxmTrivia3": "I'd recommend turning sound on for a more immersive experience during your browsing of this portfolio.",
    "dxmTrivia4": "This website was designed with vanilla JavaScript, with no frameworks or libraries other than my owns.",
    "dxmTrivia5": "Interestingly, I've never lived or even visited a mainly English-speaking country before. Not even the United Kingdoms!",

    "dxmSpeech1": "Welcome to my portfolio! Additional explanations will be written here. Click on me (the triangle staring at you) for some extra info."
}

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

 /* 

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





if (gallerySlider1) {
  gallerySlider1.setAttribute('data-device', deviceType);
  sliderVinyls.forEach((elem)=>elem.setAttribute('data-device', deviceType))
}

gFloatAssign(gallerySlider1)


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


 */

const gallerySlider1 = document.getElementById('gallerySlider1'),
    sliderCont = Array.from(document.querySelectorAll(".sOpen")),
    sliderVinyls = Array.from(document.querySelectorAll(".vinyl")),
    greetingsF = document.getElementById("greetingsF"),
    page1 = document.getElementById("pf-page1"),
    speechText = document.getElementById("speechText"),
    dxmIcon = document.getElementById("DXM-nest"),
    sideBar = document.getElementById("pf-sideBar"),
    btnHam = document.getElementById("btn-hamburger"),
    btnHamIn = document.getElementById("nav-close-button"),
    DXMsmolEye = document.getElementById("DXM-smol1"),
    DXMsmolBlink = document.getElementById("DXM-smol2"),
    DXMsmolPupil = document.getElementById("DXM-smol3"),
    blockTexts = Array.from(document.getElementsByClassName("blockText")),
    sideTexts = Array.from(document.getElementsByClassName("sideText")),
    styleQuotes = Array.from(document.getElementsByClassName("styleQuote")),
    photoID = document.getElementById("photoID")
;

document.documentElement.style.setProperty('--device-type', deviceType);
console.log(`Visitor type: ${deviceType}.`);


function lockOrientation() {
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(err => {
        console.error('Orientation lock failed:', err);
      });
    } else {
      console.warn('Orientation lock not supported');
    }
  }

function enforceLandscape() {
    if (window.innerHeight > window.innerWidth) {
        document.querySelector('.landscape-message').style.display = 'flex';
        /* document.querySelector('.content').style.display = 'none'; */
    } else {
        document.querySelector('.landscape-message').style.display = 'none';
       /*  document.querySelector('.content').style.display = 'block'; */
    }
}

window.addEventListener('resize', enforceLandscape);
window.addEventListener('orientationchange', enforceLandscape);

// Initial checks
enforceLandscape();
lockOrientation();


let scrollTimeout;
document.addEventListener("wheel", (event)=>{
    event.preventDefault()
    if (scrollTimeout) clearTimeout(scrollTimeout);
    window.scrollTo({left: window.scrollX + event.deltaY*15, behavior: "smooth"})

    scrollTimeout = setTimeout(() => {
        pageSnap();
    }, 600);

}, { passive: false})

function pageSnap() {
    const pageWidth = window.innerWidth; 
    const currentScrollX = window.scrollX;
    const nearestPage = Math.round(currentScrollX / pageWidth);

    window.scrollTo({
        left: nearestPage * pageWidth,
        behavior: 'smooth'
    });
}

function greetingsChange(){
    greetingsF.classList.toggle("greetingsAnim")
    const _translate = setInterval(()=>{
        console.log("triggering greetings")
        
        if (greetingsArr.length > 1){
            const _rand = Math.floor(Math.random()*greetingsArr.length)
            greetingsF.innerText = greetingsArr[_rand]
            greetingsArr.splice(_rand, 1)
        } else {
            greetingsF.innerText = translatorObj.greetings
            clearInterval(_translate)
        }
    }, 200)
}
greetingsChange()

let greetingsArr = ["Hello", "Nice to see you!", "Welcome", "Bonjour", "Bienvenue", "Guten Tag", "Willkommen", "Bienvenido", "こんにちは", "おはようございます", "ようこそ", "안녕하세요", "환영합니다", "Ciao", "Olá", "Merhaba", "Salam", "שלום", "Здравствуй", "Привет", "안녕하십니까", "Tere", "Sawasdee", "Hej", "Welcome", "Cześć", "Aloha", "Hei", "Helo", "Xin Chào", "Ola"]

function typeScroll(_text){
    const _arr = _text.innerText.split("")
    _text.innerText = ""
    let i = 0
    const typeInt = setInterval(()=>{
        _text.innerText += _arr[i]
        i++
        if (i>=_arr.length){
            clearInterval(typeInt)
        }
    }, 150) 
    
}

function spawnElem(_elem, _direction){ //removes translate that moves them out of screen with opacity 0
    console.log("TRIGGERING SPAWNELEM", _elem)
    switch(_direction){
        case "top":
            _elem.classList.toggle("topBottomAnim")
            break;
        case "bottom":
            _elem.classList.toggle("bottomTopAnim")
            break;
        case "left":
            console.log("REMOVING LEFTRIGHT")
            _elem.classList.toggle("leftRightAnim")
            break;
        case "right":
            _elem.classList.toggle("rightLeftAnim")
            break; 
        case "opacity":
            _elem.classList.toggle("opacityAnim")
            break;
    }
}

/* async function typeScroll(_text, _typeInterval, _newText, noClear) {
    return new Promise((resolve) => {
        if (typingInterval){
            clearInterval(typingInterval)
        }
        const _arr = _newText?_newText:_text.innerText
        const characters = _arr.split("")
        _text.innerText = ""
        _text.style.opacity = 1;
        let index = 0
        _typeInterval = _typeInterval?_typeInterval:150

        
        const typeChar = () => {
            
            
            if (index < characters.length) {
                _text.innerText += characters[index]
                index++;
            } else {
                if (noClear){
                    clearInterval(typingIntervalBis)
                } else {
                    clearInterval(typingInterval)
                }
                resolve()
            }
        };

        if (noClear){
            typingIntervalBis = setInterval(typeChar, _typeInterval);
        } else {
            typingInterval = setInterval(typeChar, _typeInterval);
        }
    })
} */



document.addEventListener("DOMContentLoaded", async ()=>{
    
    btnHam.addEventListener("click", ()=>{
        sideBar.classList.toggle("nav-sidebar-toggle")
    })
    btnHamIn.addEventListener("click", ()=>{
        sideBar.classList.toggle("nav-sidebar-toggle")
    })
    
    setTimeout(async ()=>{

        document.getElementById("HL-Kim").style.opacity = "1"  
        await typeScroll(document.querySelector("#HL-Isaac"), 250, "", true)
        await typographer() //line stuff
        blockTexts.forEach((elem)=>spawnElem(elem, "left"))
        sideTexts.forEach((elem)=>spawnElem(elem, "right"))
        spawnElem(styleQuotes[0], "right")
        spawnElem(styleQuotes[1], "left")

        spawnElem(dxmIcon, "bottom")
        spawnElem(photoID, "opacity")
        typeScroll(speechText, 15, translatorObj["dxmSpeech1"])
        eyeBlink(DXMsmolEye, DXMsmolBlink, DXMsmolPupil)
        dxmIcon.addEventListener(("click"), ()=>{
            let _rand = Math.floor(Math.random()*6)
            while (_rand == translatorObj.triviaPrev){
                _rand = Math.floor(Math.random()*6)
            }
            translatorObj.triviaPrev = _rand
            typeScroll(speechText, 15, translatorObj[`dxmTrivia${_rand}`])
        })    

    }, 4000)
    
 
})





/* await typeScroll(speechText, 15, translatorObj["dxmSpeech1"]) */

  
async function typographer(){
    return new Promise((resolve)=>{
        for (i = 0; i<20; i++){
            console.log("!!creating line")
            const _line = document.createElement("div")
            _line.classList.add("style-lineHorFull")
            _line.classList.add("style-lineBase")
            _line.style.gridRow = `${i} / span 1`
            page1.appendChild(_line)

            const _lineVert = document.createElement("div")
            _lineVert.classList.add("style-lineVertFull")
            _lineVert.classList.add("style-lineBase")
            _lineVert.style.gridColumn = `${i} / span 1`
            page1.appendChild(_lineVert)
        }
        setTimeout(resolve,5000)
    })
}
  
async function typeScroll(_text, _typeInterval, _newText, noClear) {
    return new Promise((resolve) => {
        if (typingInterval) {
            clearInterval(typingInterval);
        }
        if (typingIntervalBis) {
            clearInterval(typingIntervalBis);
        }
        const _arr = _newText ? _newText : _text.innerText;
        const characters = _arr.split("");
        _text.innerText = "";
        _text.style.opacity = 1;
        let index = 0;
        _typeInterval = _typeInterval ? _typeInterval : 150;

        const typeChar = () => {
            if (index < characters.length) {
                _text.innerText += characters[index];
                index++;
            } else {
                if (noClear) {
                    clearInterval(typingIntervalBis);
                } else {
                    clearInterval(typingInterval);
                }
                resolve();
            }
        };

        if (noClear) {
            typingIntervalBis = setInterval(typeChar, _typeInterval);
        } else {
            typingInterval = setInterval(typeChar, _typeInterval);      
        }
        
    });
}