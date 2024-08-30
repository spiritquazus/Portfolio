
import * as THREE from 'three';

import {OrbitControls} from 'three/addons/controls/OrbitControls.js';

import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'; 

import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

import { addRandoms, modelInstall, BGbackgroundFull, BGbackgroundFull2, createTouchSphere, createSprite } from './3jsMesh.js'
import { BGrenderer, BGscene, BGcamera, raycaster, pointer, degRad, roomPov, roomRota, scenicPov, scenicRota, scenicPov2, scenicRota2, fpsTracker, composer, composerBloom, composerBokeh} from './3jsScene.js'
import { bulbLight1, pointLight1, lightHelper1, ambientLight, lightHelperPoint1, createLight} from './3jsFX.js'
import { playModelAnim, updateModelAnim } from './3jsAnim.js'
import { spawnCV, spawnContact, spawnProjects} from './main.js'

let targetHelper;
let toggleAnim = true;
let perfMode3D = false;
let postProcessing = {"bloom":false, "bokeh":false,};
window.passList = {"bloom":{}, "bokeh":{}}

let cameraModeCheck;
let _fullControls = new OrbitControls(BGcamera, BGrenderer.domElement);
_fullControls.enabled = false
window.spriteList = {}
window.lightsList = {}
window.modelsList = {}
window.camerasList = {}
let raycastList = {}

let mouseDownChk = false;
let isDragging = false;
let mousePos = { x: 0, y: 0 };
const dragThreshold = 5;

document.addEventListener("mousedown", (event) => {
    mouseDownChk = true;
    isDragging = false;
    mousePos = { x: event.clientX, y: event.clientY };
});

document.addEventListener("mousemove", (event) => {
    if (mouseDownChk) {
        const currMousePos = { x: event.clientX, y: event.clientY };
        const dist = Math.sqrt(
            Math.pow(currMousePos.x - mousePos.x, 2) +
            Math.pow(currMousePos.y - mousePos.y, 2)
        );

        if (dist > dragThreshold) {
            isDragging = true;
        }
    }
});

document.addEventListener("mouseup", () => {
    mouseDownChk = false;
});


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



 lightsList.pointlightTram = 
 createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,190)', 0.7, 1.3, 4.8], intensity: 0.7, distance:1.3, decay:4.8, posxyz:[8.0500,0.3050,-22.2000], rotaxyz:[0.000,0.600,0.000], lightH:true, lightHSetup:[]})

/* 
 lightsList.pointlightTram = 
createLight("RectAreaLight", BGscene, {lightSetup:['rgb(200,200,250)', 10, 0.7, 2.5], posxyz:[8.900,0.0550,4.3143],  rotaxyz:[0.0000,1.6000,0.0000], width:5, height: 0.39, lightH:true, lightHSetup:[]})

 */
/* modelInstall(GLTFLoader, '../gallery/3dAssets/suburbsBG/suburbs_wip1.gltf', BGscene, {scale: [0.1,0.1,0.1], position: [2.8,-2.2,-3.45], rotation: [0,-180,0]}),
modelInstall(GLTFLoader, '../gallery/3dAssets/yourRoom/BasemenrRoomFixed_2exp.gltf', BGscene, {scale: [0.2,0.2,0.2], position: [0,0,0], rotation: [0,180,0]}),
 */
