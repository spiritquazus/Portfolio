
const dxmEyeLid = document.getElementById("DXMpart3"), 
    dxmEye = document.getElementById("DXMpart4"),
    dxmInteractive = document.getElementById("DXMInteractive"), 
    dxmEyeBoundaries = document.getElementById("socketBound"),
    dxmEyeSocket = document.getElementById("DXMpart2")

const bodyDOM = document.getElementsByTagName("body")[0],
    bodyCover = document.getElementById("bodyCover"),
    greetingsMsg = document.getElementById("greetingsMsg"),
    sideBarIntro = document.getElementById("sideBarIntro"),
    contactIntro = document.getElementById("contactIntro"),
    botBarIntro = document.getElementById("botBarIntro"),
    rootCSS = document.querySelector(':root')

const langCont = document.getElementById("langCont")
const chooseCont = document.getElementById("chooseCont")
const choose3d = document.getElementById("choose3d")
const chooseMobile = document.getElementById("chooseMobile")
const floatPoint = Array.from(document.getElementsByClassName("floatPoint"))

const mQuery = window.matchMedia("(orientation: landscape)");
if (mQuery.matches + "landscape"){

}
let introTune = new Audio();

/* const handLeft = document.getElementById("handLeft"), handRight = document.getElementById("handRight"), handsCont = document.getElementById("handsCont") */

dxmEye.style.left = `${dxmEyeBoundaries.getBoundingClientRect().left}px`;
dxmEye.style.top = `${dxmEyeBoundaries.getBoundingClientRect().top}px`;
introStartupAnim();

async function introStartupAnim(){
    langCont.style.opacity = "1"
    bodyCover.style.opacity="0.9"
    dxmInteractive.style.opacity = "1"
    botBarIntro.style.opacity = "1"
    dxmInteractive.style.transform="translateY(-10vh)"
    dxmEyeSocket.style.display = "none"
    dxmEye.style.display = "none"
    dxmEyeLid.style.display = "flex"
    sideBarIntro.style.transform="translateX(10vh)"
    floatPoint.forEach((elem)=>{
        elem.style.transform="translateX(30vh)"
    })
    await new Promise(resolve => setTimeout(resolve, 500))
        dxmInteractive.style.transition = "transform 0.5s ease-in-out";
        dxmInteractive.style.transform = "translateY(0vh)";
    await new Promise(resolve => setTimeout(resolve, 600))
        dxmEyeSocket.style.display = "flex"
        dxmEyeLid.style.display = "none"
        dxmEye.style.display = "flex"
        dxmEye.style.left = `${dxmEyeBoundaries.getBoundingClientRect().left}px`;
        dxmEye.style.top = `${dxmEyeBoundaries.getBoundingClientRect().top}px`; 
}


function eyeSpy(e, _elem, _cont){
    const _contRect = _cont.getBoundingClientRect();
    const _radius = _contRect.height / 2;
    const _centerX = _contRect.left + _contRect.width / 2;
    const _centerY = _contRect.top + _contRect.height / 2;

    const _eyeRect = _elem.getBoundingClientRect();

    const mouseX = e.clientX - _eyeRect.width / 2;
    const mouseY = e.clientY - _eyeRect.height / 2;

    const _dist = Math.sqrt(
        Math.pow(mouseX - _centerX, 2) + Math.pow(mouseY - _centerY, 2) //get distance of cursor to center of eyesocket
    );

    let _gakdo = Math.atan2(mouseY - _centerY, mouseX - _centerX); //각도 of the mouse... thx stackoverflow for below calcs..
    
    const _constrictor = Math.min(_dist, _radius); // Constrain distance to be within the circle's radius

    // Calculate new coordinates within the circle
    const newX = _centerX + _constrictor * Math.cos(_gakdo);
    const newY = _centerY + _constrictor * Math.sin(_gakdo);

    // Set new coordinates for the element
    _elem.style.left = `${newX - _elem.offsetWidth / 2}px`;
    _elem.style.top = `${newY - _elem.offsetHeight / 2}px`;

}

function eyeBlink(_mainCont, _mainContAfter, _elem, _cont){
    let _localVar;
    let _intervalMil = 2500
    _localVar = setInterval(()=>{
        _localVar?clearInterval(_localVar):_localVar
        _localVar = setInterval(()=>{
            _mainCont.style.display = "none"
            _elem.style.display = "none"
            _mainContAfter.style.display = "flex"
            _intervalMil = Math.floor(Math.random()*(8000 - 3500))+3500
            setTimeout(()=>{
                _mainCont.style.display = "flex"
                _elem.style.display = "flex"
                _elem.style.left = `${_cont.getBoundingClientRect().left}px`;
                _elem.style.top = `${_cont.getBoundingClientRect().top}px`;
                _mainContAfter.style.display = "none"
            },300)          
        }, _intervalMil)
    }, _intervalMil)
}

function activeEye(_elem, _cont, _mainCont, _mainContAfter){
    document.addEventListener("mousemove",(event)=>eyeSpy(event,_elem,_cont))
    eyeBlink(_mainCont, _mainContAfter, _elem, _cont)
}


