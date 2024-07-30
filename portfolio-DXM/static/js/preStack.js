function eyeBlink(_mainCont, _mainContAfter, _elem, _cont){
    let _localVar;
    let _intervalMil = 2500
    _localVar = setInterval(()=>{
        _localVar?clearInterval(_localVar):_localVar
        _localVar = setInterval(()=>{
            _mainCont.style.opacity = "0"
            _elem.style.opacity = "0"
            _mainContAfter.style.display = "flex"
            _intervalMil = Math.floor(Math.random()*(8000 - 3500))+3500
            setTimeout(()=>{
                _mainCont.style.opacity = "1"
                _elem.style.opacity = "1"
                if (_cont){   
                    _elem.style.left = `${_cont.getBoundingClientRect().left}px`;
                    _elem.style.top = `${_cont.getBoundingClientRect().top}px`;
                } else {
                    console.log("nocont detected.")
                }
                _mainContAfter.style.display = "none"
            },300)          
        }, _intervalMil)
    }, _intervalMil)
}