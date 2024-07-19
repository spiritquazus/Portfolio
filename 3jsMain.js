import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

import { addRandoms, modelInstall, BGbackgroundFull, BGbackgroundFull2 } from './3jsMesh.js'
import { BGrenderer, BGscene, BGcamera } from './3jsScene.js'
import { bulbLight1, pointLight1, lightHelper1, ambientLight, lightHelperPoint1, createLight} from './portfolio-DXM/3jsFX.js'

function editorMode(_scene){
    const _fullControls = new OrbitControls(BGcamera, BGrenderer.domElement);
    const _gridHelper = new THREE.GridHelper();
    _scene.add(_gridHelper)
}    

window.lightsList = {}

//test

console.log(`model loader: ${GLTFLoader}`)
const gltfLoader1 = new GLTFLoader();
gltfLoader1.load(
    '../gallery/3dAssets/streetTokyo/scene.gltf',
    (gltf) => {
        // Handle successful loading
        console.log("GLTF loaded successfully:", gltf);
        _scene.add(gltf.scene);  // Add gltf.scene to _scene
    },
    (xhr) => {
        // Handle progress
        console.log((xhr.loaded / xhr.total * 100) + `% loaded`);
    },
    (error) => {
        // Handle errors
        console.error(`Error loading item: ${error}`);
    }
); 

//testend
/* 
modelInstall(GLTFLoader, '../gallery/3dAssets/streetTokyo/scene.gltf', BGscene, {scale: [1,1,1], position: [0,0,0]})
modelInstall(GLTFLoader, '../gallery/3dAssets/skylineBack1/scene.gltf', BGscene, {scale: [0.35,0.40,0.35], position: [0,0,-50]})
modelInstall(GLTFLoader, '../gallery/3dAssets/skylineBack2/scene.gltf', BGscene, {scale: [7.5,7.5,7.95], position: [-20,-2,-30], rotation: [0,280,0]}) */
lightsList.lightMenuWall = createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,220)', 0.1, 20, 3.8], posxyz:[-1, 1.5, 0.3], rotaxyz:[0,0,0], lightH:true, lightHSetup:[]})
lightsList.lightHangingBulb = createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,190)', 2, 1000, 1.7], posxyz: [0.000,2.800,-0.200], rotaxyz: [0.000,0.000,0.000], lightH:true, lightHSetup:[]})
lightsList.lightShop1Door = createLight("RectAreaLight", BGscene, {lightSetup:['rgb(220,220,190)', 3, 0.7, 2.5], posxyz:[-1.200,0.700,-1.400], rotaxyz:[0.000,-1.600,0.000], lightH:true, lightHSetup:[]})


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
animateMain()


//KONTROLLER

function kontroller(){
    let chosenLight = {};
    let chosenMesh;
    let chosenIncrement = 0.1;
    const kontrolBox = document.createElement("div")
    kontrolBox.style.position = "absolute"
    kontrolBox.style.zIndex = "999"
    kontrolBox.style.backgroundColor = "rgba(170,170,170,0.7)"
    kontrolBox.style.border = "1px solid black";
    kontrolBox.innerHTML = 
    `
    <div id="kontrolBox">KONTROLBOX
        <button id="kontrolLightsBtn">Lights</button>
        <button id="kontrolMeshesBtn">Meshes</button>
        <button id="closeKontrolsBtn">X</button>
    </div>
    <div id="kontrolLightsUI" style="display:none">kontrolLightsUI
        <div id="kontrolLightsChosen"><h1 id="chosenLightName"></h1>
            <div>Current XYZ position: <span id="lightPositionXYZ"></span></div>
            <div><button id="posXplus">posXplus</button> <button id="posYplus">posYplus</button> <button id="posZplus">posZplus</button></div>
            <div><button id="posXminus">posXminus</button> <button id="posYminus">posYminus</button> <button id="posZminus">posZminus</button></div>
            <div>Current XYZ Rotation: <span id="lightRotationXYZ"></span></div>
            <div><button id="rotaXplus">rotaXplus</button> <button id="rotaYplus">rotaYplus</button> <button id="rotaZplus">rotaZplus</button></div>
            <div><button id="rotaXminus">rotaXminus</button> <button id="rotaYminus">rotaYminus</button> <button id="rotaZminus">rotaZminus</button></div>
            <button id="saveChanges"> SAVE! (copies to clipboard) </button>
        </div>
        <ul id="kontrolLightsList"></ul>
    </div>
    <div id="kontrolMeshesUI" style="display:none">kontrolMeshesUI
    </div>
    `
    document.getElementsByTagName("body")[0].appendChild(kontrolBox)
    chosenIncrement //TEST
    function changeValueLoc(_type, _prop, _minus){
        console.log("what is the chosenLight apparently? ", chosenLight.name)
        try{
            chosenLight.name[_type][_prop] +=(_minus?-chosenIncrement:chosenIncrement)
            document.querySelector("#lightPositionXYZ").innerHTML= `X: ${chosenLight.name.position.x.toFixed(3)} Y: ${chosenLight.name.position.y.toFixed(3)} Z: ${chosenLight.name.position.z.toFixed(3)}`
            document.querySelector("#lightRotationXYZ").innerHTML= `X: ${chosenLight.name.rotation.x.toFixed(3)} Y: ${chosenLight.name.rotation.y.toFixed(3)} Z: ${chosenLight.name.rotation.z.toFixed(3)}`
        }
        catch{
            console.log("No chosen item as of now")
        }
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

    document.querySelector("#saveChanges").addEventListener("click", ()=>{navigator.clipboard.writeText(`posxyz:[${chosenLight.name.position.x.toFixed(3)},${chosenLight.name.position.y.toFixed(3)},${chosenLight.name.position.z.toFixed(3)}], rotaxyz:[${chosenLight.name.rotation.x.toFixed(3)},${chosenLight.name.rotation.y.toFixed(3)},${chosenLight.name.rotation.z.toFixed(3)}]`)})
    //   `posxyz[${chosenLight.name.position.x.toFixed(3)},${chosenLight.name.position.y.toFixed(3)},${chosenLight.name.position.z.toFixed(3)}], rotaxyz[${chosenLight.name.rotation.x.toFixed(3)},${chosenLight.name.rotation.y.toFixed(3)},${chosenLight.name.rotation.z.toFixed(3)}]`


    const kontrolLightsUI = document.getElementById("kontrolLightsUI")
    const kontrolMeshesUI = document.getElementById("kontrolMeshesUI")
    const kontrolLightsBtn = document.getElementById("kontrolLightsBtn")
    const kontrolMeshesBtn = document.getElementById("kontrolMeshesBtn")
    const kontrolLightsList = document.getElementById("kontrolLightsList")

    kontrolLightsBtn.addEventListener("click", ()=>{
        kontrolLightsUI.style.display = "flex"
    })
    kontrolMeshesBtn.addEventListener("click", ()=>{
        kontrolMeshesUI.style.display = "flex"
    })

    //click on object name to select it as main!
    Object.keys(lightsList).forEach((key)=>{
        let light = document.createElement("ul")
        light.innerHTML = `<button class="kontrolSelectBtn">${key}</button>` 
        kontrolLightsList.appendChild(light)
        light.addEventListener("click",()=>{
            console.log("changing chosenLight.name to: ", lightsList[key][0],)
            chosenLight.name = lightsList[key][0]
            document.querySelector("#chosenLightName").innerHTML = chosenLight.name
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



    

}

kontroller()