let deviceType = detectDevice();
let typingInterval;
let typingIntervalBis;
let portraitMode = true;
let performanceMode = false;
let chatterMode = true;
let fullScreenMode = false;
let soundLevel = true;
let isMouseDown = false;
let holdTimeout;
const totalPg = Array.from(document.getElementsByClassName("pagination")).length
console.log("num of pages detected, ", totalPg)
window.userCurrentPage = 0;




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

document.documentElement.style.setProperty('--device-type', deviceType);
console.log(`Visitor type: ${deviceType}.`);


function lockOrientation() {
    if (screen.orientation && screen.orientation.lock) {
      screen.orientation.lock('landscape').catch(err => {
        console.warn('Orientation lock failed:', err);
        
      });
    } else {
      console.warn('Orientation lock not supported');
    }
  }

function enforceLandscape() {
    if (window.innerHeight > window.innerWidth) {
        document.querySelector('.landscape-message').style.display = 'grid';
        typeScroll(speechText, 15, translatorObj["dxmSpeech2"])
        portraitMode = true
        /* document.querySelector('.content').style.display = 'none'; */
    } else {
        document.querySelector('.landscape-message').style.display = 'none';
        portraitMode = false
       /*  document.querySelector('.content').style.display = 'block'; */
    }
}

async function awaitRotation(){
    return new Promise((resolve) => {
        const checkRotation = () => {
            if (!portraitMode) {
                resolve();
                console.log("Portrait Mode: ", portraitMode)
            } else {
                requestAnimationFrame(checkRotation);
            }
        };
        checkRotation();
    });
}

window.addEventListener('resize', enforceLandscape);
window.addEventListener('orientationchange', enforceLandscape);
/* document.addEventListener('visibilitychange', function() {
    playingBGM.volume = document.visibilityState === "visible" ? 0.3 : 0;
}); */

// Initial checks
enforceLandscape();
lockOrientation();


//testing
//window width: 1920

let scrollTimeout;

function pageSwitch(event, _dir){
    if (carMouseDown == false){
        if (scrollTimeout) clearTimeout(scrollTimeout);
        let leftVal;

        if (_dir){
            leftVal = pfPage1.clientWidth * _dir
        } else {
            leftVal = event.deltaY > 0 ? pfPage1.clientWidth: -pfPage1.clientWidth
        }

        pageContainer.scrollBy({
            left: leftVal,
            behavior: 'smooth'
        });
        
        scrollTimeout = setTimeout(() => {
            userCurrentPage =  Math.round(pageContainer.scrollLeft / pfPage1.clientWidth)
            
            console.log("user current page: ", userCurrentPage)
            console.log("current scrollX: ", pageContainer.scrollLeft)
        }, 500);   
    }
}

function enableScroll(){

    document.addEventListener("wheel", (event)=>{pageSwitch(event)
        /* event.preventDefault() */
        }, { passive: false})


    pageContainer.addEventListener("scroll", (event) => {
        if (holdTimeout) clearTimeout(holdTimeout);
        userCurrentPage = Math.round(pageContainer.scrollLeft / pfPage1.clientWidth);
        moveBG()
        const checkScrollEnd = () => {
            holdTimeout = setTimeout(() => {
                if (!isMouseDown) {
                    
                    pageSnap();
                } else {
                    // Keep checking if mouse is down
                    requestAnimationFrame(checkScrollEnd);
                }
            }, 400);
        };

        checkScrollEnd();
    }, { passive: false });
    }

function onPageChk(){
    //activate page funcs ⚠️
    switch (userCurrentPage){
        case 0:
            pageMovBtn[0].style.display="none"
            DXMspeech.style.transform = "translateX(0)"
            break;
        case 1:
            typeScroll(speechText, 15, translatorObj["dxmSpeech5"])
            break;
        case 2: //portfolio project page
            
            loadPPortGalleryLimit()
            typeScroll(speechText, 15, translatorObj["dxmSpeech4"])
            break;
    }
    if (userCurrentPage != 0){
        pageMovBtn[0].style.display="flex"
        DXMspeech.style.transform = "translateX(calc(-10vw - 1vh))"
        console.log("ACTIVATE, ", DXMspeech)
    } 
    if (userCurrentPage == totalPg-1){
        pageMovBtn[1].style.display="none"
    } else {
        pageMovBtn[1].style.display="flex"
    }
}

pageContainer.addEventListener('mousedown', () => {
    isMouseDown = true;
});

window.addEventListener('mouseup', () => {
    isMouseDown = false;
});

function moveBG(){
    document.body.style.backgroundPosition = `${Math.max(0,100-(pageContainer.scrollLeft / (pageContainer.offsetWidth * totalPg) * 100))}%, bottom`
/*     console.log("current at BG %: ", Math.max(0,100-(pageContainer.scrollLeft / pageContainer.offsetWidth * 100))) 
    console.log("WHAT IS SCROLL LEFT AND OFFSETWIDTH RESPECTIVELY: ", pageContainer.scrollLeft, pageContainer.offsetWidth) */
}

