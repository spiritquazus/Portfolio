
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
    cvLinks = Array.from(document.querySelectorAll(".cvLink")),
    bodyBGFX = document.getElementById("bodyBGFX"),
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
    
    dxmInteractive.style.opacity = "1"
    botBarIntro.style.opacity = "1"
    dxmInteractive.style.transform="translateY(2vh)"
    dxmEyeSocket.style.display = "none"
    dxmEye.style.display = "none"
    dxmEyeLid.style.display = "flex"
    sideBarIntro.style.transform="translateX(0vh)"
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
            chooseMobile.onClick = () => userLangPref("");
            choose3d.innerText = "3D Portfolio (You have a decent computer)"
            greetingsMsg.innerHTML = "<p>Portfolio</p><p>Isaac Kim</p>"
            cvLinks.forEach((link)=>link.onclick=(()=>redirBtnExt('../txt/CV_IKY_fullStack_2024.pdf')))
            break;

        case "french":
            bodyDOM.style.backgroundImage = "url(../../gallery/2dElems/bg_louvre.jpg)"
            chooseMobile.innerText = "Portfolio Statique"
            choose3d.innerText = "Portfolio en 3D (Three.js)"
            greetingsMsg.innerHTML = "<p>Portfolio de</p><p>Isaac Kim</p>"
            rootCSS.style.setProperty("--font-primary", "Zen Antique, serif")
            cvLinks.forEach((link)=>link.onclick=(()=>redirBtnExt('../txt/CV_IKY_fullStack_2024.pdf')))
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
            chooseMobile.onclick = () => userLangPref("kor");
            choose3d.innerText = "3D 포트폴리오 링크"
            greetingsMsg.innerHTML = "<p>김이작의</p><p>포트폴리오</p>"
            rootCSS.style.setProperty("--font-primary", "Song Myung, serif")
            cvLinks.forEach((link)=>link.onclick=(()=>redirBtnExt('../txt/CV_IKY_KR.pdf')))
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
            cvLinks.forEach((link)=>link.onclick=(()=>redirBtnExt('../txt/CV_IKY_fullStack_2024.pdf')))
            introTuneLoad("jp_JR東京.mp3")
            contactIntro.innerHTML=`
    <div><img><span>連絡先: </span><span>+82 10-2515-9789</span></div>
    <div><img><span>メール: </span><span>kimisaac010@gmail.com</span></div>
    <div><img><span>日本に移住可能</span></div>
    `
            break;
    };
    contactIntro.style.transform="translateX(0vh), scaleX(-1)"
    bodyCover.style.opacity="0.85" 
    bodyBGFX.style.display="flex"
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
