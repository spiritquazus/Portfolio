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
    styleQuotes = Array.from(pfCV.getElementsByClassName("styleQuote")), /* [0] rightLeftAnim - [1] leftRightAnim */
    photoID = document.getElementById("photoID"), /* opacityAnim */
    sideText = Array.from(pfCV.getElementsByClassName("sideText")), /* all rightLeftAnim */
    blockText = Array.from(pfCV.getElementsByClassName("blockText")) /* all leftRightAnim */
;

let startTime = Date.now();
let assetLoadCheck = Date.now();
console.log("assetLoadCheck? ", assetLoadCheck)


function randInt(_max, _min){
    Math.floor(Math.random()*_max)+_min
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