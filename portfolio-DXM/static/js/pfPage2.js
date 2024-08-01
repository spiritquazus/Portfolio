

function renderProjSummary(_dataset){
    projSumTitle.innerText=translatorObj[`${_dataset}SumTitle`]
    projSumDesc.innerText =translatorObj[`${_dataset}SumDesc`]
    projSumList.innerHTML = translatorObj[`${_dataset}SumList`]
}


/* sliderCont.dataset.redir */

sliderCont.forEach((_elem)=>{
    _elem.addEventListener("click", ()=>{
        /* console.log("!! CURRENT _ELEM FOR SLIDER: ", _elem) */
        renderProjSummary(_elem.dataset.redir)

        setTimeout(()=>{
            carouselBGsetup.style.backgroundImage = `url(../../gallery/2dElems/${_elem.dataset.bgsetup})`
            carouselBGsetup.style.opacity = "0.8"
        }, 400)
        _elem.addEventListener("mouseout", ()=>{
            setTimeout(()=>{
                carouselBGsetup.style.backgroundImage = "none"
                carouselBGsetup.style.opacity = "0"
            }, 100)
        })
    })
})

/* carrosselItems.forEach((item)=>{
    item.addEventListener("click", ()=>{
        
    })
}) */