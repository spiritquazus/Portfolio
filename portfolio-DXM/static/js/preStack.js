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
        _type.play()
    }
    _type.load()   
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

    "hogaSumTitle": "HOGA",
    "hogaSumDesc": "HOGA is a web-based productivity dashboard with a complex customization system yet intuitive and easy to use UI, designed to promote time management efficiency and good working/studying habits.",
    "hogaSumList": "<p>Features</p><li>Moveable and resizable, powerful widgets</li><li>Integrated API for Spotify, Youtube, Gemini, Calendar, and more</li><li>Robust customizable timer, break and alarm system</li><li>User-based music and themes</li>",

    "blackPeachSumTitle": "WIP: Black Peach",
    "blackPeachSumDesc": "Black Peach is an upcoming project management app, designed to be used both by individuals and corporate. Users can organize their subjects by project-basis, with different structures including linear timeline, tree, or zettelkasten",
    "blackPeachSumList": "<p>Features</p><li>Project completion tracker</li><li>Deadline setup and timeline tracker</li><li>Weekly, daily, hourly progress meter</li><li>Alarms and alerts</li>",

    "3dPortSumTitle": "WIP: Portfolio (3D)",
    "3dPortSumDesc": "This is a 3D rendered version of the portfolio you are viewing now, designed to support mobile and desktop view alike. Made with Three JS.",
    "3dPortSumList": "<p>Features</p><li>360 degrees camera movement</li><li>Interactive scene and objects</li><li>Day/Night System</li>",

    "psyPSumTitle": "WIP: Psychophobia",
    "psyPSumDesc": "Based on the world of the movie STALKER by Andrei Tarkovsky and the subsequent, world-famous video-game series of the same name by GSC studios, Stalker psychoPhobia is a fan-project entirely made on vanilla JavaScript. I've started this game from scratch in April 2024, back when I just started learning coding. The purpose of this project was for me to practice my first language (JS/HTML/CSS) and get familiar with new concepts by integrating them into this project as I learn them.",
    "psyPSumList": "<p>Features</p><li>Inventory, level and equipment system</li><li>Randomized loot and crafting system</li><li>Asynchronous combat system</li>",

}
