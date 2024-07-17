const dxmEye = document.getElementById("DXMpart4")
const dxmEyeSocket = document.getElementById("DXMpart2")
const dxmEyeBoundaries = document.getElementById("socketBound")
const dxmEyeLid = document.getElementById("DXMpart3")

const langCont = document.getElementById("langCont")
const chooseCont = document.getElementById("chooseCont")
const choose3d = document.getElementById("choose3d")
const chooseMobile = document.getElementById("chooseMobile")

dxmEye.style.left = `${dxmEyeBoundaries.getBoundingClientRect().left}px`;
dxmEye.style.top = `${dxmEyeBoundaries.getBoundingClientRect().top}px`;




function eyeSpy(e, _elem, _cont){
    const _contRect = _cont.getBoundingClientRect();
    const _radius = _contRect.height / 2;
    const _centerX = _contRect.left + _contRect.width / 2;
    const _centerY = _contRect.top + _contRect.height / 2;

    const _eyeRect = _elem.getBoundingClientRect();

    const mouseX = e.clientX - _eyeRect.width / 2;
    const mouseY = e.clientY - _eyeRect.height / 2;

    const _dist = Math.sqrt(
        Math.pow(mouseX - _centerX, 2) + Math.pow(mouseY - _centerY, 2) //get distance of cursor to center of eyesocket
    );

    let _gakdo = Math.atan2(mouseY - _centerY, mouseX - _centerX); //각도 of the mouse... thx stackoverflow for below calcs..
    
    const _constrictor = Math.min(_dist, _radius); // Constrain distance to be within the circle's radius

    // Calculate new coordinates within the circle
    const newX = _centerX + _constrictor * Math.cos(_gakdo);
    const newY = _centerY + _constrictor * Math.sin(_gakdo);

    // Set new coordinates for the element
    _elem.style.left = `${newX - _elem.offsetWidth / 2}px`;
    _elem.style.top = `${newY - _elem.offsetHeight / 2}px`;

}

function eyeBlink(_mainCont, _mainContAfter, _elem, _cont){
    let _localVar;
    let _intervalMil = 1500
    _localVar = setInterval(()=>{
        _localVar?clearInterval(_localVar):_localVar
        _localVar = setInterval(()=>{
            _mainCont.style.display = "none"
            _elem.style.display = "none"
            _mainContAfter.style.display = "flex"
            _intervalMil = Math.floor(Math.random()*(6000 - 3500))+3500
            setTimeout(()=>{
                _mainCont.style.display = "flex"
                _elem.style.display = "flex"
                _elem.style.left = `${_cont.getBoundingClientRect().left}px`;
                _elem.style.top = `${_cont.getBoundingClientRect().top}px`;
                _mainContAfter.style.display = "none"
            },300)          
        }, _intervalMil)
    }, _intervalMil)
}

function activeEye(_elem, _cont, _mainCont, _mainContAfter){
    document.addEventListener("mousemove",(event)=>eyeSpy(event,_elem,_cont))
    eyeBlink(_mainCont, _mainContAfter, _elem, _cont)
}


activeEye(dxmEye, dxmEyeBoundaries, dxmEyeSocket, dxmEyeLid)

/* function eyeSpy(e,_elem,_boundaries){
    const _eyeRect = _elem.getBoundingClientRect();
    const _socket = _boundaries.getBoundingClientRect();
    let yVal = e.clientY - _eyeRect.height/2
    let xVal = e.clientX - _eyeRect.width/2
    yVal = yVal<_socket.bottom ? yVal : _socket.bottom
    yVal = yVal>_socket.top ? yVal : _socket.top
    xVal = xVal<_socket.right ? xVal : _socket.right
    xVal = xVal>_socket.left ? xVal : _socket.left
    _elem.style.top = `${yVal}px`
    _elem.style.left = `${xVal}px`
} */

function contLangShow(_lang){
    chooseCont.style.display = "flex";
    setTimeout(()=>{
        chooseMobile.style.opacity = 1;
        choose3d.style.opacity = 1;
    }, 100)
    langCont.style.opacity = 0;
    setTimeout(()=>{langCont.style.display = "none"},500)

    switch(_lang){
        case "english":           
            chooseMobile.innerText = "Mobile/Static Portfolio"
            choose3d.innerText = "3D Portfolio (You have a decent computer)"
            break;
        case "french":
            break;
        case "korean":
            break;
        case "japanese":
            break;
        
    };
}

function redirBtn(_route){
    window.location.href = `http://www.w3schools.com`;
}

function redirBtnExt(_route){
    window.location.href = _route
}