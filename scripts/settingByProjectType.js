export const settingByProjectType = {
  "Monsters": {
    camera: {
      position(camera) {
        camera.position.set(0, 5, 10);
      }
    },
    orbitControls: {
      target(orbitControls) {
        orbitControls.target.set(0, 3, 0);
      }
    },
    isAnimate: true,
    needShadow: true,
    needFloor: true,
    needDirectionalLight: true,
    needHemisphereLight: true,
    needEnvironment: false
  },

  "Rings": {
    camera: {
      position(camera) {
        camera.position.set(1, 0.3, 0.3);
      }
    },
    orbitControls: {
      target(orbitControls) {
        orbitControls.target.set(0, 0, 0);
      }
    },
    isAnimate: false,
    needShadow: false,
    needFloor: false,
    needDirectionalLight: false,
    needHemisphereLight: false,
    needEnvironment: true
  },
}