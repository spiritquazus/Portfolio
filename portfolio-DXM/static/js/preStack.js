function redirBtn(_route){
    chooseCont.style.transform = "scale3d(0, 0.9, 0.4)";
/*     handLeft.style.transform = "translateX(52vw)"
    handRight.style.transform = "translateX(-52vw)"
    handsCont.style.opacity = "1" */
    bodyDOM.style.opacity = "0"  
    setTimeout(()=>{
        window.location.href = _route; 
    },1200)

    
}

function redirBtnExt(_route, _new){
    if (_new){
        window.open(_route, '_blank')
    } else {
        window.location.href = _route
    } 
}

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

let playingBGM = new Audio();
playingBGM.volume = 0.3;
let playSFXBG = new Audio();
let playSFXReact = new Audio();
let playSFXcinematic = new Audio();

const allSounds = [playingBGM, playSFXBG, playSFXReact, playSFXcinematic]

function playSFX(_type, _url){
    _type.pause()
    _type.currentTime = 0
    _type.src = `../../gallery/SFX/${_url}`
    console.log("new sound played: ", _url)
    _type.onloadedmetadata = function(){
        try {
            _type.play()
        } catch {
            console.log("No user interaction yet, sound will not play.")
        }
    }
    _type.load()   
}

window.funcTally = {}
const allScreen = document.documentElement;

function funcLimiter(_func, _limit, _type){
    const funcName = _func.name || "nameless func"

    if (!funcTally[funcName]){ //if the function was never called, set counter to 0 then increment.
        funcTally[funcName] = {};
        funcTally[funcName].count = 0;
        funcTally[funcName].type = _type?_type:"unknownType"
    }

    return (...args) => {
        if (funcTally[funcName].count < _limit) {
            funcTally[funcName].count++
            return _func(...args);
        } else {
            console.log(`Function ${funcName} has terminated its lifespan.`)
        }
    }
}

window.spawnedLines = {}
function spawnLines(_obj){
    for (i = 0; i<_obj.count; i++){
        const _line = document.createElement("div")
        _line.classList.add("style-lineBase")
        if (_obj.lineHorLen){
            _line.classList.add("style-lineHor")
            if (_obj.opposite) _line.classList.add("style-lineHorOppos");
            _line.style.gridRow = `${_obj.start + i} / span 1`
            _line.style.gridColumn = `${_obj.lineHorStart} / span ${_obj.lineHorLen}`
        }
        if (_obj.lineVerLen){
            _line.classList.add("style-lineVert")
            if (_obj.opposite) _line.classList.add("style-lineVertOppos");
            _line.style.gridColumn = `${_obj.start + i} / span 1`
            _line.style.gridRow = `${_obj.lineVerStart} / span ${_obj.lineVerLen}`
        }
        if (_obj.color){
            _line.style.borderColor = _obj.color
        }
        if (!spawnedLines[_obj.series]){
            spawnedLines[_obj.series] = []
        }
        spawnedLines[_obj.series].push(_line)
        _obj.page.appendChild(_line)
    }
}

function hideLines(_series){
    console.log("removing line series: ", _series)
    spawnedLines[_series].forEach((line)=>{
        line.style.opacity = "0"
    })
}

function cooltipCraft(_target, _cooltipText, _obj){
    let cooltipShell = document.createElement("div")
    cooltipShell.className = 'cooltipShell'
    cooltipShell.style.opacity = '0'
    cooltipShell.style.pointerEvents = 'none'
    
    let cooltipCont = document.createElement("div")
    cooltipCont.innerHTML = `${_cooltipText}`
    cooltipCont.className = 'cooltipCont'
    cooltipShell.appendChild(cooltipCont)

    //additional styling:
    cooltipCont.style.color = _obj.fontColor?_obj.fontColor:'white'
    cooltipCont.style.fontSize = _obj.fontSize?_obj.fontSize:'1.15rem'
    cooltipCont.style.fontStyle = _obj.fontStyle?_obj.fontStyle:''
    cooltipCont.style.backgroundColor = _obj.contColor?_obj.contColor:'rgba(50,50,50,0.5)'
    //cooltipCont.style.filter = "drop-shadow(" + _obj.shadow?_obj.shadow:'0 0 0.5rem rgba(40,40,40,0.3)' + ")"
    cooltipShell.style.transition = _obj.transit?_obj.transit:'opacity 0.2s 0.1s ease-in-out'

    document.querySelector("body").appendChild(cooltipShell)

    _target.addEventListener("mouseover", (e)=>{
            cooltipShell.style.opacity = '1'
            cooltipShell.style.top = e.clientY + 'px'
            cooltipShell.style.left = e.clientX/2 + 'px'
    })

    _target.addEventListener("mouseout", ()=>{
        cooltipShell.style.opacity = '0'
})
}

