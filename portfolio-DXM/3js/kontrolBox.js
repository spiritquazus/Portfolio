//KONTROLLER
let kontrolActive = false;
function kontroller(_scene){

    if (kontrolActive){
        document.getElementById("kontrolBoxCont").style.display = "flex"
        return
    } else {
        kontrolActive = true;
    }

    let chosenLight = {};
    let chosenKey;
    let chosenMesh;
    let chosenCamera;

    let currentMode = null
    
    let chosenIncrement = 0.1;
    const kontrolBox = document.createElement("div")
    kontrolBox.id = "kontrolBoxCont"
    kontrolBox.innerHTML=
    `
    <div id="kontrolBox">KONTROLBOX
        <button id="kontrolLightsBtn">Lights</button>
        <button id="kontrolMeshesBtn">Meshes</button>
        <button id="kontrolCamerasBtn">Cameras</button>
        <button id="closeKontrolsBtn">X</button>
    </div>
    <div id="kontrolLightsUI" class="kontrolTab">
        <div id="kontrolLightsChosen"><h1>Kontrol Lights</h1><h3 id="chosenLightName"></h3>
            <br/>
            <span>Increment:</span>
            <input id="kontrolIncrementLight" type="text" value="0.1" style="width: 2rem">
            <br/>
            <br/>
            <div>Current XYZ position: <span id="lightPositionXYZ" class="kontrolDenom"></span></div>
            <div><button id="posXplus">posXplus</button> <button id="posYplus">posYplus</button> <button id="posZplus">posZplus</button></div>
            <div><button id="posXminus">posXminus</button> <button id="posYminus">posYminus</button> <button id="posZminus">posZminus</button></div>
            <br/>
            <div>Current XYZ Rotation: <span id="lightRotationXYZ" class="kontrolDenom"></span></div>
            <div><button id="rotaXplus">rotaXplus</button> <button id="rotaYplus">rotaYplus</button> <button id="rotaZplus">rotaZplus</button></div>
            <div><button id="rotaXminus">rotaXminus</button> <button id="rotaYminus">rotaYminus</button> <button id="rotaZminus">rotaZminus</button></div>
            <br/>

            <div>Lights Settings <span id="lightSettingsAAA" class="kontrolDenom"></span>:</div>
            <div style="display: flex">Color/skyColor<span id="lightOption1"></span><div id=lightSettingsColor></div></div>
            <div><button id="lightsRedPlus">Red+</button><button id="lightsRedMinus">Red-</button><button id="lightsGreenPlus">Green+</button><button id="lightsGreenMinus">Green-</button><button id="lightsBluePlus">Blue+</button><button id="lightsBlueMinus">Blue-</button></div>
            
            <div>Intensity/groundcolor - <span id="lightOption2" class="kontrolDenom"></span></div>
            <div><button id="lightOption2Plus">+</button><button id="lightOption2Minus">-</button></div>
            
            <div>Width/distance/skyIntensity - <span id="lightOption3" class="kontrolDenom"></span></div>
            <div><button id="lightOption3Plus">+</button><button id="lightOption3Minus">-</button></div>
            
            <div>Height/angle/decay - <span id="lightOption4" class="kontrolDenom"></span></div>
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
    <div id="kontrolCamerasUI" class="kontrolTab">kontrolCameraUI
        <div id="kontrolCameraOptions">
            <p id=chosenCameraName></p>
            <br/>
            <span>Increment:</span>
            <input id="kontrolIncrementCamera" type="text" value="0.1" style="width: 2rem">
            <br/>
            <div>Current XYZ position: <span id="cameraPositionXYZ" class="kontrolDenom"></span></div>
            <div><button id="posXplusCamera">posXplus</button> <button id="posYplusCamera">posYplus</button> <button id="posZplusCamera">posZplus</button></div>
            <div><button id="posXminusCamera">posXminus</button> <button id="posYminusCamera">posYminus</button> <button id="posZminusCamera">posZminus</button></div>
            <br/>
            <div>Current XYZ Rotation: <span id="cameraRotationXYZ" class="kontrolDenom"></span></div>
            <div><button id="rotaXplusCamera">rotaXplus</button> <button id="rotaYplusCamera">rotaYplus</button> <button id="rotaZplusCamera">rotaZplus</button></div>
            <div><button id="rotaXminusCamera">rotaXminus</button> <button id="rotaYminusCamera">rotaYminus</button> <button id="rotaZminusCamera">rotaZminus</button></div>
            <br/>
            <div id="cameraFrustum"></div>

            <div id="cameraFarPlane">
            
            </div>
            <div><button id="farCameraPlus">Far +</button> <button id="farCameraMinus">Far -</button></div>
            <div id="cameraNearPlane">
            
            </div>
            <div><button id="nearCameraPlus">Near +</button> <button id="nearCameraMinus">Near -</button></div>
            <div id="cameraFOV">
            
            </div>
            <div><button id="fovPlus">FOV +</button> <button id="fovMinus">FOV -</button></div>
            <div id="cameraZoom">
            
            </div>
            <div><button id="zoomPlus">Zoom +</button> <button id="zoomMinus">Zoom -</button></div>
            <br/>
            <button id="saveChangesCamera"> SAVE! (copies to clipboard) </button>
        </div>
        <div id="kontrolCamerasListCont"><h1>Camera List</h1>
            <ul id="kontrolCamerasList"> 
            </ul>
        </div>
        <button id="kontrolDisableOrbit">Orbit Mode On/Off</button>
    </div>
    `
    document.getElementsByTagName("body")[0].appendChild(kontrolBox)
    

    
    function changeValueLoc(_type, _prop, _minus){
/*         console.log("!!what is the chosenLight apparently? ", chosenLight)
        console.log("!!chosenLightIncrement: ", chosenIncrement) */
        if (currentMode == "lights"){
            try{
                _type==null ? chosenLight[_prop] +=(_minus?-chosenIncrement:chosenIncrement) : chosenLight[_type][_prop] +=(_minus?-chosenIncrement:chosenIncrement)
                updateChosenLightData()
            }
            catch(error){
                console.log(error, "If you haven't chosen an item or using the extra options, you can safely ignore this error.")
            }
        } else if (currentMode == "cameras"){
            try{
                _type==null ? chosenCamera[_prop] +=(_minus?-chosenIncrement:chosenIncrement) : chosenCamera[_type][_prop] +=(_minus?-chosenIncrement:chosenIncrement)
                updateChosenCameraData()
                BGcamera.updateProjectionMatrix()
            }
            catch(error){
                console.log(error, "If you haven't chosen an item or using the extra options, you can safely ignore this error.")
            }
        }
        
    }

    function changeValueSpecial(_type, _prop, _minus){
        console.log("what is the chosenLight apparently? ", chosenLight)

    }

    //lights
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

    document.querySelector("#lightOption4Plus").addEventListener("click", ()=>{changeValueLoc(null, "decay")})  
    document.querySelector("#lightOption4Minus").addEventListener("click", ()=>{changeValueLoc(null, "decay", true)})  

    document.querySelector("#saveChanges").addEventListener("click", ()=>{copyPasteLightSetup()})
    //lights end

    //camera
    document.querySelector("#posXplusCamera").addEventListener("click", ()=>{changeValueLoc("position", "x")})
    document.querySelector("#posYplusCamera").addEventListener("click", ()=>{changeValueLoc("position", "y")})  
    document.querySelector("#posZplusCamera").addEventListener("click", ()=>{changeValueLoc("position", "z")})  
    
    document.querySelector("#posXminusCamera").addEventListener("click", ()=>{changeValueLoc("position", "x", true)})  
    document.querySelector("#posYminusCamera").addEventListener("click", ()=>{changeValueLoc("position", "y", true)})  
    document.querySelector("#posZminusCamera").addEventListener("click", ()=>{changeValueLoc("position", "z", true)})  

    document.querySelector("#rotaXplusCamera").addEventListener("click", ()=>{changeValueLoc("rotation", "x")})  
    document.querySelector("#rotaYplusCamera").addEventListener("click", ()=>{changeValueLoc("rotation", "y")})  
    document.querySelector("#rotaZplusCamera").addEventListener("click", ()=>{changeValueLoc("rotation", "z")})  

    document.querySelector("#rotaXminusCamera").addEventListener("click", ()=>{changeValueLoc("rotation", "x", true)}) 
    document.querySelector("#rotaYminusCamera").addEventListener("click", ()=>{changeValueLoc("rotation", "y", true)})  
    document.querySelector("#rotaZminusCamera").addEventListener("click", ()=>{changeValueLoc("rotation", "z", true)})  

    document.querySelector("#fovPlus").addEventListener("click", ()=>{changeValueLoc(null, "fov")})  
    document.querySelector("#fovMinus").addEventListener("click", ()=>{changeValueLoc(null, "fov", true)})  

    document.querySelector("#nearCameraPlus").addEventListener("click", ()=>{changeValueLoc(null, "near")})  
    document.querySelector("#nearCameraMinus").addEventListener("click", ()=>{changeValueLoc(null, "near", true)})  

    document.querySelector("#farCameraPlus").addEventListener("click", ()=>{changeValueLoc(null, "far")})  
    document.querySelector("#farCameraMinus").addEventListener("click", ()=>{changeValueLoc(null, "far", true)})  

    document.querySelector("#zoomPlus").addEventListener("click", ()=>{changeValueLoc(null, "zoom")})  
    document.querySelector("#zoomMinus").addEventListener("click", ()=>{changeValueLoc(null, "zoom", true)})  
    
    document.querySelector("#lightOption4Plus").addEventListener("click", ()=>{changeValueLoc(null, "decay")})  
    document.querySelector("#lightOption4Minus").addEventListener("click", ()=>{changeValueLoc(null, "decay", true)})  
    document.querySelector("#saveChangesCamera").addEventListener("click", ()=>{copyPasteCameraSetup()})


    //camera end

    //   `posxyz[${chosenLight.position.x.toFixed(3)},${chosenLight.position.y.toFixed(3)},${chosenLight.position.z.toFixed(3)}], rotaxyz[${chosenLight.rotation.x.toFixed(3)},${chosenLight.rotation.y.toFixed(3)},${chosenLight.rotation.z.toFixed(3)}]`


    //lights start
    const kontrolLightsUI = document.getElementById("kontrolLightsUI"), 
        kontrolMeshesUI = document.getElementById("kontrolMeshesUI"), 
        kontrolCamerasUI = document.getElementById("kontrolCamerasUI"), 
        kontrolLightsBtn = document.getElementById("kontrolLightsBtn"), 
        kontrolMeshesBtn = document.getElementById("kontrolMeshesBtn"), 
        kontrolCamerasBtn = document.getElementById("kontrolCamerasBtn"), 
        kontrolLightsList = document.getElementById("kontrolLightsList"), 
        kontrolCamerasList = document.getElementById("kontrolCamerasList"), 
        lightSettingsColor = document.getElementById("lightSettingsColor"),
        kontrolTab = Array.from(document.getElementsByClassName("kontrolTab")),
        kontrolIncrementLight = document.getElementById("kontrolIncrementLight")


        kontrolIncrementLight.addEventListener('input', (event)=>{
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
        currentMode = "lights"
        console.log("current Mode: ", currentMode)
        chosenKey = null
    })

    kontrolMeshesBtn.addEventListener("click", ()=>{
        kontrolMeshesUI.style.display = "flex"
        currentMode = "meshes"
        console.log("current Mode: ", currentMode)
        chosenKey = null
    })

    kontrolCamerasBtn.addEventListener("click", ()=>{
        if (kontrolCamerasUI.classList.contains("kontrolTab")){
            kontrolTab.forEach((div)=>{
                div.classList.toggle("kontrolTab", true)
            })
        }
        kontrolCamerasUI.classList.toggle("kontrolTab")
        currentMode = "cameras"
        console.log("current Mode: ", currentMode)
        chosenKey = null
    })


    closeKontrolsBtn.addEventListener("click", ()=>{
        kontrolTab.forEach((div)=>{
            div.classList.toggle("kontrolTab", true)
            currentMode = null
            chosenKey = null
        })
    })


    //Lights Selector
    //click on object name to select it as main!
    Object.keys(lightsList).forEach((key)=>{
        let light = document.createElement("ul")
        light.innerHTML = `<button class="kontrolSelectBtn">${key}</button>` 
        kontrolLightsList.appendChild(light)
        light.addEventListener("click",()=>{
            if (lightsList[key].type == "AmbientLight"){
                chosenLight = lightsList[key]
                chosenKey = key
                console.log("changing chosenLight to: ", lightsList[key],)
            } else {
                chosenLight = lightsList[key][0]
                chosenKey = key
                console.log("changing chosenLight to: ", lightsList[key][0],)
            }
            updateChosenLightData()
            
        })
        if (lightsList[key][0] && lightsList[key][0]["rotation"] != undefined){
            const lightRotation = document.createElement("li")
            lightRotation.innerHTML = `ROTATION: x:${lightsList[key][0]["rotation"].x}, y:${lightsList[key][0]["rotation"].y}, z:${lightsList[key][0]["rotation"].z}`
            light.appendChild(lightRotation)
        }
        if (lightsList[key][0] && lightsList[key][0]["position"] != undefined){
            const lightPosition = document.createElement("li")
            lightPosition.innerHTML = `POSITION: x:${lightsList[key][0]["position"].x}, y:${lightsList[key][0]["position"].y}, z:${lightsList[key][0]["rotation"].z}`
            light.appendChild(lightPosition)
            console.log(Object.values(lightsList[key][0]))
        }
    })

    Object.keys(camerasList).forEach((key)=>{
        console.log("adding new camera to list: ", key)
        let camera = document.createElement("ul")
        camera.innerHTML = `<button class="kontrolSelectBtn">${key}</button>` 
        kontrolCamerasList.appendChild(camera)
        camera.addEventListener("click",()=>{
            console.log("switching to camera: ", key)
            chosenCamera = camerasList[key]
            chosenKey = key
            updateChosenCameraData()
        })
            
    })


/*         Object.entries(lightsList[key][0]).forEach(([key, value])=>{
            let lightStat = document.createElement("li")
            lightStat.innerHTML = `${key} = ${value}`
            light.appendChild(lightStat)
        }) */

        


        
        

        
        


    function updateChosenLightData(){
        document.querySelector("#chosenLightName").innerHTML = chosenKey

        if (chosenLight.type != "AmbientLight"){
            console.log("chosen light type detected: ", chosenLight.type)
            document.querySelector("#lightPositionXYZ").innerHTML= `X: ${fixInt(chosenLight.position.x)} Y: ${fixInt(chosenLight.position.y)} Z: ${fixInt(chosenLight.position.z)}`
            document.querySelector("#lightRotationXYZ").innerHTML= `X: ${fixInt(chosenLight.rotation.x)} Y: ${fixInt(chosenLight.rotation.y)} Z: ${fixInt(chosenLight.rotation.z)}`
        }
        
        lightSettingsColor.style.backgroundColor = `rgb(${chosenLight.color.r*255},${chosenLight.color.g*255},${chosenLight.color.b*255})`
        document.querySelector("#lightOption2").innerHTML = `Intensity: ${chosenLight.intensity}` //options 2
        if (chosenLight.type == "HemisphereLight"){
            document.querySelector("#lightOption2").innerHTML = `groundColor: ${fixInt(chosenLight.intensity)}`
        }
        switch (chosenLight.type){ //options 3
            case "RectAreaLight": 
                document.querySelector("#lightOption3").innerHTML = `Width: ${fixInt(chosenLight.width)}`
                break;
            case "PointLight":
            case "SpotLight":
                document.querySelector("#lightOption3").innerHTML = `Distance: ${fixInt(chosenLight.distance)}`
                break;
            case "HemisphereLight":
                document.querySelector("#lightOption3").innerHTML = `Intensity: ${fixInt(chosenLight.intensity)}`
                break;
            default:
                document.querySelector("#lightOption3").innerHTML = "N/A" //nothing.
                break;
        }
        switch (chosenLight.type){ //options 4
            case "RectAreaLight": 
                document.querySelector("#lightOption4").innerHTML = `Height: ${fixInt(chosenLight.height)}`
                break;
            case "SpotLight":
                document.querySelector("#lightOption4").innerHTML = `Angle: ${fixInt(chosenLight.angle)}`
                break;
            case "PointLight":
                document.querySelector("#lightOption4").innerHTML = `Decay: ${fixInt(chosenLight.decay)}`
                break;
            default:
                document.querySelector("#lightOption4").innerHTML = "N/A" //nothing.
                break;
        }
    }

    function fixInt(_int){
        return parseFloat(_int.toFixed(4))
    }
    
    function copyPasteLightSetup(){

        let option1 = `color:${chosenLight.color.r*255},${chosenLight.color.g*255},${chosenLight.color.b*255}`
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
                option3 = `width:${chosenLight.width}`
                option4 = `height:${chosenLight.height}`
                break
            case "SpotLight":
                option3 = `distance:${chosenLight.distance}`
                option4 = `angle:${chosenLight.angle}`
                break;
            case "PointLight":
                option3 = `distance:${chosenLight.distance}`
                option4 = `decay:${chosenLight.decay}`
                break;
        }

        navigator.clipboard.writeText(`
        posxyz:[${chosenLight.position.x.toFixed(4)},${chosenLight.position.y.toFixed(4)},${chosenLight.position.z.toFixed(4)}], 
        rotaxyz:[${chosenLight.rotation.x.toFixed(4)},${chosenLight.rotation.y.toFixed(4)},${chosenLight.rotation.z.toFixed(4)}],
        ${option1}, 
        ${option2}, 
        ${option3}, 
        ${option4}, 
        `)
    }

    
    function copyPasteCameraSetup(){

        navigator.clipboard.writeText(`
        posxyz:[${chosenCamera.position.x.toFixed(4)},${chosenCamera.position.y.toFixed(4)},${chosenCamera.position.z.toFixed(4)}], 
        rotaxyz:[${chosenCamera.rotation.x.toFixed(4)},${chosenCamera.rotation.y.toFixed(4)},${chosenCamera.rotation.z.toFixed(4)}],
        fustrum:${chosenCamera.aspect.toFixed(4)},
        far:${chosenCamera.far.toFixed(4)},
        near:${chosenCamera.near.toFixed(4)},
        fov:${chosenCamera.fov.toFixed(4)},
        zoom:${chosenCamera.zoom.toFixed(4)},
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
    //lights end

    function updateChosenCameraData(){
        document.querySelector("#chosenCameraName").innerHTML = chosenKey
        document.querySelector("#cameraPositionXYZ").innerHTML= `X: ${fixInt(chosenCamera.position.x)} Y: ${fixInt(chosenCamera.position.y)} Z: ${fixInt(chosenCamera.position.z)}`
        document.querySelector("#cameraRotationXYZ").innerHTML= `X: ${fixInt(chosenCamera.rotation.x)} Y: ${fixInt(chosenCamera.rotation.y)} Z: ${fixInt(chosenCamera.rotation.z)}`
        document.querySelector("#cameraFrustum").innerHTML = `Frustum: ${fixInt(chosenCamera.aspect)}`
        document.querySelector("#cameraFarPlane").innerHTML = `View Dist: ${fixInt(chosenCamera.far)}`
        document.querySelector("#cameraNearPlane").innerHTML = `View Close: ${fixInt(chosenCamera.near)}`
        document.querySelector("#cameraFOV").innerHTML = `Vertical FOV: ${fixInt(chosenCamera.fov)}`
        document.querySelector("#cameraZoom").innerHTML = `Zoom Effect: ${fixInt(chosenCamera.zoom)}`

/*     BGcamera.updateProjectionMatrix() ⚠️⚠️*/
    }

    function toggleHelper(_orbit){
        _orbit.enabled = !_orbit.enabled
    }
    
    document.querySelector("#kontrolDisableOrbit").addEventListener("click", ()=>{toggleHelper(_fullControls)})


}//kontroller end


