export function setUp(packages, components) {

  const { THREE, OrbitControls, GLTFLoader, RGBELoader } = packages;
  const { canvas, projectType, settingByProjectType } = components;

  const canvasWidth = canvas.clientWidth,
    canvasHeight = canvas.clientHeight;

  // Renderer
  function setUpRenderer() {
    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(canvasWidth, canvasHeight, false);
    renderer.outputEncoding = THREE.sRGBEncoding;

    return renderer;
  }

  // Scene
  function setUpScene() {
    const scene = new THREE.Scene();
    setUpBackgroundWithFog(scene);

    scene.position.set(0, 0, 0);

    return scene;
  }

  function setUpBackgroundWithFog(scene) {
    scene.background = new THREE.Color(0xe0e0e0);
    scene.fog = new THREE.Fog(0xe0e0e0, 20, 100);
  }

  // Camera
  function setUpCamera() {
    const fov = 45;
    const aspectRatio = canvasWidth / canvasHeight;
    const near = 0.01;
    const far = 1000;

    const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

    settingByProjectType[projectType].camera.position(camera);

    return camera;
  }

  // GLTF Loader
  function setUpGltfLoader() {
    const GltfLoader = new GLTFLoader();

    return GltfLoader;
  }

  // Orbit controls
  function setUpOrbitControls(camera) {
    const orbitControls = new OrbitControls(camera, canvas);

    settingByProjectType[projectType].orbitControls.target(orbitControls);

    orbitControls.update();

    return orbitControls;
  }

  function setUpCubeMapTexture(renderer, scene) {
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    new RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load("../assets/bg3.hdr", (texture) => {

        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        pmremGenerator.dispose();
        scene.environment = envMap;
        scene.background = envMap;
        scene.background = new THREE.Color(0xe0e0e0);

      }, undefined, undefined);
  }

  // Directional light
  function setUpDirectionalLight(scene) {
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 5, 0);
    light.target.position.set(-5, 0, 20);

    scene.add(light);
    scene.add(light.target);

    return light;
  }

  // Hemisphere light
  function setUpHemisphereLight(scene) {
    const skyColor = 0xFFFFFF;
    const groundColor = 0xB97A20;
    const intensity = 0.7;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);

    scene.add(light);

    return light;
  }

  let renderer = setUpRenderer(),
    scene = setUpScene(),
    camera = setUpCamera(),
    GltfLoader = setUpGltfLoader(),
    orbitControls = setUpOrbitControls(camera);

  if (settingByProjectType[projectType].needDirectionalLight) setUpDirectionalLight(scene);
  if (settingByProjectType[projectType].needHemisphereLight) setUpHemisphereLight(scene);
  
  if (settingByProjectType[projectType].needEnvironment) setUpCubeMapTexture(renderer, scene);;

  return {
    renderer,
    scene,
    camera,
    GltfLoader,
    orbitControls
  }
}