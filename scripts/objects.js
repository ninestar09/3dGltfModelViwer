import { createModelActionsGUI } from "./animateMonster.js";

// 3d model
export function load3dModel(THREE, components) {
  const {
    loader,
    scene,
    model,
    projectType,
    settingByProjectType
  } = components;
  
  loader.load(model, gltf => {
    if (scene.children.length > 0) {
      scene.children.forEach(child => {
        if (child.type === "Object3D" || child.type === "Group")
          scene.remove(child);
      })
    }

    const model = gltf.scene;
    scene.add(model);

    if (settingByProjectType[projectType].isAnimate)
      createModelActionsGUI(THREE, model, gltf.animations);

    if (settingByProjectType[projectType].needShadow) {
      model.traverse(object => {
        if (object.isMesh) object.castShadow = true;
      })
    }

    if (settingByProjectType[projectType].needFloor) createFloor(THREE, scene);
  }, undefined, err => {
    alert(JSON.stringify(err));
  })
}

// Floor
export function createFloor(THREE, scene) {
  var floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(2000, 2000), new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false }));
  floor.rotation.x = - Math.PI / 2;
  scene.add(floor);
  
  var grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
  grid.material.opacity = 0.2;
  grid.material.transparent = true;
  scene.add(grid);

  return floor;
}