function pageSnap() {
    /* console.log("snapping to px value: ", userCurrentPage*pfPage1.clientWidth) */
    onPageChk()
    pageContainer.scrollTo({
        left: userCurrentPage*pfPage1.clientWidth,
        behavior: 'smooth'
    });
    
    
}



btnContact.addEventListener("click", (e)=>{spawnDropDown(e, btnContact.nextElementSibling)})
btnNavigation.addEventListener("click", (e)=>{spawnDropDown(e, btnNavigation.nextElementSibling)})
//btnAbout

function spawnDropDown(event, _elem) {
    const dropdown = _elem;
    dropdown.classList.toggle("style-collapsed", false);
    const _wrapperFunc = (e) => handleClickOutside(e, event.target, dropdown);
    document.addEventListener("click", _wrapperFunc);
    dropdown.__wrapperFunc = _wrapperFunc;
}

function handleClickOutside(event, _original, _dropdown) {
    if (!_dropdown.contains(event.target) && event.target !== _original) {
        _dropdown.classList.toggle("style-collapsed", true);
        document.removeEventListener("click", _dropdown.__wrapperFunc);
        delete _dropdown.__wrapperFunc;
    }
}


function photoScroll(event, _elem){
    _elem.style.backgroundPosition = `${Math.max(0, ((event.clientX/window.innerWidth)*100/1.2))}% ${Math.max(0, ((event.clientY/window.innerHeight)*100/1.2))}%` 
}



document.addEventListener("mousemove", (event)=>{photoScroll(event, carouselImg1)}) 
document.addEventListener("mousemove", (event)=>{photoScroll(event, carouselImg2)}) 
document.addEventListener("mousemove", (event)=>{photoScroll(event, carouselImg3)}) 
document.addEventListener("mousemove", (event)=>{photoScroll(event, carouselImg4)}) 

function greetingsChange(){
    greetingsF.classList.toggle("greetingsAnim")
    const _translate = setInterval(()=>{
        
        if (greetingsArr.length > 1){
            const _rand = Math.floor(Math.random()*greetingsArr.length)
            greetingsF.innerText = greetingsArr[_rand]
            greetingsArr.splice(_rand, 1)
        } else {
            greetingsF.innerText = translatorObj.greetings1
            clearInterval(_translate)
        }
    }, 120)
}


let greetingsArr = ["Welcome", "Bonjour", "Bienvenue", "Guten Tag", "Willkommen", "Bienvenido", "こんにちは", "おはようございます", "ようこそ", "안녕하세요", "환영합니다", "Salam", "שלום", "Здравствуй", "Привет", "Hej", "Welcome", "Cześć", "Hei"]

ctrPerf.addEventListener("click", togglePerfMode)
btnSidePerf.addEventListener("click", togglePerfMode)
ctrComments.addEventListener("click", toggleChatterMode)
ctrSound.addEventListener("click", toggleSounds)
btnSideSound.addEventListener("click", toggleSounds)
btnSideScreen.addEventListener("click", toggleFullScreen)
cooltipCraft(ctrPerf, "Performance Mode", {color:"grey"})
cooltipCraft(ctrComments, "Toggle Chatter", {color:"grey"})
cooltipCraft(ctrSound, "Mute/Allow Sound", {color:"grey"})


