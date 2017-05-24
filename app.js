var $ = require('jquery');
var csv = require('csv');
var fs = require('fs');

var table = require('./table.js');

var relativeToAllData = false;

$('#previous').click(function () {
    table.currentDataIndex--;
    table.MakeTable(table.tableData);
    shaderMaterial.uniforms.colors.value = calcColorValues();
    $('#frameNumber').val(table.currentDataIndex);
});

$('#next').click(function () {
    table.currentDataIndex++;
    table.MakeTable(table.tableData);
    shaderMaterial.uniforms.colors.value = calcColorValues();
    $('#frameNumber').val(table.currentDataIndex);
});

$('#frameNumber').on('change',function () {
    var frameNumber = parseInt($('#frameNumber').val());
    console.log(frameNumber);
    table.currentDataIndex = frameNumber;
    table.MakeTable(table.tableData);
    shaderMaterial.uniforms.colors.value = calcColorValues();
});

//File path of data
$(document).ready(function () {
    $("#myFile").on('change', function () {

        //Create table from data
        var parser = csv.parse({}, function (err, data) {
            console.log(data);
            $('#frameControls').show();
            $('#prosthetic').show();
            table.MakeTable(data);
            table.resetChart();

            shaderMaterial.uniforms.colors.value = calcColorValues();
            $('#frameNumber').val(table.currentDataIndex);
        });

        //File path of data
        let filePath = document.getElementById("myFile").files[0].path
        fs.createReadStream(filePath).pipe(parser);
    });
});

var container;
var camera, scene, renderer;
var shaderMaterial;
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
    scene.background = new THREE.Color( 0x202020 );
    scene.add(camera);

    var uniforms = {
    "positions": {
        type: "v3v", value: [
            new THREE.Vector3(0, -1.064, -0.792),
            new THREE.Vector3(-0.792, -1.064, 0),
            new THREE.Vector3(0, -1.064, 0.793),
            new THREE.Vector3(0.793, -1.064, 0),
            new THREE.Vector3(0, 0.164, -0.987),
            new THREE.Vector3(-0.924, 0.16, 0),
            new THREE.Vector3(0, 0.16, 0.924),
            new THREE.Vector3(0.924, 0.16, 0)]
    },
    "colors": {
        type: "v3v", value: [
            new THREE.Vector3(0.9, 0.9, 0.9),
            new THREE.Vector3(0.9, 0.9, 0.9),
            new THREE.Vector3(0.9, 0.9, 0.9),
            new THREE.Vector3(0.9, 0.9, 0.9),
            new THREE.Vector3(0.9, 0.9, 0.9),
            new THREE.Vector3(0.9, 0.9, 0.9),
            new THREE.Vector3(0.9, 0.9, 0.9),
            new THREE.Vector3(0.9, 0.9, 0.9)]
    }
};

    //material

        shaderMaterial = new THREE.ShaderMaterial({
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

function calcColorValues() {

    var highest;
    var lowest;

    if(relativeToAllData === true) {
        
        var data = table.tableData;

        highest = data[0][0];
        lowest = data[0][0];

        for (var i = 0; i < data.length; i++) {
            for (var j = 0; j < data[i].length; j++) {
                
                if (data[i][j] >= highest) {
                    highest = data[i][j];
                }
                else if (data[i][j] <= lowest) {
                    lowest = data[i][j];
                }
            }
        }
    }
    else {
        var data = table.tableData[table.currentDataIndex];

        highest = data[0];
        lowest = data[0];

        for (var i = 0; i < data.length; i++) {
            if (data[i] >= highest) {
                highest = data[i];
            }
            else if (data[i] <= lowest) {
                lowest = data[i];
            }
        }
    }

    console.log(highest, lowest);

    var currentReading = table.tableData[table.currentDataIndex];
    var returnArray = [];

    for (var i = 0; i < currentReading.length; i++) {

        var weighting = (1.0-(currentReading[i] - lowest) / (highest - lowest));

        returnArray.push(new THREE.Vector3(1, weighting, 0));
    }

    console.log(returnArray);

    return returnArray;

}