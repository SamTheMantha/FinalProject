var $ = require('jquery');
var csv = require('csv');
var fs = require('fs');

var tableData;
var currentDataIndex = 0;

//Make the table
function MakeTable(data){

    tableData = data;

    //Give the columns headers
    var html = `<table>
                    <tr>
                        <th>Load position</th>
                        <th>Magnitude</th>
                    </tr>
                    <tbody>`;
    
    // create rows with column 1 being number
    if(currentDataIndex > tableData.length) {
        currentDataIndex = tableData.length;
    }

    if(tableData[currentDataIndex] != null) {

        for (var j = 0; j < data[currentDataIndex].length; ++j ) {
            html += '<tr>';

            html += '<td>' + parseInt(j+1) + '</td>';
            html += '<td>' + data[currentDataIndex][j] + '</td>';
            
            html += "</tr>";
        }
    }

    html += '</body></table>';

    //Send this data to table
    $(html).appendTo($('#Table').empty());
};   


//File path of data
$(document).ready(function(){
    $("#myFile").on('change',function(){

        //Create table from data
        var parser = csv.parse({}, function(err, data) {
            console.log(data);
            MakeTable(data);
        });

        //File path of data
        let filePath = document.getElementById("myFile").files[0].path
        fs.createReadStream(filePath).pipe(parser);
    });
});



var container;
var camera, scene, renderer;
var controls;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 550;

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 1;

    // scene

    scene = new THREE.Scene();
    scene.add( camera );
    var pointLight = new THREE.PointLight( 0xeeeeff );
    camera.add( pointLight );

    // model

    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );
        };
    var onProgress = function ( xhr ) {
        if ( xhr.lengthComputable ) {
            var percentComplete = xhr.loaded / xhr.total * 100;
            console.log( Math.round(percentComplete, 2) + '% downloaded' );
        }
    };
    var onError = function ( xhr ) {
    };
    var loader = new THREE.OBJLoader( manager );
    loader.load( 'assets/model/prosthetic.obj', function ( object ) {
        scene.add( object );
    }, onProgress, onError );
    
    window.addEventListener( 'resize', onWindowResize, false );
}
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );
    controls.update();
    render();
}

function render() {
    camera.lookAt( scene.position );
    renderer.render( scene, camera );
}