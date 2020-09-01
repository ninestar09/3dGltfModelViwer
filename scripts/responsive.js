function resizeRendererToDisplaySize(renderer, canvas) {
  const width = canvas.clientWidth,
    height = canvas.clientHeight;
  const needResize = width !== canvas.width || height !== canvas.height;
  if (needResize) renderer.setSize(width, height, false);
  return needResize;
}

export function updateProjection(renderer, camera, canvas) {
  if (resizeRendererToDisplaySize(renderer, canvas)) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
  }
}