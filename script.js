const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111113);

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

const directional = new THREE.DirectionalLight(0xffffff, 1);
directional.position.set(5, 5, 5);
scene.add(directional);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;


const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.2, 1.2),
    new THREE.MeshStandardMaterial({ color: 0x222222 })
);
cube.position.x = -3;
scene.add(cube);

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.8, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0x7a00ff })
);
sphere.position.x = 0;
scene.add(sphere);

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.9, 0.25, 16, 100),
    new THREE.MeshStandardMaterial({ color: 0x5500aa })
);
torus.position.x = 3;
scene.add(torus);

const loader = new THREE.GLTFLoader();

const modelUrl = "https://raw.githubusercontent.com/kuixl/kt3-crown-3d/main/models/crown.glb";

let crown;

loader.load(
    modelUrl,
    function (gltf) {
        crown = gltf.scene;
        crown.scale.set(1.5, 1.5, 1.5);
        crown.position.y = -0.5;
        scene.add(crown);
        console.log("Модель загружена!");
    },
    undefined,
    function (error) {
        console.error("Ошибка загрузки модели:", error);
    }
);


function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    sphere.rotation.y += 0.015;

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;

    if (crown) {
        crown.rotation.y += 0.01;
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
