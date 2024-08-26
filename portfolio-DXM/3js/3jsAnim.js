function playModelAnim(gltfLoader, animationUrl, scene) {
    return new Promise((resolve, reject) => {
        gltfLoader.load(
            animationUrl,
            (gltfScene) => {

                const mixer = new THREE.AnimationMixer(scene);

                gltfScene.animations.forEach(clip => {
                    mixer.clipAction(clip).play();
                });

                if (!window.animationMixers) {
                    window.animationMixers = [];
                }
                window.animationMixers.push(mixer);

                resolve(mixer);
            },
            (xhr) => {
                console.log(`Loading animation: ${(xhr.loaded / xhr.total * 100)}%`);
            },
            (error) => {
                console.error(`Error loading animation: ${error}`);
                reject(error);
            }
        );
    });
}

// Animation update function to be called in your animation loop
function updateModelAnim(deltaTime) {
    if (window.animationMixers) {
        window.animationMixers.forEach(mixer => mixer.update(deltaTime));
    }
}

export { playModelAnim, updateModelAnim }