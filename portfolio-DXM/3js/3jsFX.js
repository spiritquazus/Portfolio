import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

//lights:
const bulbLight1 = new THREE.PointLight('rgb(255,255,255)', 1, 100)
bulbLight1.position.set(0, 0, 0)
const pointLight1 = new THREE.PointLight("rgb(255,255,255)", 10, 1000, 1)

pointLight1.position.set(0, 0, 0)
const lightHelperPoint1 = new THREE.PointLightHelper(bulbLight1)
const lightHelper1 = new THREE.PointLightHelper(pointLight1)
const ambientLight = new THREE.AmbientLight("rgb(255,255,255)",0.1)

//createLight(PointLight, BGscene, {lightSetup:[], posxyz:[], rotaxyz[], lightH:false, lightHSetup:[]})
function createLight(_lightType, _scene, _obj){
    let newLight;
    let newLightHelper;
    switch (_lightType) {
        case 'PointLight':
            newLight = new THREE.PointLight(..._obj.lightSetup); 
            if (_obj.lightH){
                newLightHelper = new THREE.PointLightHelper(newLight, ..._obj.lightHSetup) //(color, intensity, decay...)
            }
            break;
        case 'SpotLight':
            newLight = new THREE.SpotLight(..._obj.lightSetup); 
            if (_obj.lightH){
                newLightHelper = new THREE.SpotLightHelper(newLight, ..._obj.lightHSetup)
            }
            break;
        case 'DirectionalLight':
            newLight = new THREE.DirectionalLight(..._obj.lightSetupffff);
            if (_obj.lightH){
                newLightHelper = new THREE.DirectionalLightHelper(newLight, ..._obj.lightHSetup)
            }
            break;
        case 'HemisphereLight':
            newLight = new THREE.HemisphereLight(..._obj.lightSetup); 
            if (_obj.lightH){
                newLightHelper = new THREE.HemisphereLightHelper(newLight, ..._obj.lightHSetup)
            }
            break;
        case 'RectAreaLight':
            newLight = new THREE.RectAreaLight(..._obj.lightSetup); 
            if (_obj.lightH){
                newLightHelper = new RectAreaLightHelper(newLight, ..._obj.lightHSetup)
            }
            break;
        case 'AmbientLight':
            newLight = new THREE.AmbientLight(..._obj.lightSetup); 
            break;
        default:
            console.error(`Light type "${_lightType}" not recognized.`);
            return null; 
    }
    newLight.position.set(..._obj.posxyz)
    newLight.rotation.set(..._obj.rotaxyz)
    //helper
    console.log(`Adding light ${newLight} to scene`)
    _scene.add(newLight)
    if (_obj.lightH){
        _scene.add(newLightHelper)
        console.log("adding light helper")
        return [newLight, newLightHelper]
    }
    return newLight
}



export {bulbLight1, pointLight1, lightHelper1, lightHelperPoint1, ambientLight, createLight}