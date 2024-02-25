import * as THREE from 'three';
import { TrackballControls } from '../node_modules/three/examples/jsm/controls/TrackballControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.6, 1200);
camera.position.z = 10; // <- to offset the camera so that we don't get stuck inside

const renderer = new THREE.WebGLRenderer({antialias: true});

// Renderer
renderer.setClearColor("#233143");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Make Canvas Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

// Load texture for box
const sandTexture = new THREE.TextureLoader().load('./texture/sand.jpg');

// Create Box
const boxGeometry = new THREE.BoxGeometry(2, 2, 2);
// Create non-reflective surface
// const boxMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF}); 

// Create sand surface
const sandMaterial = new THREE.MeshStandardMaterial({
    map: sandTexture,
})

const boxMesh = new THREE.Mesh(boxGeometry, 
    sandMaterial);
boxMesh.rotation.set(40, 0, 40);
scene.add(boxMesh);

// Lights
const lights = [];
// Adding lightHelpers as objects to visualize where the lights
// are in space
const lightHelpers = []; 

const lightColours = [
    [0xBF40BF, 8, 12], 
    [0xBE61CF, 6, 12], 
    [0x00FFFF, 3, 10], 
    [0x00FF00, 6, 12], 
    [0x16A7F5, 6, 12], 
    [0x90F615, 6, 12]
];

const lightPositions = [
    [1, 0, 8], 
    [-2, 1, -10], 
    [0, 10, 1], 
    [0, -10, -1], 
    [10, 3, 0], 
    [-10, -1, 0]
];

for (let i=0; i<6; i++) {
    // Loop 6 times to add each light to lights array, using the lightColours and lightPositions arrays to input arguments
    lights[i] = new THREE.PointLight(lightColours[i][0], lightColours[i][1], lightColours[i][2]);
    lights[i].position.set(lightPositions[i][0], lightPositions[i][1], lightPositions[i][2]);
    scene.add(lights[i])

    // Add light helpers for each light
    lightHelpers[i] = new THREE.PointLightHelper(lights[i]);
    scene.add(lightHelpers[i])
};

//Trackball Controls for Camera 
const controls = new TrackballControls(camera, renderer.domElement); 
controls.rotateSpeed = 4;
controls.dynamicDampingFactor = 0.15;

//Rendering
const rendering = function() {
    requestAnimationFrame(rendering);

    // Always update trackball controls to allow for dragging
    controls.update();

    // Constantly rotate box
    scene.rotation.z -= 0.005;
    scene.rotation.x -= 0.002;
    renderer.render(scene, camera);
}
rendering();