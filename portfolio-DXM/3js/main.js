import {welcomeStartUp, loadAllModels, animateMain} from "./3jsMain.js"
import { BGscene } from "./3jsScene.js";

function currDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
}
estDate.innerHTML = `EST ${currDate()}`

async function firstLoad(){
    await loadAllModels()
    threeLoadingScreen.style.opacity = "0"
    threeIntroText.style.opacity = "1" 
    document.addEventListener("keydown", startApp);
    document.addEventListener("click", startApp);
    document.addEventListener("touchstart", startApp);
    animateMain()
}

function startApp(event) {
    event.preventDefault();
    threeIntroText.style.opacity = "0"
    document.removeEventListener("keydown", startApp);
    document.removeEventListener("click", startApp);
    document.removeEventListener("touchstart", startApp);
    welcomeStartUp()
}




console.log("Starting up")
firstLoad()