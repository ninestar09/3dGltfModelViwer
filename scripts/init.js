import * as THREE from "../threeJs/three.module.js";
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from "https://threejsfundamentals.org/threejs/resources/threejs/r119/examples/jsm/loaders/RGBELoader.js";

import { setUp } from "./settings.js";
import { load3dModel, createFloor } from "./objects.js";
import { updateProjection } from "./responsive.js";
import { updateMixer } from "./animateMonster.js";
import { settingByProjectType } from "./settingByProjectType.js";

export function initProject(canvas, model, projectType) {
  const { renderer, scene, camera, GltfLoader } = setUp({
    THREE,
    OrbitControls,
    GLTFLoader,
    RGBELoader
  }, {
    canvas,
    projectType,
    settingByProjectType
  });

  load3dModel(THREE, {
    loader: GltfLoader,
    scene,
    model,
    projectType,
    settingByProjectType
  });

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    updateProjection(renderer, camera, canvas);
    updateMixer();
  }

  animate();
}