export async function loadAllModels(){
    const modelLoadProm = [
/*         modelInstall(GLTFLoader, '../gallery/3dAssets/tram/cars.gltf', BGscene, {scale: [0.20,0.20,0.20], position: [8.8500,-0.250,12.2000], rotation: [0,270,0], name:"cars2", msg:kontrolMsg})
        .then(({ model }) => {
            model.children[0].material.depthWrite = true;
            model.children[0].renderOrder = -1
            console.log("mesh? ", model.children[0])
            console.log(model.children[0].material.depthWrite)
            if (model.children[0].isMesh && model.children[0].material.map){
                animatePlaneAndLight(model.children[0], lightsList.pointlightTram, 10)
                
            }
        }), */
        modelInstall(GLTFLoader, '../gallery/3dAssets/suburbsBG/suburbs_wip1.gltf', BGscene, {scale: [0.1,0.1,0.1], position: [2.8,-2.2,-3.45], rotation: [0,-180,0], name:"Background Suburbs", msg:kontrolMsg})
        .then(({ model }) => {
            console.log("train. ", model.children[11])
            animatePlaneAndLight(model.children[11], lightsList.pointlightTram, 30)
        }),
        modelInstall(GLTFLoader, '../gallery/3dAssets/yourRoom/BasemenrRoomFixed_2exp.gltf', BGscene, {scale: [0.2,0.2,0.2], position: [0,0,0], rotation: [0,180,0], name:"Room", msg:kontrolMsg})
        .then(({ model }) => {
/*             console.log("child of index 9: plane001", model.children[9]) */
        }),
        modelInstall(GLTFLoader, '../gallery/3dAssets/carsTraffic/carsTraffic.gltf', BGscene, {scale: [0.6,0.2,0.2], position: [0.9500,-2.000,-11.3000], rotation: [0,90,0], name:"cars1", msg:kontrolMsg})
        .then(({ model }) => {
            if (model.children[0].isMesh && model.children[0].material.map){
                scrollUV(model.children[0].material, 0.002, 0.7, 0.7)
            }
        }),
        modelInstall(GLTFLoader, '../gallery/3dAssets/kot1/scene.gltf', BGscene, {scale: [0.005,0.005,0.005], position: [0.0750,0.0790,-0.3950], rotation: [0,230,0], name:"Animated Cat", msg:kontrolMsg})
        .then(({ model, mixer }) => {
            console.log('Model and animations loaded successfully. ', model);
        })
        .catch(error => {
            console.error('Error loading model or animations: ', error);
        }),
    ]
    
    const [suburbBG, room, cat] = await Promise.all(modelLoadProm);
    modelsList.suburbBG = suburbBG;
    modelsList.room = room;
    modelsList.cat = cat;

    console.log("load: finished 3d model building")
    assetLoadCheck = Date.now()
    loadProg(60)
}

function scrollUV(material, _speed, _start, _end) {
    function update() {
        material.map.offset.x -= _speed; // Scroll the texture horizontally
        if (material.map.offset.x <= -_end) { 
            material.map.offset.x = _start;  // Reset after full scroll
        }
        if (material.emissiveMap){
            material.emissiveMap.offset.x -= _speed; // Scroll the texture horizontally
            if (material.emissiveMap.offset.x <= -_end) { 
                material.emissiveMap.offset.x = _start;  // Reset after full scroll
            }
        }
        requestAnimationFrame(update);
    }
    update();
}

function animatePlaneAndLight(_model, _lightAttach, _speed) {
    // Initialize variables for tracking time
    let lastTime = 0;

    function update(time) {
        // Calculate elapsed time
        const deltaTime = (time - lastTime) / 1000; // Time in seconds
        lastTime = time;

        // Animate the plane by moving it along the X-axis
        _model.position.z -= _speed * deltaTime;
        
        // Optionally, reset position if the plane moves too far
        if (_model.position.z < -200) { // Adjust -100 based on your scene
            _model.position.z = 200; // Reset to start position (adjust as needed)
        }

        // Move the light to follow the plane
        /* _lightAttach[0].position.x = _model.position.x; */
       /*  _lightAttach[0].position.y = _model.position.y;  */
       _lightAttach[0].position.z = (- _model.position.z / 10.278317451477051) -1;
/*         console.log("lightpos: ", _lightAttach[0].position.z)
        console.log("modelPos", _model.position.z) */

        // Request the next frame
        requestAnimationFrame(update);
    }

    // Start the animation
    update(0);
}

//kot pos-sofa: position: [0.0750,0.0790,-0.3950], rotation: [0,230,0]

/* lightsList.lightBGcityFront = 
createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,190)', 0.5, 9, 0.2], intensity: 0.15, distance: 8.4, posxyz:[0.000,1.200,-10.200], rotaxyz: [0.000,0.000,0.000], lightH:true, lightHSetup:[]})

lightsList.lightBGcityRight = 
createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,190)', 0.5, 9, 0.2], intensity: 0.11, distance: 7, posxyz:[6.000,0.000,-1.500], rotaxyz:[0.000,0.000,0.000], lightH:true, lightHSetup:[]})
 */
