
import * as THREE from 'three';

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 

import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

import { addRandoms, modelInstall, BGbackgroundFull, BGbackgroundFull2 } from './3jsMesh.js'
import { BGrenderer, BGscene, BGcamera } from './3jsScene.js'
import { bulbLight1, pointLight1, lightHelper1, ambientLight, lightHelperPoint1, createLight} from './3jsFX.js'
import { playModelAnim, updateModelAnim } from './3jsAnim.js'

function editorMode(_scene){
    const _fullControls = new OrbitControls(BGcamera, BGrenderer.domElement);
    const _gridHelper = new THREE.GridHelper();
    _scene.add(_gridHelper)
}    

window.lightsList = {}
window.modelsList = {}

console.log("detecting user machine perf. ", window.performance)
const availableMemory = (performance.memory.jsHeapSizeLimit - performance.memory.usedJSHeapSize)/1000000000;
console.log('Available memory for allocation (in bytes):', availableMemory + " GB");

//test
/* console.log(`model loader: ${GLTFLoader}`)
const gltfLoader1 = new GLTFLoader();
gltfLoader1.load(
    '../gallery/3dAssets/streetTokyo/scene.gltf',
    (gltf) => {
        // Handle successful loading
        console.log("GLTF loaded successfully:", gltf);
        BGscene.add(gltf.scene);  // Add gltf.scene to _scene
    },
    (xhr) => {
        // Handle progress
        console.log((xhr.loaded / xhr.total * 100) + `% loaded`);
    },
    (error) => {
        // Handle errors
        console.error(`Error loading item: ${error}`);
    }
);  */
//testend

/* async function loadAllModels(){

    const modelLoadProm = [
        modelInstall(GLTFLoader, '../gallery/3dAssets/skylineBack1/scene.gltf', BGscene, {scale: [0.35,0.40,0.35], position: [0,0,-50]}),
        modelInstall(GLTFLoader, '../gallery/3dAssets/skylineBack2/scene.gltf', BGscene, {scale: [7.5,7.5,7.95], position: [-20,-2,-30], rotation: [0,280,0]}), 
        //etc
        modelInstall(GLTFLoader, '../gallery/3dAssets/kot1/scene.gltf', BGscene, {scale: [0.021,0.021,0.021], position: [-1.01,0.647,0.03], rotation: [0,100,0]})
        .then(({ model, mixer }) => {
            console.log('Model and animations loaded successfully.');
            // Additional setup if needed
        })
        .catch(error => {
            console.error('Error loading model or animations:', error);
        }),
        modelInstall(GLTFLoader, '../gallery/3dAssets/streetTokyo/scene.gltf', BGscene, {scale: [1,1,1], position: [0,0,0]})
    ]

    const [skyline1, skyline2, streetModel] = await Promise.all(modelLoadProm);

    modelsList.skyline1 = skyline1;
    modelsList.skyline2 = skyline2;
    modelsList.streetModel = streetModel;

    console.log("finished 3d model building")
    

}
loadAllModels() //⚠️back-up for old style */

modelInstall(GLTFLoader, '../gallery/3dAssets/suburbsBG/suburbs_wip1.gltf', BGscene, {scale: [0.1,0.1,0.1], position: [2.8,-2.2,-3.45], rotation: [0,-180,0]}),
modelInstall(GLTFLoader, '../gallery/3dAssets/yourRoom/BasemenrRoomFixed_2exp.gltf', BGscene, {scale: [0.2,0.2,0.2], position: [0,0,0], rotation: [0,180,0]}),

lightsList.lightAmbient = 
createLight("AmbientLight", BGscene, {lightSetup:['rgb(30,20,115)', 0.03, 3, 1.9]})

lightsList.lightBGcityFront = 
createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,190)', 0.5, 9, 0.2], intensity: 0.15, distance: 8.4, posxyz:[0.000,1.200,-10.200], rotaxyz: [0.000,0.000,0.000], lightH:true, lightHSetup:[]})

lightsList.lightBGcityRight = 
createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,190)', 0.5, 9, 0.2], intensity: 0.11, distance: 7, posxyz:[6.000,0.000,-1.500], rotaxyz:[0.000,0.000,0.000], lightH:true, lightHSetup:[]})

