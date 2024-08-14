// ⚠️ import * as THREE from 'three'; three ddRandoms
//⚠️ import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 


/* import * as THREE from 'https://unpkg.com/three@0.166.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.166.1/examples/jsm/controls/OrbitControls.js'; */

import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';






const BGcamera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.1, 500);





/* 

    initial camera settings
        posxyz:[0.5178,0.3980,-0.7702], 
        rotaxyz:[-0.2016,0.0529,0.0108],
        fustrum:2.1076,
        far:500.0000,
        near:0.1000,
        fov:70.0000,
        zoom:1.0000,
        
*/

const BGscene = new THREE.Scene(); //container 
const BGrenderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("cMain")
})
BGrenderer.setSize(window.innerWidth, window.innerHeight);
BGrenderer.toneMapping = THREE.ReinhardToneMapping
BGrenderer.toneMappingExposure = 0.8
/* BGrenderer.render(BGscene, BGcamera); */


//on-resize adjust:
window.addEventListener('resize', () => {
    BGcamera.aspect = window.innerWidth / window.innerHeight
    BGcamera.updateProjectionMatrix()
    BGrenderer.setSize(window.innerWidth, window.innerHeight)
  })


const raycaster  = new THREE.Raycaster();
const pointer = new THREE.Vector2();
window.addEventListener('pointermove', onPointerMove);

function onPointerMove( event ) {
	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components
	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}








export {BGrenderer, BGcamera, BGscene, raycaster, pointer} 