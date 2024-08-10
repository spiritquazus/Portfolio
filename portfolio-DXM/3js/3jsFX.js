import * as THREE from 'three'; 
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js'; 


//lights:
const bulbLight1 = new THREE.PointLight('rgb(255,255,255)', 1, 100)
bulbLight1.position.set(0, 0, 0)
const pointLight1 = new THREE.PointLight("rgb(255,255,255)", 10, 1000, 1)

pointLight1.position.set(0, 0, 0)
const lightHelperPoint1 = new THREE.PointLightHelper(bulbLight1)
const lightHelper1 = new THREE.PointLightHelper(pointLight1)
const ambientLight = new THREE.AmbientLight("rgb(255,255,255)",0.05)

//createLight(PointLight, BGscene, {lightSetup:[], posxyz:[], rotaxyz[], lightH:false, lightHSetup:[]})
function createLight(_lightType, _scene, _obj){
    let newLight;
    let newLightHelper;
    if (_obj.distance)_obj.lightHSetup = _obj.distance
    switch (_lightType) {
        case 'PointLight':
            newLight = new THREE.PointLight(..._obj.lightSetup); 
            if (_obj.lightH){
                newLightHelper = new THREE.PointLightHelper(newLight, _obj.lightHSetup) //(color, intensity, decay...)
            }
            break;
        case 'SpotLight':
            newLight = new THREE.SpotLight(..._obj.lightSetup); 
            if (_obj.lightH){
                newLightHelper = new THREE.SpotLightHelper(newLight, _obj.lightHSetup)
            }
            break;
        case 'DirectionalLight':
            newLight = new THREE.DirectionalLight(..._obj.lightSetup);
            if (_obj.lightH){
                newLightHelper = new THREE.DirectionalLightHelper(newLight, _obj.lightHSetup)
            }
            break;
        case 'HemisphereLight':
            newLight = new THREE.HemisphereLight(..._obj.lightSetup); 
            if (_obj.lightH){
                newLightHelper = new THREE.HemisphereLightHelper(newLight, _obj.lightHSetup)
            }
            break;
        case 'RectAreaLight':
            newLight = new THREE.RectAreaLight(..._obj.lightSetup); 
            if (_obj.lightH){
                newLightHelper = new RectAreaLightHelper(newLight, _obj.lightHSetup)
            }
            _obj.width?newLight.width = _obj.width:console.log(_lightType, " No light width detected. resorting to default")
            _obj.height?newLight.height = _obj.height:console.log(_lightType, " No light height detected. resorting to default")
            break;
        case 'AmbientLight':
            newLight = new THREE.AmbientLight(..._obj.lightSetup); 
            break;
        default:
            console.error(`Light type "${_lightType}" not recognized.`);
            return null; 
    } 

    if(_obj.posxyz)newLight.position.set(..._obj.posxyz)
    if(_obj.rotaxyz)newLight.rotation.set(..._obj.rotaxyz)
    _lightType=="HemisphereLight"?console.log("NOTREADYET"):_obj.lightColor?newLight.color.set(..._obj.lightColor):console.log(_lightType, " No light color detected. resorting to default")

    _obj.intensity?newLight.intensity=_obj.intensity:console.log(_lightType, " No light intensity detected. resorting to default")
    _obj.distance?newLight.distance=_obj.distance:console.log(_lightType, " No light distance detected. resorting to default")
    _obj.decay?newLight.decay=_obj.decay:console.log(_lightType, " No light decay detected. resorting to default")
    
    
    console.log(`Adding light ${newLight} to scene`)
    _scene.add(newLight)

    //helper
    if (_obj.lightH){
        _scene.add(newLightHelper)
        console.log("adding light helper")
        return [newLight, newLightHelper]
    }
    return newLight
}



export {bulbLight1, pointLight1, lightHelper1, lightHelperPoint1, ambientLight, createLight}