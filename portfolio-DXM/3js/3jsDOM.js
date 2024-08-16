const cMain = document.getElementById("cMain"),
    threeLoadingScreen = document.getElementById("threeLoadingScreen"),
    threeIntroText = document.getElementById("threeIntroText"),
    estDate = document.getElementById("est-date"),
    threeEditorMode = document.getElementById("threeEditorMode")
;

function checkPerformance() {
    let perfScore = 10;
    console.log("detecting user machine perf. ", window.performance)
    console.log("detecting user agent: ", navigator.userAgent)
    console.log("detecting user device memory: ", navigator.deviceMemory)
    console.log("detecting user device HW: ", navigator.hardwareConcurrency)

    const availableMemory = (performance.memory.jsHeapSizeLimit - performance.memory.usedJSHeapSize)/1000000000;
    const perf = window.performance;
    const timing = perf.timing;
    const memory = perf.memory;

    // Calculate page load time
    const pageLoadTime = (timing.domComplete - timing.navigationStart) / 1000; // in seconds
    const responseTime = (timing.responseEnd - timing.responseStart) / 1000; // in seconds

    // Check page load time
    if (pageLoadTime > 3) {
        console.warn(`Page load time is high: ${pageLoadTime.toFixed(2)} seconds`);
        perfScore -= 2
    }

    //latency/network
    if (responseTime > 1) {
        console.warn(`Resource fetching time is high: ${responseTime.toFixed(2)} seconds`);
        perfScore -= 3
    }

    //avail memory 
    if (availableMemory < 2.5){
        console.warn('Available memory for allocation low! (in bytes):', availableMemory + " GB");
        perfScore -= 3
    } else {
        console.log('Available memory for allocation (in bytes):', availableMemory + " GB");
    }

    //dev memory 
    if (navigator.deviceMemory < 5){
        console.warn('Device memory low/phone level.', navigator.deviceMemory + " GB");
        perfScore -= 1
    }

    //memory heap
    if (memory && memory.jsHeapSizeLimit) {
        const usedMemory = memory.usedJSHeapSize / memory.jsHeapSizeLimit;
        console.log(`Memory usage: ${(usedMemory * 100).toFixed(2)}% of allocated heap`);
        if (usedMemory > 0.6) {
            console.warn(`High memory usage: ${(usedMemory * 100).toFixed(2)}% of allocated heap`);
            perfScore -= 2
        }
    } else {
        console.warn('Memory information is not available');
    }
    
    if (perfScore < 7){
        console.warn(`Entering performance mode.`)
        //⚠️⚠️to do: disable cat, disable bg and swap with 2d, disable some lights. 
    }
    return perfScore
}

let loadCompletion = 0;
function loadProg(_val){
    loadCompletion += _val
    console.log("loadCompletion: ", loadCompletion)
    loadBarInner.style.width = loadCompletion + "%"
    if (loadCompletion == 100){
        loadCompletion = null;
    }
}

function loadSignal(){

}