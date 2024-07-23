
import * as THREE from 'three';

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 

import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

import { addRandoms, modelInstall, BGbackgroundFull, BGbackgroundFull2 } from './3jsMesh.js'
import { BGrenderer, BGscene, BGcamera } from './3jsScene.js'
import { bulbLight1, pointLight1, lightHelper1, ambientLight, lightHelperPoint1, createLight} from './3jsFX.js'

function editorMode(_scene){
    const _fullControls = new OrbitControls(BGcamera, BGrenderer.domElement);
    const _gridHelper = new THREE.GridHelper();
    _scene.add(_gridHelper)
}    

window.lightsList = {}
window.modelsList = {}

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

async function loadAllModels(){

    const modelLoadProm = [
        modelInstall(GLTFLoader, '../gallery/3dAssets/skylineBack1/scene.gltf', BGscene, {scale: [0.35,0.40,0.35], position: [0,0,-50]}),
        modelInstall(GLTFLoader, '../gallery/3dAssets/skylineBack2/scene.gltf', BGscene, {scale: [7.5,7.5,7.95], position: [-20,-2,-30], rotation: [0,280,0]}), 
        //etc
        modelInstall(GLTFLoader, '../gallery/3dAssets/streetTokyo/scene.gltf', BGscene, {scale: [1,1,1], position: [0,0,0]})
    ]

    const [skyline1, skyline2, streetModel] = await Promise.all(modelLoadProm);

    modelsList.skyline1 = skyline1;
    modelsList.skyline2 = skyline2;
    modelsList.streetModel = streetModel;

    console.log("finished 3d model building")
    animateMain()

}
loadAllModels()

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


addRandoms('rgb(255,255,255)', BGscene, 500)
/* BGscene.add(ambientLight)
BGscene.add(bulbLight1)
BGscene.add(lightHelperPoint1) */
BGscene.add(BGbackgroundFull)
BGscene.add(BGbackgroundFull2)
editorMode(BGscene)



function animateMain(){
    requestAnimationFrame(animateMain)
    BGrenderer.render(BGscene, BGcamera);
}


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
            <div>Current XYZ position: <span id="lightPositionXYZ"></span></div>
            <div><button id="posXplus">posXplus</button> <button id="posYplus">posYplus</button> <button id="posZplus">posZplus</button></div>
            <div><button id="posXminus">posXminus</button> <button id="posYminus">posYminus</button> <button id="posZminus">posZminus</button></div>
            <br/>
            <div>Current XYZ Rotation: <span id="lightRotationXYZ"></span></div>
            <div><button id="rotaXplus">rotaXplus</button> <button id="rotaYplus">rotaYplus</button> <button id="rotaZplus">rotaZplus</button></div>
            <div><button id="rotaXminus">rotaXminus</button> <button id="rotaYminus">rotaYminus</button> <button id="rotaZminus">rotaZminus</button></div>
            <br/>

            <div>Lights Settings <span id="lightSettingsAAA"></span>:</div>
            <div style="display: flex">Color/skyColor<span id="lightOption1"></span><div id=lightSettingsColor></div></div>
            <div><button id="lightsRedPlus">Red+</button><button id="lightsRedMinus">Red-</button><button id="lightsGreenPlus">Green+</button><button id="lightsGreenMinus">Green-</button><button id="lightsBluePlus">Blue+</button><button id="lightsBlueMinus">Blue-</button></div>
            
            <div>Intensity/groundcolor - <span id="lightOption2"></span></div>
            <div><button id="lightOption2Plus">+</button><button id="lightOption2Minus">-</button></div>
            
            <div>Width/distance/skyIntensity - <span id="lightOption3"></span></div>
            <div><button id="lightOption3Plus">+</button><button id="lightOption3Minus">-</button></div>
            
            <div>Height/angle/decay - <span id="lightOption4"></span></div>
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
            console.log("changing chosenLight to: ", lightsList[key][0],)
            chosenLight = lightsList[key][0]
            chosenKey = key
            console.log("WHAT IS lightsList[key][0], ", lightsList[key][0])
            updateChosenLightData()
            
        })

