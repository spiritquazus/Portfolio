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

function dispel(_elem, _func, _bool){
    document.addEventListener("click", ()=>{
        _elem.style.opacity = 0
        setTimeout(()=>{_elem.style.display="none"}, 500)
        if (_func)_func(_bool)
    }, {once: true})
    document.addEventListener('touchstart', (event) => {
        _elem.style.opacity = 0
        setTimeout(()=>{_elem.style.display="none"}, 500)
        if (_func)_func(_bool)
    }, {once: true})
}

export function spawnCV(){
    pfCV.style.opacity = 1;
    pfCV.style.display = "grid";
    setTimeout(()=>{
        despawnCV(false)
        dispel(pfCV, despawnCV, true)
    }, 300)
}

function despawnCV(_bool){
/*     styleQuotes[0].classList.toggle("rightLeftAnim", _bool)
    styleQuotes[1].classList.toggle("leftRightAnim", _bool) */
    photoID.classList.toggle("opacityAnim", _bool)
    sideText.forEach((elem)=>{elem.classList.toggle("rightLeftAnim", _bool)})
    blockText.forEach((elem)=>{elem.classList.toggle("leftRightAnim", _bool)})
    munitoriumCV.forEach((elem)=>{elem.classList.toggle("topBottomAnim", _bool)})
    techStackShow.classList.toggle("bottomTopAnim", _bool)
}

export function spawnContact(){
    pfContact.style.opacity = 1;
    pfContact.style.display = "grid";
    setTimeout(()=>{
        dispel(pfContact)
    }, 300)
}

export function spawnProjects(){
    pfProjects.style.opacity = 1;
    pfProjects.style.display = "grid";
    setTimeout(()=>{
        dispel(pfProjects)
    }, 300)
}