/* 
 lightsList.rectLightKanpan7ElevenNorth = 
createLight("RectAreaLight", BGscene, {lightSetup:['rgb(250,250,250)', 3, 0.7, 2.5], posxyz:[0.0750,-1.0500,-3.5450], intensity: 0.5, rotaxyz:[0.0000,6.2500,0.0000], width:0.65, height: 0.26, lightH:true, lightHSetup:[]})

lightsList.rectLightKanpan7ElevenEast = 
createLight("RectAreaLight", BGscene, {lightSetup:['rgb(250,250,250)', 3, 0.7, 2.5], posxyz:[6.5750,0.3550,-1.4450], intensity: 0.5, rotaxyz:[0.0000,-1.5500,0.0000], width:0.65, height: 0.26, lightH:true, lightHSetup:[]})
 */

lightsList.lightAmbient = 
createLight("AmbientLight", BGscene, {lightSetup:['rgb(37,38,84)', 0.03, 3, 1.9], intensity: 1.43})

lightsList.pointLight전등 = 
createLight("PointLight", BGscene, {lightSetup:['rgb(220,220,190)', 0, 9, 0.2], intensity: 0, distance: 0.4, decay:2.8, posxyz:[-0.0500,0.3000,-0.1000], rotaxyz:[0.000,0.600,0.000], lightH:true, lightHSetup:[]})
//lightsList.pointLight전등.intensity = 0.75;

lightsList.pointLight등 = 
createLight("PointLight", BGscene, {lightSetup:['rgb(255,255,255)', 0, 9, 0.2], intensity: 0, distance: 0.5, decay: 1.5, posxyz:[0.250,0.350,-0.400], rotaxyz:[-0.050,0.600,0.000], lightH:true, lightHSetup:[]})
//lightsList.pointLight등.intensity = 0.55;

lightsList.pointLight작은등 = 
createLight("PointLight", BGscene, {lightSetup:['rgb(240,185,110)', 0.5, 9, 0.2], intensity: 0.2, distance: 0.4, decay: 1, posxyz:[-0.3050,0.0900,-0.4850], rotaxyz:[-0.0500,0.5700,0.0000], lightH:true, lightHSetup:[]})

lightsList.rectLightパスコン1 = 
createLight("RectAreaLight", BGscene, {lightSetup:['rgb(183,229,250)', 3, 0.7, 2.5], posxyz:[0.035,0.255,0.255],  rotaxyz:[-0.000,0.070,0.000], width:0.15, height: 0.09, lightH:true, lightHSetup:[]})

lightsList.rectLightパスコン2 = 
createLight("RectAreaLight", BGscene, {lightSetup:['rgb(183,229,250)', 3, 0.7, 2.5], posxyz:[-0.125,0.255,0.255],  rotaxyz:[0.000,-0.100,0.000], width:0.15, height: 0.09, lightH:true, lightHSetup:[]})

lightsList.pointLightパスコン赤い = 
createLight("PointLight", BGscene, {lightSetup:['rgb(250,20,20)', 0.5, 9, 0.2], intensity: 0.1, distance: 0.25, decay: 0.7, posxyz:[-0.3550,0.0400,0.2150], rotaxyz:[0.1500,0.5700,0.0000], lightH:true, lightHSetup:[]})

lightsList.pointLightReact = 
createLight("PointLight", BGscene, {lightSetup:['rgb(77,255,255)', 0.5, 9, 0.2], intensity:0.39, distance:0.2, posxyz:[0.120,0.380,0.230],  rotaxyz:[-0.100,0.600,0.000], lightH:true, lightHSetup:[]})

lightsList.rectLight새로간판 = 
createLight("RectAreaLight", BGscene, {lightSetup:['rgb(250,250,250)', 3, 0.7, 2.5], posxyz:[-2.6250,1.4500,-8.5450],  intensity: 1, rotaxyz:[-2.6000,3.1500,0.0000], width:1.15, height: 0.26, lightH:true, lightHSetup:[]})

//example manip: lightsList.lightAmbient.intensity = 0;

raycastList.spawnCV = 
createTouchSphere(BGscene, {posxyz:[-0.0150,0.2550,0.20905], scalexyz:[1.2,0.6,0.3], name:"spawnCV"})

raycastList.spawnProjects =
createTouchSphere(BGscene, {posxyz:[-0.3550,0.1400,-0.3850], scalexyz:[0.85,1,0.6], name:"spawnProjects"})

raycastList.spawnContact =
createTouchSphere(BGscene, {posxyz:[0.3500,0.3500,-0.0700], scalexyz:[0.15,0.5,1.1], name:"spawnContact"})

