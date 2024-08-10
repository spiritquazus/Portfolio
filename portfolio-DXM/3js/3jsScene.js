// ⚠️ import * as THREE from 'three'; three 
//⚠️ import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 


/* import * as THREE from 'https://unpkg.com/three@0.166.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.166.1/examples/jsm/controls/OrbitControls.js'; */

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';






const BGcamera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 500);
BGcamera.position.setZ(0);
BGcamera.position.setY(0.5);

const BGscene = new THREE.Scene(); //container 
const BGrenderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("cMain")
})
BGrenderer.setSize(window.innerWidth, window.innerHeight);
BGrenderer.render(BGscene, BGcamera);






/* gltfLoader.load('./gallery/3dAssets/landscapeTokyo/scene.gltf', (gltfScene)=>{
    gltfScene.scene.scale.set(2,2,2)
    
    tokyoGround = gltfScene
    console.log("gltf?: ", tokyoGround)
    BGscene.add(gltfScene);
    
})
 */

/* 
gltfLoader.load(
    './gallery/3dAssets/landscapeTokyo/scene.gltf',
    (gltfScene) => {
        gltfScene.scene.scale.set(1, 1, 1);
        gltfScene.scene.position.set(1, -60, -27.5);
        gltfScene.scene.rotation.set(-3 * Math.PI / 180, 130 * Math.PI / 180, 0);
        tokyoGround = gltfScene;
        console.log("GLTF loaded successfully:", tokyoGround);
        
        BGscene.add(gltfScene.scene); // Add gltfScene.scene to BGscene
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('Error loading GLTF:', error);
    }
); 
*/

/* gltfLoader.load(
    './gallery/3dAssets/landscapeTokyo2/scene.gltf',
    (gltfScene) => {
        gltfScene.scene.scale.set(1, 1, 1);
        gltfScene.scene.position.set(5, -44, -40.5);
        gltfScene.scene.rotation.set(0, 0, 0);
        tokyoGround = gltfScene;
        console.log("GLTF loaded successfully:", tokyoGround);
        
        BGscene.add(gltfScene.scene); // Add gltfScene.scene to BGscene
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    (error) => {
        console.error('Error loading GLTF:', error);
    }
); */



export {BGrenderer, BGcamera, BGscene} 