const cMain = document.getElementById("cMain"),
    threeLoadingScreen = document.getElementById("threeLoadingScreen"),
    threeIntroText = document.getElementById("threeIntroText"),
    estDate = document.getElementById("est-date"),
    threeEditorMode = document.getElementById("threeEditorMode")
;

let loadCompletion = 0;
function loadProg(_val){
    loadCompletion += _val
    console.log("loadCompletion: ", loadCompletion)
    loadBarInner.style.width = loadCompletion + "%"
    if (loadCompletion == 100){
        loadCompletion = null;
    }
}