raycastList.spawnCatFunc =
createTouchSphere(BGscene, {posxyz:[0.0750,0.1270,-0.3950], scalexyz:[0.225,0.225,0.225], name:"spawnCatFunc"})

createSprite(BGscene, "../gallery/3jsTextures/sprites/touchCircle.webp", {position: [0.2900,0.3500,-0.0700], scale: userDevice=="PC"?[0.07, 0.07, 0.07]:[0.08, 0.08, 0.08], name:"circlePhone"})
createSprite(BGscene, "../gallery/3jsTextures/sprites/iconPhone.svg", {position: [0.2900,0.3500,-0.0700], scale: userDevice=="PC"?[0.05, 0.05, 0.05]:[0.06, 0.06, 0.06], name:"phone"})

createSprite(BGscene, "../gallery/3jsTextures/sprites/touchCircle.webp", {position: [-0.3550,0.1500,-0.3850], scale: userDevice=="PC"?[0.08, 0.08, 0.08]:[0.09, 0.09, 0.09], name:"circleProj"})
createSprite(BGscene, "../gallery/3jsTextures/sprites/iconProj.svg", {position: [-0.3550,0.1500,-0.3850], scale: userDevice=="PC"?[0.06, 0.06, 0.06]:[0.07, 0.07, 0.07], name:"proj"})

createSprite(BGscene, "../gallery/3jsTextures/sprites/touchCircle.webp", {position: [-0.0490,0.2550,0.11905], scale: userDevice=="PC"?[0.07, 0.07, 0.07]:[0.08, 0.08, 0.08], name:"circleCV"})
createSprite(BGscene, "../gallery/3jsTextures/sprites/iconCV.svg", {position: [-0.0490,0.2550,0.11905], scale: userDevice=="PC"?[0.05, 0.05, 0.05]:[0.06, 0.06, 0.06], name:"CV"})

createSprite(BGscene, "../gallery/3jsTextures/sprites/touchCircleSmol.webp", {position: [0.0250,0.1790,-0.3050], scale: userDevice=="PC"?[0.025, 0.025, 0.025]:[0.035, 0.035, 0.035], name:"circleCat"})
createSprite(BGscene, "../gallery/3jsTextures/sprites/iconTouch.svg", {position: [0.0250,0.1790,-0.3050], scale: userDevice=="PC"?[0.020, 0.020, 0.020]:[0.030, 0.030, 0.030], name:"cat"})

addRandoms('rgb(255,255,255)', BGscene, 100)
BGscene.add(BGbackgroundFull)
BGscene.add(BGbackgroundFull2)

//lightsList.pointLight전등.intensity = 0.75;

//initial setup:
const targetGeometry = new THREE.SphereGeometry(0.05, 32, 32); //target for the orbit
const targetMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 }); 
targetHelper = new THREE.Mesh(targetGeometry, targetMaterial);
targetHelper.position.copy(_fullControls.target);
BGscene.add(targetHelper);
const gridHelper = new THREE.GridHelper();
BGscene.add(gridHelper);
gridHelper.visible = false
targetHelper.visible = false
BGscene.traverse((object) => {
    if (object.type.includes('Helper')) {
    object.visible = false;
    }
});
console.log("At start-up: current performance score: ", checkPerformance())

//animate Function
const threeJsClock = new THREE.Clock();
let intersects
export function animateMain(){
    fpsTracker.begin();
    // update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, BGcamera );
    // calculate objects intersecting the picking ray
    intersects = raycaster.intersectObjects(Object.values(raycastList));
/* 
     console.log("check interesects: ", intersects) //well of course it doesnt exist ytet  */

 	
 
    //get the time elapsed since the last call
    const deltaTime = threeJsClock.getDelta(); 
    //updates animation according to next move
    if (toggleAnim)updateModelAnim(deltaTime);
    fpsTracker.end();
    /* BGrenderer.render(BGscene, BGcamera); */
    requestAnimationFrame(animateMain)
    composer.render();
}

//raycast setup

function raycastHover(){
    
    if (intersects[0]){
        const currentMesh = intersects[0].object
        currentMesh.material.color.set( "rgb(0, 0, 255)" );
        currentMesh.hovered = true
        document.body.style.cursor = "pointer"
    } else {
        Object.values(raycastList).forEach((obj)=>{
            obj.hovered = false
            obj.clicked = false
            obj.material.color.set( "rgb(0, 255, 0)" )
            
        })
        document.body.style.cursor = "default"
    }
    
}

