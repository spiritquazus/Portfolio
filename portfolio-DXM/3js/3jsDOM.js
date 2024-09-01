const cMain = document.getElementById("cMain"),
    threeLoadingScreen = document.getElementById("threeLoadingScreen"),
    threeIntroText = document.getElementById("threeIntroText"),
    estDate = document.getElementById("est-date"),
    ui2d = document.getElementById("ui2d"),
    threeEditorMode = document.getElementById("threeEditorMode"),
    threePerfChecker = document.getElementById("threePerfChecker"),
    threeSound = document.getElementById("threeSound"),
    threeSpeech = document.getElementById("threeSpeech"),
    threeBloom = document.getElementById("threeBloom"),
    threeBokeh = document.getElementById("threeBokeh"),
    loadTimeDisplay = document.getElementById("loadTimeDisplay"),
    assetLoadDisplay = document.getElementById("assetLoadDisplay"),
    perfScoreDisplay = document.getElementById("perfScoreDisplay"),
    kontrolMsg = document.getElementById("kontrolMsg")
;

const pfCV = document.getElementById("pf-page1"),
    /* styleQuotes = Array.from(pfCV.getElementsByClassName("styleQuote")), */
    photoID = document.getElementById("photoID"), /* opacityAnim */
    sideText = Array.from(pfCV.getElementsByClassName("sideText")), /* all rightLeftAnim */
    blockText = Array.from(pfCV.getElementsByClassName("blockText")), /* all leftRightAnim */
    munitoriumCV = Array.from(pfCV.getElementsByClassName("munitorium")),
    techStackShow = pfCV.getElementsByClassName("techStackShow")[0],
    btnCloseCV  = document.getElementById("btn-closeCV")
;

const pfContact = document.getElementById("pf-page2"),
btnCloseContact  = document.getElementById("btn-closeContact")
;

const pfProjects = document.getElementById("pf-page3"),
btnCloseProj = document.getElementById("btn-closeProj")
;

window.userDevice = "PC"
window.perfCheck = {"start": performance.now()};
detectMobile()

function detectMobile(){
    const agent = navigator.userAgent || navigator.vendor || window.opera; 
    const touchAvail = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const screenChk = window.innerWidth <= 800;
  
    if (/android|iphone|ipad|ipod|iemobile|windows phone/i.test(agent) || touchAvail || screenChk) {
      userDevice = "mobile" //bit rough need to adjust the judgement factor
    } else {
        userDevice = "PC"
    }
}

let startTime = Date.now();
let assetLoadCheck = Date.now();
console.log("assetLoadCheck? ", assetLoadCheck)


function randInt(_max, _min){
    return Math.floor(Math.random()*(_max - _min + 1))+_min // INCLUSIVE
}

let loadCompletion = 0;
function loadProg(_val){
    loadCompletion += _val
    console.log("loadCompletion: ", loadCompletion)
    loadBarInner.style.width = loadCompletion + "%"
    if (loadCompletion == 100){
        loadCompletion = null;
    }
}

function loadSignal(){

}