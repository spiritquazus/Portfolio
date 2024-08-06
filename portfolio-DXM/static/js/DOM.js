const pageContainer = document.getElementById("pageContainer"),
    rootDOM = document.querySelector(":root"),
    pfPage1 = document.getElementById("pf-page1"),
    pfPage2 = document.getElementById("pf-page2"),
    pfPage3 = document.getElementById("pf-page3")
;

//page 1/main
const gallerySlider1 = document.getElementById('gallerySlider1'),
    sliderCont = Array.from(document.querySelectorAll(".sOpen")),
    sliderVinyls = Array.from(document.querySelectorAll(".vinyl")),
    greetingsF = document.getElementById("greetingsF"),
    page1 = document.getElementById("pf-page1"),
    speechText = document.getElementById("speechText"),
    dxmIcon = document.getElementById("DXM-nest"),
    sideBar = document.getElementById("pf-sideBar"),
    btnHam = document.getElementById("btn-hamburger"),
    btnHamIn = document.getElementById("nav-close-button"),
    DXMsmolEye = document.getElementById("DXM-smol1"),
    DXMsmolBlink = document.getElementById("DXM-smol2"),
    DXMsmolPupil = document.getElementById("DXM-smol3"),
    DXMsmolCont = document.getElementById("DXM-smolCont"),
    DXMspeech = document.getElementById("DXM-speech"),
    blockTexts = Array.from(document.getElementsByClassName("blockText")),
    sideTexts = Array.from(document.getElementsByClassName("sideText")),
    styleQuotes = Array.from(document.getElementsByClassName("styleQuote")),
    navBtns = Array.from(document.getElementsByClassName("dl-navBtn")),
    photoID = document.getElementById("photoID"),
    titleID = document.getElementById("HL-title"),
    btnContact = document.getElementById("btn-contact"),
    btnNavigation = document.getElementById("btn-navigation"),
    btnAbout = document.getElementById("btn-about"),
    ctrSound = document.getElementById("ctr-sound"),
    ctrComments = document.getElementById("ctr-comment"),
    ctrPerf = document.getElementById("ctr-performance"),
    btnSidePerf = document.getElementById("side-btn-perf"),
    btnSideSound = document.getElementById("side-btn-sound"),
    btnSideScreen = document.getElementById("side-btn-screen"),
    pageMovBtn = Array.from(document.getElementsByClassName("pageMovBtn")),
    lsMsgs = Array.from(document.getElementsByClassName("ls-msg")),
    introMsg = document.getElementById("introMsg")
;

//page 2
const brut1pic = document.getElementById("brut1pic"),
    carouselImg1 = document.getElementById("img1"),
    carouselImg2 = document.getElementById("img2"),
    carouselImg3 = document.getElementById("img3"),
    carouselImg4 = document.getElementById("img4"),
    carouselBGsetup = document.getElementById("carouselBGsetup"),
    projectsSummary = document.getElementById("projectsDesc"),
    projSumTitle = document.getElementById('projectsSumTitle'),
    projSumDesc = document.getElementById('projectsSumDesc'),
    projSumList = document.getElementById('projectsSumList'),
    p2Title = document.getElementById("p2-title"),
    p2Section1 = document.getElementById("p2-section1"),
    p2Section2 = document.getElementById("p2-section2"),
    p2Section3 = document.getElementById("p2-section3"),
    p2Section4 = document.getElementById("p2-section4"),
    mainTech = document.getElementById("mainTech"),
    addTech = document.getElementById("addTech")
;

const p3MassText = Array.from(document.getElementsByClassName("p3-massText")),
    p3SubGrid = document.getElementById("p3-subGrid"),
    p3FocalArrows = Array.from(p3SubGrid.getElementsByClassName("style-arrowFocal")),
    p3RightLeftAnim = Array.from(pfPage3.getElementsByClassName("rightLeftAnim")),
    carouselBtns = Array.from(document.getElementsByClassName("carouselBtn")),
    projSumRedir = document.getElementById("projSumRedir"),
    sliderTitles = Array.from(document.getElementsByClassName("sliderTitle"))
;


