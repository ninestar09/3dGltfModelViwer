let mixer, clock;

export function createModelActionsGUI(THREE, model, animations) {
  mixer = new THREE.AnimationMixer(model);
  clock = new THREE.Clock();

  const action = mixer.clipAction(animations[0]);

  action.reset()
    .setEffectiveTimeScale(1)
    .setEffectiveWeight(1)
    .fadeIn(0.5)
    .play();
}

export function updateMixer() {
  if (clock) {
    const dt = clock.getDelta();
    if (mixer) mixer.update(dt);
  }
}