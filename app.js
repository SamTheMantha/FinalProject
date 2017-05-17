var $ = require('jquery');
var csv = require('csv');
var fs = require('fs');

var table = require('./table.js');

$('#previous').click(function () {
    table.currentDataIndex--;
    table.MakeTable(table.tableData);
});

$('#next').click(function () {
    table.currentDataIndex++;
    table.MakeTable(table.tableData);
});

//File path of data
$(document).ready(function () {
    $("#myFile").on('change', function () {

        //Create table from data
        var parser = csv.parse({}, function (err, data) {
            console.log(data);
            table.MakeTable(data);
            table.resetChart();
        });

        //File path of data
        let filePath = document.getElementById("myFile").files[0].path
        fs.createReadStream(filePath).pipe(parser);
    });
});

var ctx = document.getElementById("myChart");
var myLineChart = new Chart(ctx, {
    type: 'line'
});

var container;
var camera, scene, renderer;
var controls;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    container = document.getElementById("Canvas");
    camera = new THREE.PerspectiveCamera(45, windowHalfX / window.innerHeight, 1, 2000);
    camera.position.z = 7;

    renderer = new THREE.WebGLRenderer({ canvas: container });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(windowHalfX, window.innerHeight);

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 1;
    controls.enableZoom = false;

    // scene

    scene = new THREE.Scene();
    scene.add(camera);

    var uniforms = {
        "positions": {
            type: "v3v", value: [
                new THREE.Vector3(0, -1.064, -0.792),
                new THREE.Vector3(-0.792, -1.604, 0),
                new THREE.Vector3(0, -1.604, 0.793),
                new THREE.Vector3(0.793, -1.604, 0),
                new THREE.Vector3(0, 0.164, -0.987),
                new THREE.Vector3(-0.924, 0.16, 0),
                new THREE.Vector3(0, 0.16, 0.924),
                new THREE.Vector3(0.924, 0.16, 0)]
        },
        "colors": {
            type: "v3v", value: [
                new THREE.Vector3(1, 0, 0),
                new THREE.Vector3(1, 1, 0),
                new THREE.Vector3(1, 0, 0),
                new THREE.Vector3(1, 1, 0),
                new THREE.Vector3(1, 1, 0),
                new THREE.Vector3(1, 0, 0),
                new THREE.Vector3(1, 1, 0),
                new THREE.Vector3(1, 0, 0)]
        }
    };

    //material

    var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById('vertexshader').textContent,
        fragmentShader: document.getElementById('fragmentshader').textContent
    });

    // model

    var manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        console.log(item, loaded, total);
    };
    var onProgress = function (xhr) {
        if (xhr.lengthComputable) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log(Math.round(percentComplete, 2) + '% downloaded');
        }
    };
    var onError = function (xhr) {
    };
    var loader = new THREE.OBJLoader(manager);
    loader.load('assets/model/prosthetic.obj', function (object) {
        console.log(object);
        object.children[0].material = shaderMaterial;
        scene.add(object);
    }, onProgress, onError);

    window.addEventListener('resize', onWindowResize, false);
}
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = windowHalfX / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(windowHalfX, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    camera.lookAt(scene.position);
    renderer.render(scene, camera);
}