/* cooltipCraft(document.getElementById("button1"), "HELLO!", {color:"grey"}) */

function openFullscreen() {
  if (allScreen.requestFullscreen) {
    allScreen.requestFullscreen();
  } else if (allScreen.webkitRequestFullscreen) { /* Safari */
    allScreen.webkitRequestFullscreen();
  } else if (allScreen.msRequestFullscreen) { /* IE11 */
    allScreen.msRequestFullscreen();
  }
}

function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}



const translatorObj = {
    triviaPrev: 0,
    lang: "eng",

    "greetings": "Nice to meet you, I am",

    "dxmTrivia0": "The decorative texts around the screen may seem like fluff, but they actually either represent stylistic choices or the credits.",
    "dxmTrivia1": 'The primary font used is "Bebas Neue", then "Geist" and "Anderson Grotesk".',
    "dxmTrivia2": "You can click on the hamburger menu, located in the top-right of the screen, to access additional settings.",
    "dxmTrivia3": "I'd recommend turning sound on for a more immersive experience during your browsing of this portfolio.",
    "dxmTrivia4": "This website was entirely made with vanilla JavaScript.",
    "dxmTrivia5": "Interestingly, I've never lived or even visited a mainly English-speaking country before. Not even the United Kingdoms!",
    "dxmTrivia6": "Background Music: El Huervo - Daisuke",

    "dxmSpeech1": "Welcome to my portfolio! Additional explanations will be written here. Click on me (the triangle staring at you) for some extra info.",
    "dxmSpeech2": "Sorry about that. The website technically works in portrait mode but is just not very pretty...",
    "dxmSpeech3": "HOGA was a group project prepared for our final bootcamp evaluation. Eventually, the prototype I kept working on it to make a fully functional app.",
    "dxmSpeech4": "Click on the arrows or move the object around to navigate my projects. Click on the project cover itself for more info.",
    "dxmSpeech5": "This is a spread out version of my skills description, for better summary. You can also use the QR code next to this box to access my resume directly.",

    "hogaSumTitle": "HOGA",
    "hogaSumDesc": "HOGA is a web-based productivity dashboard with a complex customization system yet intuitive and easy to use UI, designed to promote time management efficiency and good working/studying habits. The dashboard allows users to have all the necessary implements and 'mini-apps' one usually accesses for focus sessions.",
    "hogaSumList": "<li>Moveable and resizable, powerful widgets</li><li>Integrated API for Spotify, Youtube, Gemini, Calendar, and more</li><li>Robust customizable timer, break and alarm system</li><li>User-based music and themes</li>",

    "blackPeachSumTitle": "WIP: Black Peach",
    "blackPeachSumDesc": "Black Peach is an upcoming project management app, designed to be used both by individuals and corporate. Users can organize their subjects by project-basis, with different structures including linear timeline, tree, or zettelkasten. This multi-structural approach would allow Black Peach to be used for various purposes, such as projects or work day planning.",
    "blackPeachSumList": "<li>Project completion tracker</li><li>Deadline setup and timeline tracker</li><li>Weekly, daily, hourly progress meter</li><li>Alarms and alerts</li>",

    "3dPortSumTitle": "WIP: Portfolio (3D)",
    "3dPortSumDesc": "This is a 3D rendered version of the portfolio you are viewing now, designed to support mobile and desktop view alike. The primary goal of making a secondary portfolio was to further extend my range of capabilities with JavaScript, by incorporating 3D rendering, set-up and integration into a web app. Made with Three JS.",
    "3dPortSumList": "<li>360 degrees camera movement</li><li>Interactive scene and objects</li><li>Day/Night System</li>",

    "psyPSumTitle": "WIP: Psychophobia",
    "psyPSumDesc": "Based on the world of the movie STALKER by Andrei Tarkovsky and the subsequent, Psychophobia is a fan-project entirely made on JavaScript. I've started this game from scratch in April 2024, back when I just started learning coding. The purpose being to practice my first language (JS/HTML/CSS) and get familiar with new concepts by integrating them into this project as I learn them.",
    "psyPSumList": "<li>Inventory, level and equipment system</li><li>Randomized loot and crafting system</li><li>Asynchronous combat system</li><li>Multiple factions with reputation systems</li><li>Roguelite approach for replayability and gameplay diversity</li>",

    "tooltip1": "Performance Mode",
    "tooltip2": "Toggle Chatter",
    "tooltip3": "Mute/Allow Sound",

    "p1BlockText1": "Born and educated in France, I currently reside in Seoul with a permanent resident visa (F-4). I am fluent in four languages: French, English, Korean, and Japanese, which allows me to connect with diverse cultures and communities. My passion for cooking, designing, and creating is complemented by my enthusiasm for debugging and solving complex problems in computer science. I thrive on learning new skills and staying updated with the latest technologies. My multicultural background and experiences provide a unique perspective.",
    "p1BlockText2": "As a Full Stack Engineer, I have a comprehensive background in various programming languages and frameworks, including JavaScript, Python, and SQL. My professional experience spans roles such as Sales Project Manager at eMoldino and Associate Consultant at Robert Walters Korea. I have a solid foundation in tools like Git, Visual Studio Code, and Salesforce. My technical skills, combined with a strong business acumen from my international business education, make me a versatile and proficient engineer.",
    "p1IntroMsg": `<span id="greetingsF" class="greetingsAnim">Hello, I am</span>
    <div><span id="HL-Isaac" style="opacity: 0">Isaac </span><span id="HL-Kim" style="opacity:0">Kim</span></div>
    <span><span id="HL-title" style="opacity: 0; white-space: pre-wrap;">&lt; Full Stack Dev &gt;</span><span class="style-typeBar">_</span></span>`,

    "p2Title": `<p class="style-capFirstLetter">Technical Skills</p>
    <p>Subsets Breakdown</p>`,
    "p2Section1": `<p>Front-end</p>
    <ul>
        <li>Web Design</li>
        <li>App Development</li>
        <li>API Creation/Setup</li>
        <li>Front-end Algorithm</li>
        <li>UI/UX Design/Programming</li>
        <li>Image Creation and Edit</li>
        <li>3D Modelling/Texturing</li>
    </ul>`,
    "p2Section2": `<p>Back-end</p>
    <ul>
        <li>Server Creation</li>
        <li>Database Creation (SQL)</li>
        <li>API Creation/Setup</li>
        <li>DB to Back-end Setup</li>
        <li>Authentification Logic</li>
    </ul>`,
    "p2Section3": `<p>Other Skills</p>
    <ul>
        <li>Full Stack Architecture Design</li>
        <li>Library/Portable Func. Creation</li>
        <li>Project Management</li>
        <li>A-to-Z App Creation</li>
        <li>Business Development</li>
        <li>Translation</li>
    </ul>`,
    "p2Section4": `<p>Languages</p>
    <ul>
        <li>French Native</li>
        <li>English Native</li>
        <li>Korean Fluent</li>
        <li>Japanese Business Fluent</li>
        <li>Russian in Training</li>
    </ul>`

    
}

const urlSetup = {
    "extHoga": "https://spiritquazus.github.io/hoga-Prod/website/templates/index.html",
    "ext3d": "https://spiritquazus.github.io/Portfolio/portfolio-DXM/3js/index.html",
    "extPsychoPhobia": "https://github.com/spiritquazus/psyP-Teknika",
}