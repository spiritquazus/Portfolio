// ⚠️ import * as THREE from 'three'; three ddRandoms
//⚠️ import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'; 


/* import * as THREE from 'https://unpkg.com/three@0.166.1/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.166.1/examples/jsm/controls/OrbitControls.js'; */

import * as THREE from 'three';
import { WebGLRenderer } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';





//⚠️todo: 
/* 
CubeTexturePass.js ⚠️ important! use instead of flat plane.
GlitchPass.js
OutlinePass.js
SAOPass.js
*/

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
const degRad = (degrees) => degrees * (Math.PI / 180);

const roomPov = [-0.11,0.4,-0.184] //room pos.
const roomRota = [0, -3, 0]
const scenicPov = [0.8508,-0.1581,-3.1654] //pos outside 1
const scenicRota = [-0.3799,2.2220,0.0142]
const scenicPov2 = [0.6260,0.1823,0.0102]
const scenicRota2 = [-0.2382,-0.5697,-0.1302]

const mainCanvas = document.getElementById("cMain")

//Renderer
const BGscene = new THREE.Scene(); //container 
const BGrenderer = new THREE.WebGLRenderer({
    version: 2,
    canvas: mainCanvas
})
BGrenderer.setSize(window.innerWidth, window.innerHeight);
BGrenderer.toneMapping = THREE.ReinhardToneMapping
BGrenderer.toneMappingExposure = 1.1
BGrenderer.gammaOutput = true;
BGrenderer.gammaFactor = userDevice=="mobile"?1.5:2;
BGrenderer.antialias = true;

console.log("Renderer ready: ", BGrenderer)

//composer for post-processing
const composer = new EffectComposer(BGrenderer);
const renderPass = new RenderPass(BGscene, BGcamera);
composer.addPass(renderPass);
console.log("Adding composer: ", composer)

//bloom
export function composerBloom(UeBloomPass){
  passList[UeBloomPass] = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.23, 0.5, 0.35);
  composer.addPass(passList[UeBloomPass]);
}
//DOF
export function composerBokeh(bokehPass){
  passList[bokehPass] = new BokehPass(BGscene, BGcamera, {
    focus: 0.005,
    aperture: 0.001, 
    maxBlur: 0.15
  });
  composer.addPass(passList[bokehPass]);
}

function resizeScr() {
  console.log("RESIZING")
  const width = document.body.clientWidth;
  const height = document.body.clientHeight;

  BGrenderer.setSize(width, height);
  if (BGcamera) {
      BGcamera.aspect = width / height;
      BGcamera.updateProjectionMatrix();
  }
}

window.addEventListener('resize', resizeScr);
window.addEventListener('orientationchange', () => {
  setTimeout(resizeScr, 1000); // Delay to ensure accurate dimensions after orientation change
});
resizeScr();



console.log("composer: ", composer)

/* BGrenderer.render(BGscene, BGcamera); */

if ( BGrenderer.getContext() instanceof WebGL2RenderingContext ) {
    composer.renderTarget1.samples = 8;
    composer.renderTarget2.samples = 8;
}

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


//FPS and Stats
import Stats from 'https://cdnjs.cloudflare.com/ajax/libs/stats.js/r17/Stats.min.js';
const fpsTracker = new Stats();
fpsTracker.dom.style.position = "absolute";
fpsTracker.dom.style.left = "50vmin";
threePerfChecker.appendChild(fpsTracker.dom);





export {BGrenderer, BGcamera, BGscene, raycaster, pointer, degRad, roomPov, roomRota, scenicPov, scenicRota, scenicPov2, scenicRota2, fpsTracker, composer} 