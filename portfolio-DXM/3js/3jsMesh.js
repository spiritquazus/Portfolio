import * as THREE from 'three'; 


/* const vertexShader = document.getElementById('vertexShader').textContent;
const fragmentShader = document.getElementById('fragmentShader').textContent; */

//import vertexShader from '/portfolio-DXM/public/gallery/3jsTextures/shaders/vertexShader.glsl'
/* ⚠️import fragmentShader from './3js/gallery/3jsTextures/shaders/fragmentShader.glsl'

import bgCoverFragment from './3js/gallery/3jsTextures/shaders/bgCoverFragment.glsl'
import bgCoverVertex from './3js/gallery/3jsTextures/shaders/bgCoverVertex.glsl' */

const vertexShader = `
varying vec2 vertexUV; //vec2(0, 0.24) imported from vertexShader.glsl
varying vec3 vertexNormal; //defines facing direction of vertex.

void main() {
    vertexUV = uv;
    vertexNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); //boilerplate!
    
}
`

const fragmentShader = `
 
uniform sampler2D nightCityTex;

varying vec2 vertexUV; //vec2(0, 0.24). Imported from vertexShader.glsl
varying vec3 vertexNormal; //defines facing direction of vertex. Imported from vertexShader.glsl


void main() {
    float intensity = 1.05 - dot(vertexNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = vec3(0.3, 0.6, 1.0) * pow(intensity, 3.5);

    gl_FragColor = vec4(vec3(0.00, 0.00, 0.04) + texture2D(nightCityTex, vertexUV).xyz, 1.0);
        //vec3(0.05, 0.05, 0.15)
        //atmosphere
        
         
} `


const bgCoverFragment = `
varying vec3 vertexNormal;
void main(){
    float intensity = pow(0.8 - dot(vertexNormal, vec3(0, 0, 1.0)), 2.0); //first float defines actual intensity. 
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity;
}
`

const bgCoverVertex = `
varying vec3 vertexNormal; //defines facing direction of vertex.

void main() {
    vertexNormal = normal;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 ); //boilerplate!
    
}
`
//==MESH AND SHADERS==

//shaders:

const uniforms = { //for shaders! decides which texture to use as a base
    nightCityTex: {
        value: new THREE.TextureLoader().load('../gallery/3jsTextures/skylineBGNight.webp')
    }
}

const BGshaderMat = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader,
    fragmentShader,
})

const BGcoverMat = new THREE.ShaderMaterial({
    fragmentShader: bgCoverFragment, 
    vertexShader: bgCoverVertex,
    blending: THREE.AdditiveBlending, //🚩guarantees "transparency/blending"
    side: THREE.FrontSide, //🚩Which way shadows will go
})

//background Mesh:
const BGbackgroundMesh = new THREE.TextureLoader().load('../gallery/3jsTextures/tokyoBGNight.jpg') //unused
const BGbackgroundMaterial = new THREE.MeshPhongMaterial({ //unused
    map: BGbackgroundMesh,
    side: THREE.FrontSide,
})

//touchArea:
function createTouchSphere(_scene, _obj){
    const touchMaterial = new THREE.MeshBasicMaterial({ color: _obj.color?_obj.color:0x00ff00 });
    const touchArea = new THREE.SphereGeometry(0.2);
    const touchSphere = new THREE.Mesh(touchArea, touchMaterial);
    touchSphere.scale.set(..._obj.scalexyz)
    touchSphere.position.set(..._obj.posxyz)
    touchSphere.name = _obj.name;
    touchSphere.raycastable = true;
    console.log("created new touchSphere: ", touchSphere)
    _scene.add(touchSphere)
    return touchSphere
}




const BGbackgroundGeo = new THREE.PlaneGeometry(2700, window.innerHeight, 50);
/* const BGbackgroundGeo = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 50); //need to change so its not related to window width or height... terrible idea */
const BGbackgroundFull = new THREE.Mesh(BGbackgroundGeo, BGshaderMat)