function spawnElem(_elem, _direction){ //removes translate that moves them out of screen with opacity 0
    switch(_direction){
        case "top":
            _elem.classList.toggle("topBottomAnim")
            break;
        case "bottom":
            _elem.classList.toggle("bottomTopAnim")
            break;
        case "left":
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
function toggleSounds(){
    if (soundLevel){
        allSounds.forEach((sfxType)=>{
            sfxType.pause();
            sfxType.volume = 0;
        })
        ctrSound.classList.toggle("filter-activated", true)
        btnSideSound.classList.toggle("filter-underlineLight", true)
        toggleIcon(btnSideSound, true)
        btnSideSound.previousElementSibling.src = "../../gallery/2dElems/iconSound2.svg"
        ctrSound.style.backgroundImage = "url(../../gallery/2dElems/iconSound2.svg)"
        soundLevel = false
    } else {
        allSounds.forEach((sfxType)=>{
            sfxType.volume = 1;
        })
        playingBGM.volume = 0.3
        try {
            playingBGM.play()
        } catch {
            console.log("No user interaction yet, sound will not play.")
        }
        ctrSound.classList.toggle("filter-activated", false)
        btnSideSound.classList.toggle("filter-underlineLight", false)
        toggleIcon(btnSideSound, false)
        playSFX(playSFXReact, "uiTap1.aac");
        btnSideSound.previousElementSibling.src = "../../gallery/2dElems/iconSound1.svg"
        ctrSound.style.backgroundImage = "url(../../gallery/2dElems/iconSound1.svg)"
        soundLevel = true
    }
}

function toggleChatterMode(){
    if (chatterMode){
        DXMspeech.style.display = "none"
        ctrComments.classList.toggle("filter-activated", true)
        chatterMode = false;
    } else {
        DXMspeech.style.display = "flex"
        ctrComments.classList.toggle("filter-activated", false)
        chatterMode = true;
        playSFX(playSFXReact, "uiTap1.aac");
    }
}


function togglePerfMode(){
    if(!performanceMode){
        Array.from(document.querySelectorAll(".performance-tag")).forEach((elem)=>{elem.style.display = "none"})
        if (soundLevel){
            toggleSounds()
        }
        DXMsmolCont.style.animation = "none"
        ctrPerf.classList.toggle("filter-activated", true)
        btnSidePerf.classList.toggle("filter-underlineLight", true)
        toggleIcon(btnSidePerf, true)
        performanceMode = true;
    } else {
        Array.from(document.querySelectorAll(".performance-tag")).forEach((elem)=>{elem.style.display = "block"})

        DXMsmolCont.style.animation = "DXM-float 5s infinite ease-in-out"
        ctrPerf.classList.toggle("filter-activated", false)
        btnSidePerf.classList.toggle("filter-underlineLight", false)
        toggleIcon(btnSidePerf, false)
        performanceMode = false
    } 
}

function toggleFullScreen(){
    if (!fullScreenMode){
        openFullscreen()
        fullScreenMode = true;
        btnSideScreen.classList.toggle("filter-underlineLight", true)
        toggleIcon(btnSideScreen, true)
    } else {
        closeFullscreen()
        fullScreenMode = false;
        btnSideScreen.classList.toggle("filter-underlineLight", false)
        toggleIcon(btnSideScreen, false)
    }
}

function toggleIcon(_elem, _bool){
    _elem.previousElementSibling.classList.toggle("filter-normalBright", _bool)
}


document.addEventListener("DOMContentLoaded", async ()=>{

    //first load
    

    btnHam.addEventListener("click", ()=>{
        sideBar.classList.toggle("nav-sidebar-toggle")
    })
    btnHamIn.addEventListener("click", ()=>{
        sideBar.classList.toggle("nav-sidebar-toggle")
    })

    console.log("first load")
    userSetLang();
    await awaitRotation()
    console.log("rotation solved.")
    greetingsChange()
    setTimeout(async ()=>{
        
        
        document.getElementById("HL-Kim").style.opacity = "1"  
        await typeScroll(document.querySelector("#HL-Isaac"), 200, "", true, "keyb2.aac")
        typeScroll(titleID, 180, "", true, "keyb2.aac")
        await typographer() //line stuff
        
        
        blockTexts.forEach((elem)=>spawnElem(elem, "left"))
        sideTexts.forEach((elem)=>spawnElem(elem, "right"))
        navBtns.forEach((elem)=>spawnElem(elem, "top"))
        spawnElem(styleQuotes[0], "right")
        spawnElem(styleQuotes[1], "left")

        spawnElem(dxmIcon, "bottom")
        spawnElem(photoID, "opacity")
        mainPfBtn.forEach((elem)=>spawnElem(elem, "top"))
        typeScroll(speechText, 15, translatorObj["dxmSpeech1"])
        eyeBlink(DXMsmolEye, DXMsmolBlink, DXMsmolPupil)
        pageContainer.style.overflowX = "scroll"
        enableScroll()
        playSFX(playingBGM, "Daisuke - El Huervo.aac")

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


function loadP2(){

}

const loadPPortGalleryLimit = funcLimiter(loadPPortGallery, 1, "animation")
async function loadPPortGallery(){
    initEvents();
    p3RightLeftAnim.forEach((elem)=>{
        elem.classList.toggle("rightLeftAnim")
    })
    await new Promise(resolve => setTimeout(resolve, 300));
    elemCascade(p3MassText, 0, 450)
    await new Promise(resolve => setTimeout(resolve, 3200));
    p3RightLeftAnim.forEach((elem)=>{
        elem.classList.toggle("rightLeftAnim")
    })
    p3SubGrid.classList.toggle("topBottomAnim")
}




/* await typeScroll(speechText, 15, translatorObj["dxmSpeech1"]) */

async function elemCascade(_arr, _index, _time, _fUpFunc, _fUpArgs){ //async recursive
    if (_arr[_index] != undefined){
        _arr[_index].style.display = "flex";
        playSFX(playSFXcinematic, "camerShutter.aac");
        await new Promise(resolve => setTimeout(resolve, _time));
        elemCascade(_arr, _index+1, _time)
    } else {
        setTimeout(()=>{
            _arr.forEach((elem)=>{
                elem.classList.toggle("rightLeftAnim")
            })
            if (_fUpFunc){
                _fUpFunc(..._fUpArgs)
            }
            //resolve()
        }, _time * 2.4)
    }
}

  
async function typographer(){
    return new Promise((resolve)=>{
        for (i = 0; i<20; i++){
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
  
async function typeScroll(_text, _typeInterval, _newText, noClear, _SFX) {
    if (performanceMode) return;
    try {
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
                    if(_SFX){
                        characters[index]==" "?playSFX(playSFXcinematic, "keyb3.aac"):playSFX(playSFXcinematic, _SFX);
                    }        
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
    } catch(error){
        console.log("typeScroll func did not run. See error: ", error)
    }
    
}