/*         Object.entries(lightsList[key][0]).forEach(([key, value])=>{
            let lightStat = document.createElement("li")
            lightStat.innerHTML = `${key} = ${value}`
            light.appendChild(lightStat)
        }) */



        const lightRotation = document.createElement("li")
        lightRotation.innerHTML = `ROTATION: x:${lightsList[key][0]["rotation"].x}, y:${lightsList[key][0]["rotation"].y}, z:${lightsList[key][0]["rotation"].z}`
        light.appendChild(lightRotation)

        const lightPosition = document.createElement("li")
        lightPosition.innerHTML = `POSITION: x:${lightsList[key][0]["position"].x}, y:${lightsList[key][0]["position"].y}, z:${lightsList[key][0]["rotation"].z}`
        light.appendChild(lightPosition)

        console.log(Object.values(lightsList[key][0]))
        
    })

    function updateChosenLightData(){
        document.querySelector("#chosenLightName").innerHTML = chosenKey
        document.querySelector("#lightPositionXYZ").innerHTML= `X: ${chosenLight.position.x} Y: ${chosenLight.position.y} Z: ${chosenLight.position.z}`
        document.querySelector("#lightRotationXYZ").innerHTML= `X: ${chosenLight.rotation.x} Y: ${chosenLight.rotation.y} Z: ${chosenLight.rotation.z}`
        lightSettingsColor.style.backgroundColor = `rgb(${chosenLight.color.r*255},${chosenLight.color.g*255},${chosenLight.color.b*255})`
        document.querySelector("#lightOption2").innerHTML = `Intensity: ${chosenLight.intensity}` //options 2
        if (chosenLight.type == "HemisphereLight"){
            document.querySelector("#lightOption2").innerHTML = `groundColor: ${chosenLight.intensity}`
        }
        switch (chosenLight.type){ //options 3
            case "RectAreaLight": 
                document.querySelector("#lightOption3").innerHTML = `Width: ${chosenLight.width}`
                break;
            case "PointLight":
            case "SpotLight":
                document.querySelector("#lightOption3").innerHTML = `Distance: ${chosenLight.distance}`
                break;
            case "HemisphereLight":
                document.querySelector("#lightOption3").innerHTML = `Intensity: ${chosenLight.intensity}`
                break;
            default:
                document.querySelector("#lightOption3").innerHTML = "N/A" //nothing.
                break;
        }
        switch (chosenLight.type){ //options 4
            case "RectAreaLight": 
                document.querySelector("#lightOption4").innerHTML = `Height: ${chosenLight.height}`
                break;
            case "SpotLight":
                document.querySelector("#lightOption4").innerHTML = `Angle: ${chosenLight.angle}`
                break;
            case "PointLight":
                document.querySelector("#lightOption4").innerHTML = `Decay: ${chosenLight.decay}`
                break;
            default:
                document.querySelector("#lightOption4").innerHTML = "N/A" //nothing.
                break;
        }
    }

    function copyPasteLightSetup(){
        console.log("!!COPYPASTE WHAT IS CHOSENLIGHT.TYPE, ", chosenLight.type)
        let option1 = `color:${chosenLight.color.r},${chosenLight.color.g},${chosenLight.color.b}`
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
                option3 = `Width:${chosenLight.width}`
                option4 = `Height:${chosenLight.height}`
                break
            case "SpotLight":
                option3 = `Distance:${chosenLight.distance}`
                option4 = `Angle:${chosenLight.angle}`
                break;
            case "PointLight":
                option3 = `Distance:${chosenLight.distance}`
                option4 = `Decay:${chosenLight.decay}`
                break;
        }

        navigator.clipboard.writeText(`
        posxyz:[${chosenLight.position.x.toFixed(3)},${chosenLight.position.y.toFixed(3)},${chosenLight.position.z.toFixed(3)}], 
        rotaxyz:[${chosenLight.rotation.x.toFixed(3)},${chosenLight.rotation.y.toFixed(3)},${chosenLight.rotation.z.toFixed(3)}],
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