function raycastClick(){
    if (intersects[0] && !isDragging){
        const currentMesh = intersects[0].object
        currentMesh.material.color.set( "rgb(255, 0, 0)" ); 
        currentMesh.clicked = true
        switch (currentMesh.name){
            case "spawnCV":
                //do shit
                spawnCV()
                gsapForce({position: [-0.1096,0.3001,0.0156], rotation: [-2.8944,-0.1558,-3.0673], time: 0.6})
                freezeCamera(BGscene, true) 
                toggleSprite("off")
                break;
            case "spawnProjects":
                //do shit
                spawnProjects()
                gsapForce({position: [-0.1850,0.1874,-0.1566], rotation: [-0.0580,0.4751,0.0406], time:0.5})
                freezeCamera(BGscene, true)
                toggleSprite("off")
                break;
            case "spawnContact":
                //do shit
                spawnContact()
                gsapForce({position: [0.1559,0.3526,-0.0182], rotation: [-2.0473,-1.3194,-2.0620], time: 0.5})
                freezeCamera(BGscene, true)
                toggleSprite("off")
                break;
            case "spawnCatFunc":
                catFunc()
                break;
        }
    }
}

//sprite toggle

function toggleSprite(_force){
    Object.values(spriteList).forEach((sprite)=>{
        if (_force == "on") sprite.visible = true
        else if (_force == "off") sprite.visible = false
        else sprite.visible = !sprite.visible
    })
}


//camera works

function freezeCamera(_scene, _bool){
    if (_bool){
        _fullControls.enabled = false
        setTimeout(()=>{ 
            document.addEventListener("click", recoverCamera, { once: true })
        },300)
    } else {
        _fullControls.enabled = true
    }
}

function recoverCamera(){
    gsapForce({position: roomPov, time: 0.6})
    toggleSprite("on")
    document.removeEventListener("click", recoverCamera)
    setTimeout(()=>{
        freezeCamera(BGscene, false)
    },600)
    
}

let catSFX = ["cat1.aac", "cat2.aac", "cat3.aac", "cat4.aac"]
function catFunc(){
    const num = Math.floor(Math.random() * 4)
    playSFX(playSFXReact, catSFX[num], "3d")
}

function gsapForce(_obj){
    if(_obj.position){
        gsap.to(BGcamera.position, {
            x: _obj.position[0],
            y: _obj.position[1],
            z: _obj.position[2],
            duration: _obj.time,
            ease: "power2.inOut",
            onComplete: () => {
                BGcamera.updateProjectionMatrix() 
            }
        });
    }
    if(_obj.rotation){
        gsap.to(BGcamera.rotation, {
            x: _obj.rotation[0],
            y: _obj.rotation[1],
            z: _obj.rotation[2],
            duration: 0,
            ease: "power2.inOut"
        });
    }
}
    
//gsapForce({position: [0.1459,0.3526,-0.1182], rotation: [-2.1473,-1.2194,-2.1620]})
const camFocTelephone = `
posxyz:[0.1559,0.3526,-0.0182], 
rotaxyz:[-2.0473,-1.3194,-2.0620],
fustrum:2.1076,
far:500.0000,
near:0.1000,
fov:70.0000,
zoom:1.0000,
`
//gsapForce({position: [-0.1096,0.3001,0.0156], rotation: [-2.8944,-0.1558,-3.0673]})
const camFocComputer = `
posxyz:[-0.1096,0.3001,0.0156], 
rotaxyz:[-2.8944,-0.1558,-3.0673],
fustrum:2.1076,
far:500.0000,
near:0.1000,
fov:70.0000,
zoom:1.0000,
`
//gsapForce({position: [-0.1850,0.2074,-0.1566], rotation: [-0.0580,0.4751,0.0406]})
const camFocRecords = `
posxyz:[-0.1850,0.2074,-0.1566], 
rotaxyz:[-0.0580,0.4751,0.0406],
fustrum:2.1076,
far:500.0000,
near:0.1000,
fov:70.0000,
zoom:1.0000,
`


//INITIAL CAMERA POS
camerasList.BGcamera = BGcamera
BGcamera.rotation.set(...scenicRota);
BGcamera.position.set(...scenicPov)
BGcamera.updateProjectionMatrix() 
/* 
    const roomPov = [-0.11,0.4,-0.184] //room pos.
    const roomRota = [0, -3, 0]
    const scenicPov = [0.7545,-0.3523,-0.6129] //pos outside 1
    const scenicRota = [degRad(-0.08), degRad(0.08), degRad(0)]
    const scenicPov2 = [0.6260,0.1823,0.0102]
    const scenicRota2 = [-0.2382,-0.5697,-0.1302]
*/

