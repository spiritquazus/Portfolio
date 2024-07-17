import * as THREE from 'three';

/* const vertexShader = document.getElementById('vertexShader').textContent;
const fragmentShader = document.getElementById('fragmentShader').textContent; */

import vertexShader from '../gallery/3jsTextures/shaders/vertexShader.glsl'
import fragmentShader from '../gallery/3jsTextures/shaders/fragmentShader.glsl'

import bgCoverFragment from '../gallery/3jsTextures/shaders/bgCoverFragment.glsl'
import bgCoverVertex from '../gallery/3jsTextures/shaders/bgCoverVertex.glsl'




//==MESH AND SHADERS==

//shaders:

const uniforms = { //for shaders! decides which texture to use as a base
    nightCityTex: {
        value: new THREE.TextureLoader().load('../gallery/3jsTextures/skylineBGNight.jpg')
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
const BGbackgroundGeo = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);
const BGbackgroundFull = new THREE.Mesh(BGbackgroundGeo, BGshaderMat)
BGbackgroundFull.position.set(0, 60, -200)
BGbackgroundFull.rotation.set(-10*Math.PI/180, 0, 0)
BGbackgroundFull.scale.set(0.5, 0.5, 0.2)

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

//GLTF:

//modelInstall(GLTFLoader, '../gallery/3dAssets/streetTokyo/scene.gltf', {scale: [1,1,1], position: [2,0,0]})
function modelInstall(_loaderType, _item, _scene, _obj){
    const gltfLoader = new _loaderType();
    console.log(`model loader: ${_loaderType}`)
    gltfLoader.load(
        _item,
        (gltfScene) => {
            function _upk(K, def1){return def1 ? (K ? K : [1,1,1]) : (K ? K : [0,0,0])}
            gltfScene.scene.scale.set(..._upk(_obj.scale, true));
            gltfScene.scene.position.set(..._upk(_obj.position))
            gltfScene.scene.rotation.set(..._upk(_obj.rotation))
            console.log("GLTF loaded successfully:", gltfScene);
            _scene.add(gltfScene.scene); // Add gltfScene.scene to BGscene
        },
        (xhr) => {
            console.log((xhr.loaded / xhr.total * 100) + `% loaded`);
        },
        (error) => {
            console.error(`Error loading item: ${error}`);
        }
    );
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
    const  [x, y] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
    const z = THREE.MathUtils.randFloat(-25, -35);
    _star.position.set(x, y, z);
    _scene.add(_star);
    }
}

export {addRandoms, modelInstall, BGbackgroundFull, BGbackgroundFull2};
