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






