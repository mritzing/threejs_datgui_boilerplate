import * as THREE from 'three';
import * as dat from 'dat.gui';
const OrbitControls = require('three-orbit-controls')(THREE);
var camera, scene, renderer;
var geometry, material;
var cubes = [];
var controls;
var cubeSettings

function init() {
    //Setup scene
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000 );

    //Create cube
    geometry = new THREE.BoxGeometry(1,1,1);
    material = new THREE.MeshNormalMaterial();


    // add lights
    const ambientLight = new THREE.AmbientLight( 0x404040 );
    scene.add( ambientLight );

    //Create webGL renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    controls = new OrbitControls(camera,renderer.domElement);

    camera.position.set( 10, 10, 10 );
    controls.update();

    //Add canvas to DOM
    document.body.appendChild( renderer.domElement );


    //gui init
    const gui = new dat.GUI();
    cubeSettings = new itemSettings();
    gui.add(cubeSettings, 'number', 0, 20,1);
    gui.add(cubeSettings, 'build');
}

var itemSettings = function() {
    this.number = 2;
    this.build = function() {
        //clear function
        for ( let i = 0, il = cubes.length; i < il; i ++ ) {
            scene.remove( cubes[ i ]);
        }
        //create cube
        for (let i = 0; i < this.number; i++){
            console.log(i);
            let cube_ = new THREE.Mesh(geometry, material);
            cube_.position.set(i, i ,0);
            scene.add(cube_);
            cubes.push(cube_);
        }
        console.log(cubes);
    };
};


function animate() {
    //Wait for this function 
    requestAnimationFrame(animate);

    controls.update();
    //Render the scene with camera
    
    renderer.render(scene, camera);
}

init();
animate();