async function gsapIntroAnim() {
    _fullControls.enabled = false;

    gsap.to(BGcamera.position, {
        x: roomPov[0],
        y: roomPov[1],
        z: roomPov[2],
        duration: 4,
        delay: 1,
        ease: "power2.inOut"
    });

    gsap.to(BGcamera.rotation, {
        x: roomRota[0],
        y: roomRota[1],
        z: roomRota[2],
        delay: 4.2,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
            // Ensure camera rotation is correct
            BGcamera.rotation.set(0, -3, 0);
            _fullControls.target.set(
                BGcamera.position.x,
                BGcamera.position.y,
                BGcamera.position.z + 0.1
            );
            _fullControls.enabled = true;
        }
    });
}

export async function camWarmUp() {
    return new Promise((resolve)=>{
        console.log('load: engaging warmup round 1')
        kontrolMsg.innerText = "Warming up camera..."
        BGcamera.position.set(...roomPov) //room pos.
        gsap.to(BGcamera.rotation, {
            x: BGcamera.rotation.x + degRad(360),   
            duration: 0.5,
            ease: "power2.inOut",
            onComplete: () => {
                console.log('load: engaging warmup round 2')
                kontrolMsg.innerText = "Concluding camera warm-up..."
                loadProg(15)
                gsap.to(BGcamera.rotation, {
                    y: BGcamera.rotation.y + degRad(360),   
                    duration: 0.5,
                    ease: "power2.inOut",
                    onComplete: () => {
                        BGcamera.rotation.set(...scenicRota2)
                        gsap.to(BGcamera.rotation, {
                            y: BGcamera.rotation.y,
                            duration: 0.1,
                            delay: 0.1,
                            onComplete: () =>{
                                setTimeout(() => { 
                                    BGcamera.position.set(...scenicPov2)
                                    BGcamera.rotation.set(...scenicRota2)
                                    BGcamera.updateProjectionMatrix()
                                    console.log("load: warmup complete")
                                    loadProg(15)
                                    resolve()
                                }, 1500);
                            }
                        })

                    }
                })
            }
        })
    })
}


//Cinematic or Editor
function cinematicMode() {
    _fullControls.enabled = true;
    _fullControls.enableDamping = true; // Inertia damping
    _fullControls.dampingFactor = 0.2;
    _fullControls.enablePan = false; // Disable panning
    _fullControls.minDistance = 0.0;
    _fullControls.maxDistance = 0.05;
    if (kontrolActive)document.getElementById("kontrolBoxCont").style.display = "none"
    targetHelper.visible = false;
    gridHelper.visible = false
    threePerfChecker.style.display = "none"
    Object.values(raycastList).forEach((obj)=>{
        obj.visible = false
    })
    BGscene.traverse((object) => {
        if (object.type.includes('Helper')) {
        object.visible = false;
        }
    });
    cameraModeCheck = "cinematic"
    threeEditorMode.classList.toggle("filter-activated", false)
}

function editorMode(_scene) {
    _fullControls.enabled = true;
    _fullControls.enablePan = true; // Disable panning
    _fullControls.enableDamping = false; // Inertia damping
    _fullControls.minDistance = 0.0;
    _fullControls.maxDistance = Infinity;
    gridHelper.visible = true
    targetHelper.visible = true
    threePerfChecker.style.display = "block"
    Object.values(raycastList).forEach((obj)=>{
        obj.visible = true
    })
    kontroller(_scene)
    _scene.traverse((object) => {
        if (object.type.includes('Helper')) {
        object.visible = true;
        }
    });
    cameraModeCheck = "editor"
    threeEditorMode.classList.toggle("filter-activated", true)
}

threeEditorMode.addEventListener("click", ()=>{
    cameraModeCheck = cameraModeCheck==="editor"?"cinematic":"editor"
    if (cameraModeCheck === "editor"){
        editorMode(BGscene)
    } else {
        cinematicMode()
    }
})

//Bloom and Bokeh toggle