BGbackgroundFull.position.set(20, 5.5, -25)
/* BGbackgroundFull.rotation.set(-10*Math.PI/180, 0, 0) */
BGbackgroundFull.scale.set(0.03, 0.03, 0.017)
BGbackgroundFull.rotation.set(0, -0.5, 0)





// Modify vertices to create a single crescent shape
const vertices = BGbackgroundGeo.attributes.position.array;
const curveStrength = -0.0011; // Adjust this for more or less curvature

for (let i = 0; i < vertices.length; i += 3) {
    const x = vertices[i];
    const z = vertices[i + 2];

    // Apply a curve that affects the entire width of the plane in one direction
    vertices[i + 2] = z - (x * x * curveStrength);
}

BGbackgroundGeo.attributes.position.needsUpdate = true;



//background Mesh 2:
const BGbackgroundGeo2 = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
const BGbackgroundFull2 = new THREE.Mesh(BGbackgroundGeo2, BGcoverMat)
BGbackgroundFull2.position.set(0, 250, -100)
BGbackgroundFull2.scale.set(0.4, 0.4, 0.4) //can change size of clone easily

//texture:

let glowTextureSimple = document.createElement('CANVAS');
glowTextureSimple.width = 100;
glowTextureSimple.height = 100;

let glowSimpleContext = glowTextureSimple.getContext('2d')
glowSimpleContext.fillStyle = 'white';
glowSimpleContext.filter = 'blur(17px) opacity(50%)'
glowSimpleContext.fillRect(0,0,512,512)


//==FUNCTIONS==

//radians converter:
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

//GLTF:

//modelInstall(GLTFLoader, '../gallery/3dAssets/streetTokyo/scene.gltf', {scale: [1,1,1], position: [2,0,0]})
function modelInstall(_loaderType, _item, _scene, _obj){
    const gltfLoader = new _loaderType();
    console.log(`model loader: ${_loaderType}`)
    return new Promise((resolve, reject) => {
        gltfLoader.load(
            _item,
            (gltfScene) => {
                function _upk(K, def1){return def1 ? (K ? K : [1,1,1]) : (K ? K : [0,0,0])}
                gltfScene.scene.scale.set(..._upk(_obj.scale, true));
                gltfScene.scene.position.set(..._upk(_obj.position))
                /* gltfScene.scene.rotation.set(..._upk(_obj.rotation)) */

                const [rotX, rotY, rotZ] = _upk(_obj.rotation);

                // Convert degrees to radians
                const x = degreesToRadians(rotX);
                const y = degreesToRadians(rotY);
                const z = degreesToRadians(rotZ);

                // Set rotation in radians
                gltfScene.scene.rotation.set(x, y, z);

                console.log("GLTF loaded successfully:", gltfScene);
                
                _scene.add(gltfScene.scene); // Add gltfScene.scene to BGscene

                const mixer = new THREE.AnimationMixer(gltfScene.scene);
                gltfScene.animations.forEach(clip => {
                    mixer.clipAction(clip).play();
                });

                // Store the mixer for updating
                if (!window.animationMixers) {
                    window.animationMixers = [];
                }
                window.animationMixers.push(mixer);


                resolve({ model: gltfScene.scene, mixer });
            },
            (xhr) => {
                console.log(`Loading: ${(xhr.loaded / xhr.total * 100)}%`);
            },
            (error) => {
                console.error(`Error loading item: ${error}`);
                reject(error)
            } 
        );
    })
}


//autoGenerate

function addRandoms(_color, _scene, _loop){
    const _geometry = new THREE.SphereGeometry(0.1,24,24);
    const _material = new THREE.MeshStandardMaterial({
        color:_color,
        emissiveMap: new THREE.CanvasTexture(glowTextureSimple),
        emissive: 'white',
        emissiveIntensity: 1,
    });

    for (let i = 0; i < _loop; i++){
    const _star = new THREE.Mesh( _geometry, _material)
    const  [x, y] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(40));
    const z = THREE.MathUtils.randFloat(-25, -35);
    _star.position.set(x, y, z);
    _scene.add(_star);
    }
}

export {addRandoms, modelInstall, BGbackgroundFull, BGbackgroundFull2, createTouchSphere};
