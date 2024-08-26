import {welcomeStartUp, loadAllModels, animateMain, camWarmUp} from "./3jsMain.js" //cancel
import { BGscene } from "./3jsScene.js";

function currDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
}
estDate.innerHTML = `EST ${currDate()}`

function dispel(_elem){
    document.addEventListener("click", ()=>{
        _elem.style.opacity = 0
        setTimeout(()=>{_elem.style.display="none"}, 500)
    }, {once: true})
    document.addEventListener('touchstart', (event) => {
        _elem.style.opacity = 0
        setTimeout(()=>{_elem.style.display="none"}, 500)
    }, {once: true})
}

export function spawnCV(){
    pfCV.style.opacity = 1;
    pfCV.style.display = "grid";
    setTimeout(()=>{
        styleQuotes[0].classList.toggle("rightLeftAnim")
        styleQuotes[1].classList.toggle("leftRightAnim")
        photoID.classList.toggle("opacityAnim")
        sideText.forEach((elem)=>{elem.classList.toggle("rightLeftAnim")})
        blockText.forEach((elem)=>{elem.classList.toggle("leftRightAnim")})
        dispel(pfCV)
    }, 300)

}