function togglePP(_effect, _force, _light){
    if (_effect == "bloom"){
        if (_force){
            postProcessing.bloom = true;
        }
        if (postProcessing.bloom == true){
            console.log("turning off bloom")
            bloomDispose()
            threeBloom.classList.toggle("filter-activated", false)
        } else {
            composerBloom("bloom")
            postProcessing.bloom = true
            console.log("turning on bloom")
            threeBloom.classList.toggle("filter-activated", true)
        }
    } else {
        if (_force){
            postProcessing.bokeh = true;
        }
        if (postProcessing.bokeh == true){
            bokehDispose()
            if (_light){
                lightsList.lightAmbient.color.b = 0.329
                lightsList.lightAmbient.color.g = 0.115
                lightsList.lightAmbient.color.r = 0.115
            }
            threeBokeh.classList.toggle("filter-activated", false)
        } else {
            composerBokeh("bokeh")
            postProcessing.bokeh = true
            if (_light){
                lightsList.lightAmbient.color.b = 0.596
                lightsList.lightAmbient.color.g = 0.289
                lightsList.lightAmbient.color.r = 0.288
            }
            threeBokeh.classList.toggle("filter-activated", true)
        }
    }
    console.log("!! postProcessing OBJ: ", postProcessing.bloom, postProcessing.bokeh)
}

function bloomDispose() {
/*     console.log("!!current passlist", passList)
    console.log("!! what is composer then, ", composer) */
    if (passList.bloom) {
        const bloom = passList.bloom
/*         console.log("!!activated the disposal.") */
        composer.removePass(bloom);

        bloom.renderTargetsHorizontal.forEach(target => target.dispose());
        bloom.renderTargetsVertical.forEach(target => target.dispose());

        if (bloom.renderTargetBright)bloom.renderTargetBright.dispose();

        if (bloom.materialBright)bloom.materialBright.dispose();
        if (bloom.materialComposite)bloom.materialComposite.dispose();

        if (bloom.materialBlur)bloom.materialBlur.dispose();
        if (bloom.materialCopy)bloom.materialCopy.dispose();

        passList.bloom = null
        postProcessing.bloom = false
        console.log("post-disposal passlist, ", passList)
    }
}

function bokehDispose() {
    if (passList.bokeh) {
        const bokeh = passList.bokeh
        composer.removePass(bokeh);

        if (bokeh.materialBokeh) {
            bokeh.materialBokeh.dispose();  
        }
        if (bokeh.uniforms) {
            if (bokeh.uniforms.tColor && bokeh.uniforms.tColor.value) {
                bokeh.uniforms.tColor.value.dispose(); 
            }
            if (bokeh.uniforms.tDepth && bokeh.uniforms.tDepth.value) {
                bokeh.uniforms.tDepth.value.dispose();  
            }
        }

        if (bokeh.renderTargetColor) {
            bokeh.renderTargetColor.dispose();
        }
        if (bokeh.renderTargetDepth) {
            bokeh.renderTargetDepth.dispose();
        }

        passList.bokeh = null
        postProcessing.bokeh = false
        console.log("post-disposal passlist, ", passList)
    }
}

threeBloom.addEventListener("click", ()=>{togglePP("bloom")})
threeBokeh.addEventListener("click", ()=>{togglePP("bokeh", false, "light")})


//start-up settings

export async function welcomeStartUp(){
/*     await loadAllModels()
    threeLoadingScreen.style.opacity = "0" */
    await gsapIntroAnim() //duration actually instant, set timeout instead
    setTimeout(()=>{
        BGrenderer.domElement.addEventListener("click", raycastClick)
        BGrenderer.domElement.addEventListener("mousemove", raycastHover)
        cinematicMode()
        setTimeout(()=>{
            lightsList.pointLight등[0].intensity = 0.55;
            lightsList.pointLight전등[0].intensity = 0.75; 
            toggleSprite()
            ui2d.style.opacity = 1
            document.addEventListener("mousedown", ()=>{
                ui2d.style.opacity = 0
                setTimeout(()=>{ui2d.style.display="none"}, 500)
            }, {once: true})
            document.addEventListener('touchstart', (event) => {
                ui2d.style.opacity = 0
                setTimeout(()=>{ui2d.style.display="none"}, 500)
            }, {once: true})
        },500)
        console.log("post-anim performance score: ", checkPerformance())
    },6500)
}