activeEye(dxmEye, dxmEyeBoundaries, dxmEyeSocket, dxmEyeLid)

/* function eyeSpy(e,_elem,_boundaries){
    const _eyeRect = _elem.getBoundingClientRect();
    const _socket = _boundaries.getBoundingClientRect();
    let yVal = e.clientY - _eyeRect.height/2
    let xVal = e.clientX - _eyeRect.width/2
    yVal = yVal<_socket.bottom ? yVal : _socket.bottom
    yVal = yVal>_socket.top ? yVal : _socket.top
    xVal = xVal<_socket.right ? xVal : _socket.right
    xVal = xVal>_socket.left ? xVal : _socket.left
    _elem.style.top = `${yVal}px`
    _elem.style.left = `${xVal}px`
} */

function contLangShow(_lang){
    chooseCont.style.display = "flex";
    Array.from(document.getElementsByClassName("lineUp")).forEach((elem)=>{elem.style.opacity="1"})
    setTimeout(()=>{
        chooseMobile.style.opacity = 1;
        choose3d.style.opacity = 1;
    }, 100)
    langCont.style.opacity = 0;
    setTimeout(()=>{langCont.style.display = "none"},500)

    switch(_lang){
        case "english":           
            bodyDOM.style.backgroundImage = "url(../../gallery/2dElems/bg_london.jpg)"
            chooseMobile.innerText = "Mobile/Static Portfolio"
            choose3d.innerText = "3D Portfolio (You have a decent computer)"
            greetingsMsg.innerHTML = "<p>Portfolio</p><p>Isaac Kim</p>"
            break;

        case "french":
            bodyDOM.style.backgroundImage = "url(../../gallery/2dElems/bg_louvre.jpg)"
            chooseMobile.innerText = "Portfolio Statique"
            choose3d.innerText = "Portfolio en 3D (Three.js)"
            greetingsMsg.innerHTML = "<p>Portfolio de</p><p>Isaac Kim</p>"
            rootCSS.style.setProperty("--font-primary", "Zen Antique, serif")
            introTuneLoad("fr_scnf.mp3")
            contactIntro.innerHTML=`
    <div><img><span>Téléphone: </span><span>+82 10-2515-9789 (Corée du Sud)</span></div>
    <div><img><span>Adresse Mail: </span><span>kimisaac010@gmail.com</span></div>
    <div><img><span>Relocation en France possible</span></div>
    `
            break;

        case "korean":
            bodyDOM.style.backgroundImage = "url(../../gallery/2dElems/bg_seoul.jpg)"
            chooseMobile.innerText = "포트폴리오 링크"
            choose3d.innerText = "3D 포트폴리오 링크"
            greetingsMsg.innerHTML = "<p>김이작의</p><p>포트폴리오</p>"
            rootCSS.style.setProperty("--font-primary", "Song Myung, serif")
            introTuneLoad("kr_지하철.mp3")
            contactIntro.innerHTML=`
    <div><img><span>전화: </span><span>010-2515-9789</span></div>
    <div><img><span>이메일: </span><span>kimisaac010@gmail.com</span></div>
    <div><img><span>현재 거주지: </span><span>서울시 용산구</span></div>
    `
            break;

        case "japanese":
            bodyDOM.style.backgroundImage = "url(../../gallery/2dElems/bg_tokyo.jpg)"
            chooseMobile.innerText = "ポートフォリオ"
            choose3d.innerText = "3D ポートフォリオ"
            greetingsMsg.innerHTML = "<p style='font-size: 0.6rem'>キムアイザックの</p><p style='font-size: 1rem'>ポートフォリオ</p>"
            rootCSS.style.setProperty("--font-primary", "Zen Antique, serif")
            introTuneLoad("jp_JR東京.mp3")
            contactIntro.innerHTML=`
    <div><img><span>連絡先: </span><span>+82 10-2515-9789</span></div>
    <div><img><span>メール: </span><span>kimisaac010@gmail.com</span></div>
    <div><img><span>日本に移住可能</span></div>
    `
            break;
    };
    contactIntro.style.transform="translateX(0vh)"
    
}

function redirBtn(_route){
    chooseCont.style.transform = "scale3d(0, 0.9, 0.4)";
/*     handLeft.style.transform = "translateX(52vw)"
    handRight.style.transform = "translateX(-52vw)"
    handsCont.style.opacity = "1" */
    bodyDOM.style.opacity = "0"  
    setTimeout(()=>{
        window.location.href = `http://www.w3schools.com`; 
    },1200)

    
}

function redirBtnExt(_route){
    window.location.href = _route
}

function introTuneLoad(_url){
    introTune.src = "../../gallery/SFX/" + _url
    introTune.volume = "0.3"
    introTune.onloadedmetadata = function(){
        introTune.play()
    }
    introTune.load()   
}



function mediaChange(event) {
    if (event.matches) {
        console.log("Landscape mode");
    } else {
        console.log("Portrait mode");
    }
}