lightsList.pointLight전등 = 
createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,190)', 0.5, 9, 0.2], intensity:0.75, distance: 0.4, decay:2.8, posxyz:[-0.100,0.300,-0.100], rotaxyz:[0.000,0.600,0.000], lightH:true, lightHSetup:[]})

lightsList.pointLight등 = 
createLight("PointLight", BGscene, {lightSetup:['rgb(255,255,255)', 0.5, 9, 0.2], intensity: 0.45, distance: 0.6, posxyz:[0.250,0.350,-0.400], rotaxyz:[-0.050,0.600,0.000], lightH:true, lightHSetup:[]})


lightsList.pointLight작은등 = 
createLight("PointLight", BGscene, {lightSetup:['rgb(240,185,110)', 0.5, 9, 0.2], intensity: 0.2, distance: 0.4, decay: 1, posxyz:[-0.3050,0.0900,-0.4850], rotaxyz:[-0.0500,0.5700,0.0000], lightH:true, lightHSetup:[]})

lightsList.rectLightパスコン1 = 
createLight("RectAreaLight", BGscene, {lightSetup:['rgb(183,229,250)', 3, 0.7, 2.5], posxyz:[0.035,0.255,0.255],  rotaxyz:[-0.000,0.070,0.000], width:0.15, height: 0.09, lightH:true, lightHSetup:[]})

lightsList.rectLightパスコン2 = 
createLight("RectAreaLight", BGscene, {lightSetup:['rgb(183,229,250)', 3, 0.7, 2.5], posxyz:[-0.125,0.255,0.255],  rotaxyz:[0.000,-0.100,0.000], width:0.15, height: 0.09, lightH:true, lightHSetup:[]})

lightsList.pointLightReact = 
createLight("PointLight", BGscene, {lightSetup:['rgb(77,255,255)', 0.5, 9, 0.2], intensity:0.39, distance:0.2, posxyz:[0.120,0.380,0.230],  rotaxyz:[-0.100,0.600,0.000], lightH:true, lightHSetup:[]})







/* 
lightsList.lightMenuWall = 
createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,220)', 0.1, 20, 3.8], posxyz:[-1, 1.5, 0.3], rotaxyz:[0,0,0], lightH:true, lightHSetup:[]})

lightsList.lightHangingBulb1 = 
createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,190)', 2.1, 5, 1.9], posxyz: [0.000,2.800,-0.200], rotaxyz: [0.000,0.000,0.000], lightH:true, lightHSetup:[]})

lightsList.lightHangingBulb2 = 
createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,190)', 2.1, 5, 1.9], posxyz:[0.000,2.800,-3.400], rotaxyz: [0.000,0.000,0.000], lightH:true, lightHSetup:[]})

lightsList.lightHangingBulb3 = 
createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,190)', 2.1, 5, 1.9], posxyz: [0.000,2.800,-6.800], rotaxyz: [0.000,0.000,0.000], lightH:true, lightHSetup:[]})


lightsList.lightShop1Door = 
createLight("RectAreaLight", BGscene, {lightSetup:['rgb(220,220,190)', 3, 0.7, 2.5], posxyz:[-1.200,0.700,-1.400], rotaxyz:[0.000,-1.600,0.000], lightH:true, lightHSetup:[]})

lightsList.lightShop1window = 
createLight("PointLight", BGscene, {lightSetup:['rgb(250,250,220)', 4.1, 15, 3.8], posxyz:[-1.100,1.300,-2.700], rotaxyz:[0,0,0], lightH:true, lightHSetup:[]})

lightsList.lightVending1 = 
createLight("RectAreaLight", BGscene, {lightSetup:['rgb(220,220,190)', 6, 0.7, 2.5], width:0.85, height:1.0, posxyz:[1.250,1.400,0.500], rotaxyz:[0.000,1.600,0.000], lightColor:[0.71,0.71,0.51], lightH:true, lightHSetup:[]})
 //⚠️back-up for old style */

addRandoms('rgb(255,255,255)', BGscene, 500)
/* BGscene.add(ambientLight)
BGscene.add(bulbLight1)
BGscene.add(lightHelperPoint1) */
BGscene.add(BGbackgroundFull)
BGscene.add(BGbackgroundFull2)
editorMode(BGscene)

const threeJsClock = new THREE.Clock();