async function firstLoad(){
    await loadAllModels()
    animateMain()
    console.log("pre-intro performance score: ", checkPerformance(3))
    kontrolMsg.innerText="Preparing 3D render and animation"
    loadProg(10)
    await camWarmUp()
    perfCheck.end = performance.now(); //perfCheck.start is inititalized in 3jsDOM.js
    threeLoadingScreen.style.opacity = "0"
    threeIntroText.style.opacity = "1" 
    toggleSprite()
    document.addEventListener("keydown", startApp);
    document.addEventListener("click", startApp);
    document.addEventListener("touchstart", startApp);
}

function startApp(event) {
    event.preventDefault();
    threeIntroText.style.opacity = "0"
    document.removeEventListener("keydown", startApp);
    document.removeEventListener("click", startApp);
    document.removeEventListener("touchstart", startApp);
    welcomeStartUp()
    playSFX(playingBGM, "gunzBGM.mp3", "3d")
    playSFX(playSFXBG, "streetAmb.mp3", "3d")
}

function perfMode3DToggle(){
    if (!perfMode3D){
        try{
            const cat = modelsList["Animated Cat"];
            toggleAnim = false;
            BGscene.remove(cat);
            if (cat.geometry) cat.geometry.dispose();
            if (cat.material) {
                if (Array.isArray(cat.material)) {
                    cat.material.forEach(material => {
                        if (material.map) material.map.dispose();  // Dispose of textures
                        material.dispose();
                    });
                } else {
                    if (cat.material.map) cat.material.map.dispose();  // Dispose of textures
                    cat.material.dispose();
                }
            }
            BGscene.remove(raycastList.spawnCatFunc)
            delete modelsList["Animated Cat"];
            spriteList.cat.visible = false
            spriteList.circleCat.visible = false
            console.log("El gato is gone :(")
            togglePP("bloom", true)
            togglePP("bokeh", true, "light")
            perfMode3D = !perfMode3D  
        } catch (error){
            console.warn("Performance Mode didnt switch on. Models not consumed yet? ", error)
        }

    } else {
        try {
            //add cat
            //add cat raycastlist
            //re-add bokeh
            //re-add bloom
            perfMode3D = !perfMode3D  
        } catch (error){
            console.log("Could not restore normal mode.", error)
        }
    }
}

function checkPerformance(_round) {
    let perfScore = 10;
    console.log("detecting user machine perf. ", window.performance)
    console.log("detecting user agent: ", navigator.userAgent)
    console.log("detecting user device memory: ", navigator.deviceMemory)
    console.log("detecting user device HW: ", navigator.hardwareConcurrency)
    const perf = window.performance;
    const memory = perf.memory;
    let availableMemory = null
    let timing = null

    try {
        if (typeof performance.memory !== 'undefined') {
            console.log('Memory information:', performance.memory.jsHeapSizeLimit);
            availableMemory = (performance.memory.jsHeapSizeLimit - performance.memory.usedJSHeapSize)/1000000000;
        } else {
            console.log("performance.memory is not supported in this browser! Aborting");
        }
    } catch (error) {
        console.error("error accessing performance.memory: ", error);
    }

    try {
        timing = perf.timing;
    } catch (error) {
        timing = null
        console.log("error infiltrating memory: ", error)
    }
    
    
    if (timing != null && timing != undefined){
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
    }
    

    //avail memory 
    if (availableMemory != null && availableMemory < 2.5){
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

    if (perfCheck.start && perfCheck.end && perfCheck.end  - perfCheck.start > 8000){
        console.warn(`Full init took ${(perfCheck.end  - perfCheck.start) / 1000} seconds. Slow loading time`);
        perfScore -= 2
    } 

    
    if (perfScore < 5){
        console.warn(`Warning: specs very low. Entering performance mode.`)
        //⚠️⚠️to do: disable bg and swap with 2d, disable some lights. 
        perfMode3DToggle()
    } else if (perfScore < 7){
        console.warn(`Warning: specs rather low. Reducing post-processing and texture filter.`)
    } else if (_round == 3){
        console.warn("Final Verdict: Device performance above average. Enabling all effects")
        togglePP("bloom")
        if (userDevice=="PC"){

            togglePP("bokeh", false, "light") 
        }
        
    }
    loadTimeDisplay.innerText = perfCheck.end?perfCheck.end  - perfCheck.start:"unknown"
    assetLoadDisplay.innerText = (assetLoadCheck - startTime)/1000  ;
    perfScoreDisplay.innerText = perfScore
    return perfScore
}


firstLoad()