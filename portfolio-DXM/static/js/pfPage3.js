carouselBtns[0].addEventListener(("click"), (e)=>{carouselRotate(-1, e)})
carouselBtns[1].addEventListener(("click"), (e)=>{carouselRotate(+1, e)})

let currentProjSum;

/* function carouselRotate(_dir, e){
    if (carrossel.classList.contains("carrosselAutoRotate")){
        carrossel.classList.toggle("carrosselAutoRotate")
    }
    cancelAnimationFrame(carouselUpdtID)
    e.target.style.pointerEvents = "none"

    const customRotateY = getComputedStyle(carrossel).getPropertyValue('--rotatey').trim()
    const customRotateYint = (parseInt(customRotateY.slice(0,-3), 10)) + 90 * _dir

    console.log("rotatey custom before func: ", parseInt(customRotateY.slice(0,-3), 10))
    

    carrossel.classList.toggle("carrossel-transit")
    
    carrossel.style.transform = `rotateY(${customRotateYint}deg)`

    console.log("rotatey custom after calc: ", customRotateYint)
    
    
    setTimeout(()=>{
        carrossel.classList.toggle("carrossel-transit")
        carrossel.style.setProperty('--rotatey', (customRotateYint)+ "deg")
        console.log("currentCarroselRotaY: ", customRotateYint)
        e.target.style.pointerEvents = "auto"
    }, 400)
} */

let latestRotate = false;

function carouselRotate(_dir, e) {
    if (carrossel.classList.contains("carrosselAutoRotate")) {
        carrossel.classList.toggle("carrosselAutoRotate")
    }
    let currentRotation
    cancelAnimationFrame(carouselUpdtID)
    e.target.style.pointerEvents = "none"
    
    const customRotateY = getComputedStyle(carrossel).getPropertyValue('--rotatey').trim();
    if (latestRotate){
        currentRotation = latestRotate
    } else {
        currentRotation = parseInt(customRotateY.slice(0, -3), 10);
    }
    
    const increment = 90 * _dir;
    let newRotation = currentRotation + increment
    
    newRotation = _dir === 1 
        ? Math.ceil(newRotation / 90) * 90 
        : Math.floor(newRotation / 90) * 90
    
    console.log("rotatey custom before func: ", currentRotation)

    carrossel.classList.toggle("carrossel-transit")
    carrossel.style.transform = `rotateY(${newRotation}deg)`
    
    console.log("rotatey custom after calc: ", newRotation)
    
    setTimeout(() => {
        carrossel.classList.toggle("carrossel-transit")
        carrossel.style.setProperty('--rotatey', `${newRotation}deg`);
        console.log("currentCarroselRotaY: ", newRotation)
        e.target.style.pointerEvents = "auto"       
        latestRotate = newRotation
    }, 400);
}

carrossel.addEventListener("mousedown", update)

function roundVal(value, multiple) {
    return Math.ceil((value + 1) / multiple) * multiple;
}

function renderProjSummary(_elem){
    if (currentProjSum != _elem.dataset.redir){
        setTimeout((hideLines("pf3 subgrid main")), 3000)
        playSFX(playSFXcinematic, "stamp2.aac");
        currentProjSum = _elem.dataset.redir
        projSumTitle.innerText=translatorObj[`${_elem.dataset.redir}SumTitle`]
        projSumDesc.innerText =translatorObj[`${_elem.dataset.redir}SumDesc`]
        projSumList.innerHTML = translatorObj[`${_elem.dataset.redir}SumList`]
        projSumRedir.style.opacity = "1"
        p3SubGrid.style.transform = "translateX(calc(15vw + 1.5vh))"
        projectsSummary.style.opacity = "1"
        projectsSummary.style.width = "150%"
        let redirSpecial;
        switch (_elem.dataset.redir) {
            case "3dPort":
                redirSpecial = () => { redirBtnExt(urlSetup.ext3d, true) };
                break;
            case "hoga":
                redirSpecial = () => { redirBtnExt(urlSetup.extHoga, true) };
                break;
            case "psyP":
                redirSpecial = () => { redirBtnExt(urlSetup.extPsychoPhobia, true) };
                break;
            case "blackPeach":
                redirSpecial = () => { alert("Sorry, this project is still in preparation!") };
                break;
        }
        // Ensure that redirSpecial is a function before assigning it to onclick
        if (typeof redirSpecial === "function") {
            projSumRedir.onclick = redirSpecial;
        } else {
            console.error("redirSpecial is not a function");
        }
        setTimeout(()=>{
            carouselBGsetup.style.backgroundImage = `url(../../gallery/2dElems/${_elem.dataset.bgsetup})`
            carouselBGsetup.style.opacity = "0.8"
            p3FocalArrows.forEach((arrow)=>arrow.style.opacity="1")
        }, 400)
    }
}

/* sliderCont.dataset.redir */

sliderCont.forEach((_elem)=>{
    _elem.addEventListener("click", ()=>{
        /* console.log("!! CURRENT _ELEM FOR SLIDER: ", _elem) */
        renderProjSummary(_elem)
/*         setTimeout(()=>{
            carouselBGsetup.style.backgroundImage = `url(../../gallery/2dElems/${_elem.dataset.bgsetup})`
            carouselBGsetup.style.opacity = "0.8"
        }, 400) */
        /* _elem.addEventListener("mouseout", ()=>{
            setTimeout(()=>{
                carouselBGsetup.style.backgroundImage = "none"
                carouselBGsetup.style.opacity = "0"
            }, 100)
        }) */
    })
})

spawnLines({count:16, lineHorLen: 13, lineHorStart: 1, start: 2, page: p3SubGrid, color: "var(--colorMoonGlass)", series: "pf3 subgrid main"})
spawnLines({count:13, lineVerLen: 17, lineVerStart: 1, start: 1, page: p3SubGrid, color: "var(--colorMoonGlass)", series: "pf3 subgrid main"})
spawnLines({count:1, lineVerLen: 17, lineVerStart: 1, start: 13, page: p3SubGrid, opposite: true, color: "var(--colorMoonGlass)", series: "pf3 subgrid main"})




