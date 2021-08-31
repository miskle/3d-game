/*
 __    __             __   _____
|  \  |  |     |\ |  |  |    |
|__/  |__|     | \|  |__|    |    remove anything or else the script will break.
*/

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// player

const player = {
    x: 0,
    y: 0,
    z: 0
};

// offsets, rotations & positions(for the offsets for the camera it subtracts for easier use)

var camera_offset_x = 0;
var camera_offset_y = 0.5;
var camera_offset_z = 0;

var cam_rot_x = 0;
var cam_rot_y = 0;
var cam_rot_z = 0;

var cam_pos_x = 0;
var cam_pos_y = 1;
var cam_pos_z = 0;

// variables for the keys

var upheld = false
var downheld = false;

// key events

document.addEventListener("keydown", function(event) {
    let key = event.code;
    switch (key) {
        case "ArrowUp":
            upheld = true;
            break;
        case "ArrowDown":
            downheld = true;
            break;
    }
});

document.addEventListener("keyup", function(event) {
    let key = event.code;
    switch (key) {
        case "ArrowUp":
            upheld = false;
            break;
        case "ArrowDown":
            downheld = false;
            break;
    }
});

const controls = new PointerLockControls(camera, renderer.domElement);
controls.lock();

setInterval(function() {
    if (upheld == true) {
        player.z += 0.05
    }
    if (downheld == true) {
        player.z -= 0.05
    }
},10)

function animate() {
	requestAnimationFrame( animate );
    
    cube.position.x = player.x - camera_offset_x;
    cube.position.y = player.y - camera_offset_y;
    cube.position.z = player.z - camera_offset_z;
    camera.rotation.x = cam_rot_x;
    camera.rotation.y = cam_rot_y;
    camera.rotation.z = cam_rot_z;
    camera.position.x = cam_pos_x;
    camera.position.y = cam_pos_y;
    camera.position.z = cam_pos_z;
    
	renderer.render( scene, camera );
}
animate();