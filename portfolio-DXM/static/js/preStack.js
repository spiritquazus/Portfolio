function handleLowMemory() {
    if (navigator.deviceMemory && navigator.deviceMemory < 2) { //2GB mark
        console.warn('Low memory detected. Switching to performance mode.');
        togglePerfMode();
    }
}

handleLowMemory();



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

function userLangPref(language) {
    localStorage.setItem("language", language);
    window.location.href = `https\://spiritquazus.github.io/Portfolio/portfolio-DXM//static/html/portFolioMain.html?language=${language}`
    //https\://spiritquazus.github.io/Portfolio/portfolio-DXM//static/html/portFolioMain.html
}
  

function getQueryParams() {
    
    const params = {};
        window.location.search.substring(1).split("&").forEach(param => {
            const [key, value] = param.split("=");
            params[key] = decodeURIComponent(value);
    });
    return params;
}


function cssVarSwitch(_oldVal, _newVal){
    
    const newValVar = getComputedStyle(document.documentElement).getPropertyValue(_newVal).trim();
    rootDOM.style.setProperty(_oldVal, newValVar)
}




function userSetLang() {
    const params = getQueryParams();
    const language = params["language"]
    console.log("retrieving language from params: ", params)
    if (language) {
        localStorage.setItem("language", language);

        console.log(`Language set to ${language}`);

        switch(language){
            case "kor":
                console.log("switching fonts.")
                cssVarSwitch("--font-secondary", "--font-secondary-kor")
                cssVarSwitch("--font-tertiary", "--font-tertiary-kor")
                break;
        }
        translatorObj = langLoader[language];
        lsMsgs.forEach((elem, index)=>elem.innerText = translatorObj["lsWarn" + index])
        pageMovBtn[0].innerText = translatorObj.pagePrev
        pageMovBtn[1].innerText = translatorObj.pageNxt
        /* introMsg.innerHTML = translatorObj.p1IntroMsg */
        blockTexts[0].innerText = translatorObj.p1BlockText1
        blockTexts[1].innerText = translatorObj.p1BlockText2
        p2Title.innerHTML = translatorObj.p2Title
        p2Section1.innerHTML = translatorObj.p2Section1
        p2Section2.innerHTML = translatorObj.p2Section2
        p2Section3.innerHTML = translatorObj.p2Section3
        p2Section4.innerHTML = translatorObj.p2Section4
        mainTech.firstElementChild.innerHTML = translatorObj.mainTech
        addTech.firstElementChild.innerHTML = translatorObj.addTech
        projSumRedir.innerText = translatorObj.p3ProjLink
        mainPfBtn[0].innerText = translatorObj.p1Btn0
        mainPfBtn[1].innerText = translatorObj.p1Btn1

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
    _type.onloadedmetadata = function(){
    
        _type.play().catch((error) => {
            if (error.name === 'NotAllowedError') {
                console.log('User interaction is required to play audio.');
                // Provide feedback to the user or prompt them to interact
            } else {
                console.error('An unexpected error occurred:', error);
            }
        });
       
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



let translatorObj = {
    triviaPrev: 0,
    lang: "eng",

    "greetings1": "Nice to meet you, I am",
    "greetings2": "< Full Stack Dev >",

    "pagePrev": "Prev.",
    "pageNxt": "Nxt.",

    "p1Btn0": "< Portfolio >",
    "p1Btn1": "< Skills >",

    "lsWarn0": "Sorry!",
    "lsWarn1": "This website is not available in portrait mode!",
    "lsWarn2": "Please turn your device to landscape mode.",

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
    </ul>`,

    "p2Title1": "Tech Stack",
    "p2Title2": "In Progress",

    "mainTech": "<div><p>Tech Stack</p></div>",
    "addTech": "<div><p>In Progress</p></div>",

    "p3ProjLink": "Project Page",

}

const langLoader = {

    kor: {

    triviaPrev: 0,
    lang: "kor",

    "greetings1": "Nice to meet you, I am",
    "greetings2": "< Full Stack Dev >",

    "pagePrev": "이전",
    "pageNxt": "다음",

    "p1Btn0": "< 포트폴리오 >",
    "p1Btn1": "< 이력서 >",

    "lsWarn0": "죄송합니다.",
    "lsWarn1": "이 웹사이트는 세로 모드에서 방문할 수 없습니다.",
    "lsWarn2": "장치를 가로 모드로 전환해 주세요.",

    "dxmTrivia0": "저는 프랑스 교포입니다. F-4 재외동포 비자를 보유하고 있으며 현재 서울에 거주 중입니다.",
    "dxmTrivia1": '주로 사용된 글꼴은 "Bebas Neue", "Source Han Serif K"와 "Nanum Square"입니다.',
    "dxmTrivia2": "화면 오른쪽 상단에 위치한 메뉴를 클릭하여 추가 설정에 접근 가능합니다.",
    "dxmTrivia3": "본 포트폴리오를 둘러보시는 동안 몰입감 있는 경험을 위해 소리를 켜는 것을 추천합니다.",
    "dxmTrivia4": "본 웹사이트는 JavaScript만을 사용하여 제작되었습니다.",
    "dxmTrivia5": "저는 영어권 국가에 거주하거나 방문해본 적이 없습니다.",
    "dxmTrivia6": "배경 음악: El Huervo - Daisuke",

    "dxmSpeech1": "김이작의 포트폴리오에 오신 것을 환영합니다! 추가 설명은 여기에 작성될 것입니다. 저(눈이 달린 삼각)를 클릭해주시면 추가 정보도 공유드립니다.",
    "dxmSpeech2": "죄송합니다. 웹사이트는 세로 모드에서도 기술적으로 작동하지만, 그다지 예쁘지 않습니다. 원활한 관람을 위해 가로 모드를 추천합니다.",
    "dxmSpeech3": "HOGA 라는 프로젝트는 저희 마지막 부트캠프 평가를 위해 준비된 단체 프로젝트였습니다. 발표가 끝난 후에도 작업을 진행하여 완성한 상태입니다.",
    "dxmSpeech4": "화살표를 클릭하거나 객체를 드래그하여 저의 프로젝트를 탐색해보시길 바랍니다. 프로젝트 커버를 클릭해주시면 상세 정보를 확인할 수 있습니다.",
    "dxmSpeech5": "혹여 이력서를 다운로드 받고 싶은 경우, 옆에 보이시는 QR 코드를 스캔해주시면 됩니다.",

    "hogaSumTitle": "HOGA",
    "hogaSumDesc": "HOGA는 맞춤화 시스템을 갖춘 웹 기반 생산성 대시보드로, 직관적이고 사용하기 쉬운 UI를 제공하며 시간 관리 효율성과 좋은 작업/학습 습관을 촉진하도록 설계되었습니다. 대시보드는 사용자가 집중 세션을 위해 일반적으로 접근하는 모든 필요한 도구와 '미니 앱'을 제공합니다.",
    "hogaSumList": "<li>이동 가능하고 크기 조절이 가능한 강력한 위젯</li><li>Spotify, Youtube, Gemini, Calendar 등과 통합된 API</li><li>강력한 맞춤형 타이머, 휴식 및 알람 시스템</li><li>사용자 기반 음악 및 테마</li>",

    "blackPeachSumTitle": "Black Peach",
    "blackPeachSumDesc": "Black Peach는 개인과 기업 모두가 사용할 수 있도록 설계된 프로젝트 관리 앱입니다. 사용자는 선형 타임라인, 트리 또는 제텔카스텐 등 다양한 구조를 통해 주제를 프로젝트 기반으로 조직할 수 있습니다. 이 다중 구조 접근 방식은 Black Peach가 프로젝트나 작업 계획 등 다양한 용도로 사용 가능합니다.",
    "blackPeachSumList": "<li>프로젝트 완료 추적기</li><li>마감일 설정 및 타임라인 추적기</li><li>주간, 일일, 시간별 진행률 측정기</li><li>알람 및 경고</li>",

    "3dPortSumTitle": "포트폴리오 (3D)",
    "3dPortSumDesc": "현재 보고 있는 포트폴리오의 3D 렌더링 버전으로, 모바일과 데스크톱 뷰를 모두 지원하도록 설계되었습니다. 두 번째 포트폴리오를 만드는 주요 목표는 3D 렌더링, 설정 및 웹-앱 통합을 통해 자바스크립트의 범위를 더욱 확장하는 것이었습니다. Three JS로 제작되었습니다.",
    "3dPortSumList": "<li>360도 카메라 이동</li><li>인터랙티브 씬 및 객체</li><li>낮/밤 시스템</li>",

    "psyPSumTitle": "Psychophobia",
    "psyPSumDesc": "Andrei Tarkovsky 감독의 영화 STALKER와 그 후속작의 세계를 기반으로 한 Psychophobia는 자바스크립트로 완전히 제작된 팬 프로젝트입니다. 저는 이 게임을 2024년 4월, 코딩을 막 배우기 시작했을 때 처음 시작했습니다. 이 프로젝트를 통해 JS/HTML/CSS의 첫 번째 언어를 연습하고 새로운 개념을 배울 때 응용하는 것을 목표로 하고 있습니다.",
    "psyPSumList": "<li>인벤토리, 레벨 및 장비 시스템</li><li>무작위 전리품 및 제작 시스템</li><li>비동기 전투 시스템</li><li>평판 시스템이 있는 여러 진영</li><li>재플레이성 및 게임플레이 다양성을 위한 로그라이트 접근</li>",

    "tooltip1": "절약 모드",
    "tooltip2": "채팅 전환",
    "tooltip3": "소리 음소거/허용",

    "p1BlockText1": "프랑스에서 태어나 교육을 받았고, 현재 서울에 영주권(F-4)으로 거주하고 있습니다. 저는 프랑스어, 영어, 한국어, 일본어를 유창하게 구사하여 다양한 문화 및 커뮤니티에 적응하였습니다. 요리, 디자인, 창작에 대한 열정 및 복잡한 문제를 디버깅하고 해결하고자 하는 인내심이 있으며, 새로운 기능을 배우고 활용하는 것에 흥미를 느낍니다. 저의 다문화 배경과 경험은 독특한 시각으로 이어집니다.",
    "p1BlockText2": "풀 스택 엔지니어로서, JavaScript, Python, SQL 등 다양한 프로그래밍 언어와 프레임워크에 대한 포괄적인 배경을 가지고 있습니다. 제 직무 경험은 eMoldino의 영업 프로젝트 매니저와 Robert Walters Korea의 어소시에이트 컨설턴트 역할이 있습니다. Git, Visual Studio Code, Salesforce와 같은 도구에 대한 탄탄한 기초를 가지고 있습니다. 제 기술적 능력과 국제 비즈니스 교육에서 얻은 강력한 비즈니스 감각이 결합되어 다재다능하고 능숙한 엔지니어로서 활동합니다.",


    "p2Title": `<p class="style-capFirstLetter">스킬</p>
    <p>하위 항목 분석</p>`,
    "p2Section1": `<p>프론트엔드</p>
    <ul>
        <li>웹 디자인</li>
        <li>앱 개발</li>
        <li>API 생성/설정</li>
        <li>프론트엔드 알고리즘</li>
        <li>UI/UX 디자인/프로그래밍</li>
        <li>이미지 생성 및 편집</li>
        <li>3D 모델링/텍스처링</li>
    </ul>`,
    "p2Section2": `<p>백엔드</p>
    <ul>
        <li>서버 생성</li>
        <li>데이터베이스 생성 (SQL)</li>
        <li>API 생성/설정</li>
        <li>DB와 백엔드 설정</li>
        <li>인증 및 로그인 로직</li>
    </ul>`,
    "p2Section3": `<p>기타 스킬</p>
    <ul>
        <li>풀 스택 아키텍처 디자인</li>
        <li>라이브러리/포터블 기능 생성</li>
        <li>프로젝트 관리</li>
        <li>A-to-Z 앱 생성</li>
        <li>비즈니스 개발</li>
        <li>번역</li>
    </ul>`,
    "p2Section4": `<p>언어</p>
    <ul>
        <li>프랑스어 원어민</li>
        <li>영어 원어민</li>
        <li>한국어 유창함/원어민</li>
        <li>일본어 유창함</li>
        <li>러시아어 공부 중</li>
    </ul>`,

    "mainTech": "<div><p>기술 스택</p></div>",
    "addTech": "<div><p>진행 중</p></div>",

    "p3ProjLink": "< 프로젝트 페이지로 >",
    }

    
}

const urlSetup = {
    "extHoga": "https://spiritquazus.github.io/hoga-Prod/website/templates/index.html",
    "ext3d": "https://spiritquazus.github.io/Portfolio/portfolio-DXM/3js/index.html",
    "extPsychoPhobia": "https://github.com/spiritquazus/psyP-Teknika",
}