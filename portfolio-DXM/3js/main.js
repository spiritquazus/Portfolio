import {welcomeStartUp, loadAllModels, animateMain, camWarmUp, recoverCamera} from "./3jsMain.js" //cancel
import { BGscene } from "./3jsScene.js";

//to add to buttons:
btnCloseCV.addEventListener("click", ()=>{dispel(pfCV, despawnCV, true)})
btnCloseContact.addEventListener("click", ()=>{dispel(pfContact)})
btnCloseProj.addEventListener("click", ()=>{dispel(pfProjects)})

function currDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();

    return `${day}/${month}/${year}`;
}
estDate.innerHTML = `EST ${currDate()}`

/* function dispel(_elem, _func, _bool){
    document.addEventListener("click", ()=>{
        _elem.style.opacity = 0
        setTimeout(()=>{_elem.style.display="none"}, 500)
        if (_func)_func(_bool)
    }, {once: true})
    document.addEventListener('touchstart', (event) => {
        _elem.style.opacity = 0
        setTimeout(()=>{_elem.style.display="none"}, 500)
        if (_func)_func(_bool)
        recoverCamera()
    }, {once: true})
} */

function dispel(_elem, _func, _bool){
    _elem.style.opacity = 0
    setTimeout(()=>{_elem.style.display="none"}, 500)
    if (_func)_func(_bool)
    recoverCamera()
} 

export function spawnCV(){
    pfCV.style.opacity = 1;
    pfCV.style.display = "grid";
    setTimeout(()=>{
        despawnCV(false)
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
}

export function spawnProjects(){
    pfProjects.style.opacity = 1;
    pfProjects.style.display = "grid";
}