function animateMain(){
    requestAnimationFrame(animateMain)

    const deltaTime = threeJsClock.getDelta(); // Get the time elapsed since the last call

    updateModelAnim(deltaTime);

    BGrenderer.render(BGscene, BGcamera);
}
animateMain()

//KONTROLLER

function kontroller(_scene){
    let chosenLight = {};
    let chosenKey;
    let chosenMesh;
    let chosenIncrement = 0.1;
    const kontrolBox = document.createElement("div")
    kontrolBox.id = "kontrolBoxCont"
    kontrolBox.innerHTML=
    `
    <div id="kontrolBox">KONTROLBOX
        <button id="kontrolLightsBtn">Lights</button>
        <button id="kontrolMeshesBtn">Meshes</button>
        <button id="closeKontrolsBtn">X</button>
    </div>
    <div id="kontrolLightsUI" class="kontrolTab">
        <div id="kontrolLightsChosen"><h1>Kontrol Lights</h1><h3 id="chosenLightName"></h3>
            <br/>
            <span>Increment:</span>
            <input id="kontrolIncrement" type="text" value="0.1" style="width: 2rem">
            <br/>
            <br/>
            <div>Current XYZ position: <span id="lightPositionXYZ" class="kontrolDenom"></span></div>
            <div><button id="posXplus">posXplus</button> <button id="posYplus">posYplus</button> <button id="posZplus">posZplus</button></div>
            <div><button id="posXminus">posXminus</button> <button id="posYminus">posYminus</button> <button id="posZminus">posZminus</button></div>
            <br/>
            <div>Current XYZ Rotation: <span id="lightRotationXYZ" class="kontrolDenom"></span></div>
            <div><button id="rotaXplus">rotaXplus</button> <button id="rotaYplus">rotaYplus</button> <button id="rotaZplus">rotaZplus</button></div>
            <div><button id="rotaXminus">rotaXminus</button> <button id="rotaYminus">rotaYminus</button> <button id="rotaZminus">rotaZminus</button></div>
            <br/>

            <div>Lights Settings <span id="lightSettingsAAA" class="kontrolDenom"></span>:</div>
            <div style="display: flex">Color/skyColor<span id="lightOption1"></span><div id=lightSettingsColor></div></div>
            <div><button id="lightsRedPlus">Red+</button><button id="lightsRedMinus">Red-</button><button id="lightsGreenPlus">Green+</button><button id="lightsGreenMinus">Green-</button><button id="lightsBluePlus">Blue+</button><button id="lightsBlueMinus">Blue-</button></div>
            
            <div>Intensity/groundcolor - <span id="lightOption2" class="kontrolDenom"></span></div>
            <div><button id="lightOption2Plus">+</button><button id="lightOption2Minus">-</button></div>
            
            <div>Width/distance/skyIntensity - <span id="lightOption3" class="kontrolDenom"></span></div>
            <div><button id="lightOption3Plus">+</button><button id="lightOption3Minus">-</button></div>
            
            <div>Height/angle/decay - <span id="lightOption4" class="kontrolDenom"></span></div>
            <div><button id="lightOption4Plus">+</button><button id="lightOption4Minus">-</button></div>
            <br/>
            <button id="saveChanges"> SAVE! (copies to clipboard) </button>
        
            
        </div>
        <div id="kontrolLightsListCont"><h1>Light List</h1>
            <ul id="kontrolLightsList"> 
            </ul>
            <div>
                <button id="showHelpers">Helpers On</button>
                <button id="hideHelpers">Helpers Off</button>
            </div>
        </div>
    </div>
    <div id="kontrolMeshesUI" class="kontrolTab">kontrolMeshesUI
    </div>
    `
    document.getElementsByTagName("body")[0].appendChild(kontrolBox)
    
    function changeValueLoc(_type, _prop, _minus){
        console.log("!!what is the chosenLight apparently? ", chosenLight)
        console.log("!!chosenLightIncrement: ", chosenIncrement)
        
        try{
            _type==null ? chosenLight[_prop] +=(_minus?-chosenIncrement:chosenIncrement) : chosenLight[_type][_prop] +=(_minus?-chosenIncrement:chosenIncrement)
            updateChosenLightData()
        }
        catch(error){
            console.log(error, "If you haven't chosen a light or using the extra options, you can safely ignore this error.")
        }
    }

    function changeValueSpecial(_type, _prop, _minus){
        console.log("what is the chosenLight apparently? ", chosenLight)

    }

    
    document.querySelector("#posXplus").addEventListener("click", ()=>{changeValueLoc("position", "x")})
    document.querySelector("#posYplus").addEventListener("click", ()=>{changeValueLoc("position", "y")})  
    document.querySelector("#posZplus").addEventListener("click", ()=>{changeValueLoc("position", "z")})  
    
    document.querySelector("#posXminus").addEventListener("click", ()=>{changeValueLoc("position", "x", true)})  
    document.querySelector("#posYminus").addEventListener("click", ()=>{changeValueLoc("position", "y", true)})  
    document.querySelector("#posZminus").addEventListener("click", ()=>{changeValueLoc("position", "z", true)})  

    document.querySelector("#rotaXplus").addEventListener("click", ()=>{changeValueLoc("rotation", "x")})  
    document.querySelector("#rotaYplus").addEventListener("click", ()=>{changeValueLoc("rotation", "y")})  
    document.querySelector("#rotaZplus").addEventListener("click", ()=>{changeValueLoc("rotation", "z")})  
    
    document.querySelector("#rotaXminus").addEventListener("click", ()=>{changeValueLoc("rotation", "x", true)}) 
    document.querySelector("#rotaYminus").addEventListener("click", ()=>{changeValueLoc("rotation", "y", true)})  
    document.querySelector("#rotaZminus").addEventListener("click", ()=>{changeValueLoc("rotation", "z", true)})  

    document.querySelector("#lightsRedPlus").addEventListener("click", ()=>{changeValueLoc("color", "r")}) 
    document.querySelector("#lightsGreenPlus").addEventListener("click", ()=>{changeValueLoc("color", "g")})  
    document.querySelector("#lightsBluePlus").addEventListener("click", ()=>{changeValueLoc("color", "b")})  

    document.querySelector("#lightsRedMinus").addEventListener("click", ()=>{changeValueLoc("color", "r", true)}) 
    document.querySelector("#lightsGreenMinus").addEventListener("click", ()=>{changeValueLoc("color", "g", true)})  
    document.querySelector("#lightsBlueMinus").addEventListener("click", ()=>{changeValueLoc("color", "b", true)})  
    
    document.querySelector("#lightsRedPlus").addEventListener("click", ()=>{changeValueLoc("skyColor", "r")}) 
    document.querySelector("#lightsGreenPlus").addEventListener("click", ()=>{changeValueLoc("skyColor", "g")})  
    document.querySelector("#lightsBluePlus").addEventListener("click", ()=>{changeValueLoc("skyColor", "b")})  

    document.querySelector("#lightsRedMinus").addEventListener("click", ()=>{changeValueLoc("skyColor", "r", true)}) 
    document.querySelector("#lightsGreenMinus").addEventListener("click", ()=>{changeValueLoc("skyColor", "g", true)})  
    document.querySelector("#lightsBlueMinus").addEventListener("click", ()=>{changeValueLoc("skyColor", "b", true)})  

    document.querySelector("#lightOption2Plus").addEventListener("click", ()=>{changeValueLoc(null, "intensity")})  
    document.querySelector("#lightOption2Minus").addEventListener("click", ()=>{changeValueLoc(null, "intensity", true)})  

    document.querySelector("#lightOption3Plus").addEventListener("click", ()=>{changeValueLoc(null, "width")})  
    document.querySelector("#lightOption3Minus").addEventListener("click", ()=>{changeValueLoc(null, "width", true)})  

    document.querySelector("#lightOption3Plus").addEventListener("click", ()=>{changeValueLoc(null, "distance")})  
    document.querySelector("#lightOption3Minus").addEventListener("click", ()=>{changeValueLoc(null, "distance", true)})  

    document.querySelector("#lightOption4Plus").addEventListener("click", ()=>{changeValueLoc(null, "height")})  
    document.querySelector("#lightOption4Minus").addEventListener("click", ()=>{changeValueLoc(null, "height", true)})  

    document.querySelector("#lightOption4Plus").addEventListener("click", ()=>{changeValueLoc(null, "angle")})  
    document.querySelector("#lightOption4Minus").addEventListener("click", ()=>{changeValueLoc(null, "angle", true)})  

    document.querySelector("#lightOption4Plus").addEventListener("click", ()=>{changeValueLoc(null, "decay")})  
    document.querySelector("#lightOption4Minus").addEventListener("click", ()=>{changeValueLoc(null, "decay", true)})  

    document.querySelector("#saveChanges").addEventListener("click", ()=>{copyPasteLightSetup()})
    //   `posxyz[${chosenLight.position.x.toFixed(3)},${chosenLight.position.y.toFixed(3)},${chosenLight.position.z.toFixed(3)}], rotaxyz[${chosenLight.rotation.x.toFixed(3)},${chosenLight.rotation.y.toFixed(3)},${chosenLight.rotation.z.toFixed(3)}]`


    const kontrolLightsUI = document.getElementById("kontrolLightsUI"), 
        kontrolMeshesUI = document.getElementById("kontrolMeshesUI"), 
        kontrolLightsBtn = document.getElementById("kontrolLightsBtn"), 
        kontrolMeshesBtn = document.getElementById("kontrolMeshesBtn"), 
        kontrolLightsList = document.getElementById("kontrolLightsList"), 
        lightSettingsColor = document.getElementById("lightSettingsColor"),
        kontrolTab = Array.from(document.getElementsByClassName("kontrolTab")),
        kontrolIncrement = document.getElementById("kontrolIncrement")


        kontrolIncrement.addEventListener('input', (event)=>{
            chosenIncrement = parseFloat(event.target.value);
            console.log("chosenIncrement: ", chosenIncrement)
        })

    kontrolLightsBtn.addEventListener("click", ()=>{
        if (kontrolLightsUI.classList.contains("kontrolTab")){
            kontrolTab.forEach((div)=>{
                div.classList.toggle("kontrolTab", true)
            })
        }
        kontrolLightsUI.classList.toggle("kontrolTab")
    })
    kontrolMeshesBtn.addEventListener("click", ()=>{
        kontrolMeshesUI.style.display = "flex"
    })
    closeKontrolsBtn.addEventListener("click", ()=>{
        kontrolTab.forEach((div)=>{
            div.classList.toggle("kontrolTab", true)
        })
    })


    //Lights Selector
    //click on object name to select it as main!
    Object.keys(lightsList).forEach((key)=>{
        let light = document.createElement("ul")
        light.innerHTML = `<button class="kontrolSelectBtn">${key}</button>` 
        kontrolLightsList.appendChild(light)
        light.addEventListener("click",()=>{
            if (lightsList[key].type == "AmbientLight"){
                chosenLight = lightsList[key]
                chosenKey = key
                console.log("changing chosenLight to: ", lightsList[key],)
            } else {
                chosenLight = lightsList[key][0]
                chosenKey = key
                console.log("changing chosenLight to: ", lightsList[key][0],)
            }
            updateChosenLightData()
            
        })

/*         Object.entries(lightsList[key][0]).forEach(([key, value])=>{
            let lightStat = document.createElement("li")
            lightStat.innerHTML = `${key} = ${value}`
            light.appendChild(lightStat)
        }) */

        


        if (lightsList[key][0] && lightsList[key][0]["rotation"] != undefined){
            const lightRotation = document.createElement("li")
            lightRotation.innerHTML = `ROTATION: x:${lightsList[key][0]["rotation"].x}, y:${lightsList[key][0]["rotation"].y}, z:${lightsList[key][0]["rotation"].z}`
            light.appendChild(lightRotation)
        }
        if (lightsList[key][0] && lightsList[key][0]["position"] != undefined){
            const lightPosition = document.createElement("li")
            lightPosition.innerHTML = `POSITION: x:${lightsList[key][0]["position"].x}, y:${lightsList[key][0]["position"].y}, z:${lightsList[key][0]["rotation"].z}`
            light.appendChild(lightPosition)
            console.log(Object.values(lightsList[key][0]))
        }
        

        
        
    })

    function updateChosenLightData(){
        document.querySelector("#chosenLightName").innerHTML = chosenKey

        if (chosenLight.type != "AmbientLight"){
            console.log("chosen light type detected: ", chosenLight.type)
            document.querySelector("#lightPositionXYZ").innerHTML= `X: ${fixInt(chosenLight.position.x)} Y: ${fixInt(chosenLight.position.y)} Z: ${fixInt(chosenLight.position.z)}`
            document.querySelector("#lightRotationXYZ").innerHTML= `X: ${fixInt(chosenLight.rotation.x)} Y: ${fixInt(chosenLight.rotation.y)} Z: ${fixInt(chosenLight.rotation.z)}`
        }
        
        lightSettingsColor.style.backgroundColor = `rgb(${chosenLight.color.r*255},${chosenLight.color.g*255},${chosenLight.color.b*255})`
        document.querySelector("#lightOption2").innerHTML = `Intensity: ${chosenLight.intensity}` //options 2
        if (chosenLight.type == "HemisphereLight"){
            document.querySelector("#lightOption2").innerHTML = `groundColor: ${fixInt(chosenLight.intensity)}`
        }
        switch (chosenLight.type){ //options 3
            case "RectAreaLight": 
                document.querySelector("#lightOption3").innerHTML = `Width: ${fixInt(chosenLight.width)}`
                break;
            case "PointLight":
            case "SpotLight":
                document.querySelector("#lightOption3").innerHTML = `Distance: ${fixInt(chosenLight.distance)}`
                break;
            case "HemisphereLight":
                document.querySelector("#lightOption3").innerHTML = `Intensity: ${fixInt(chosenLight.intensity)}`
                break;
            default:
                document.querySelector("#lightOption3").innerHTML = "N/A" //nothing.
                break;
        }
        switch (chosenLight.type){ //options 4
            case "RectAreaLight": 
                document.querySelector("#lightOption4").innerHTML = `Height: ${fixInt(chosenLight.height)}`
                break;
            case "SpotLight":
                document.querySelector("#lightOption4").innerHTML = `Angle: ${fixInt(chosenLight.angle)}`
                break;
            case "PointLight":
                document.querySelector("#lightOption4").innerHTML = `Decay: ${fixInt(chosenLight.decay)}`
                break;
            default:
                document.querySelector("#lightOption4").innerHTML = "N/A" //nothing.
                break;
        }
    }

    function fixInt(_int){
        return parseFloat(_int.toFixed(4))
    }
    
    function copyPasteLightSetup(){

        let option1 = `color:${chosenLight.color.r*255},${chosenLight.color.g*255},${chosenLight.color.b*255}`
        let option2 = `intensity:${chosenLight.intensity}`
        let option3 
        let option4
        switch (chosenLight.type){
            case "HemisphereLight":
                option1 = `skyColor:${chosenLight.skyColor.r},${chosenLight.skyColor.g},${chosenLight.skyColor.b}`
                option2 = `groundColor:${chosenLight.groundColor.r},${chosenLight.groundColor.g},${chosenLight.groundColor.b}`
                option3 = `intensity:${chosenLight.intensity}`;
                option4 = null;
                break;
            case "RectAreaLight":
                option3 = `width:${chosenLight.width}`
                option4 = `height:${chosenLight.height}`
                break
            case "SpotLight":
                option3 = `distance:${chosenLight.distance}`
                option4 = `angle:${chosenLight.angle}`
                break;
            case "PointLight":
                option3 = `distance:${chosenLight.distance}`
                option4 = `decay:${chosenLight.decay}`
                break;
        }

        navigator.clipboard.writeText(`
        posxyz:[${chosenLight.position.x.toFixed(4)},${chosenLight.position.y.toFixed(4)},${chosenLight.position.z.toFixed(4)}], 
        rotaxyz:[${chosenLight.rotation.x.toFixed(4)},${chosenLight.rotation.y.toFixed(4)},${chosenLight.rotation.z.toFixed(4)}],
        ${option1}, 
        ${option2}, 
        ${option3}, 
        ${option4}, 
        `)
    }

    function hideHelpers(_scene){
        console.log("Hiding helpers throughout Scene")
        _scene.traverse((object) => {
            console.log("!!WHAT IS THE OBJECTm, ", object)
            if (object.type.includes('Helper')) {
            object.visible = false;
            }
        });
    }
    document.querySelector("#hideHelpers").addEventListener("click", ()=>{hideHelpers(_scene)})
    
    function showHelpers(_scene){
        console.log("Showing helpers throughout Scene")
        _scene.traverse((object) => {
            if (object.type.includes('Helper')) {
                
              object.visible = true;
            }
          }); 
    }
    document.querySelector("#showHelpers").addEventListener("click", ()=>{showHelpers(_scene)})

}//kontroller end




kontroller(BGscene)