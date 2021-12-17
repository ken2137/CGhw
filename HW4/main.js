import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

import { Candle } from "./Candle.js";

var camera, scene, renderer;
var mouse = new THREE.Vector2();
var raycaster = new THREE.Raycaster();
var pickables = [];
var candles_arr = [];


function init() {
  renderer = new THREE.WebGLRenderer({
   
  });
  renderer.setClearColor('white');
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  scene = new THREE.Scene();
  let cubeMap = loadCubemap("./Yokohama3/");
  scene.background = cubeMap;

  camera = new THREE.PerspectiveCamera(50, window.innerWidth/window.innerHeight,1, 10000);
  camera.position.set(0,100,200);

  let controls = new OrbitControls(camera, renderer.domElement);
  document.body.appendChild(renderer.domElement);

  //////////////////////////////////////////////////////////////////////////////
  
  var floor = scene.add(buildFloor('./texture/', 'road.png'));
  
  scene.add(floor);
 
  candles_arr.push(new Candle(0,0,"candle0","body0","flame0"));
  candles_arr.push(new Candle(40,70,"candle1","body1","flame1"));
  candles_arr.push(new Candle(-100,-10,"candle2","body2","flame2"));
  candles_arr.push(new Candle(-60,90,"candle3","body3","flame3"));
  candles_arr.push(new Candle(110,-30,"candle4","body4","flame4"));
  candles_arr.push(new Candle(20,-100,"candle5","body5","flame5"));
  
  for(let i = 0;i<6;i++){
	  pickables.push(candles_arr[i].candle);
  }
	
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('pointerdown', onDocumentMouseDown, false);
}

function loadCubemap(path) {
  var format = '.jpg';
  var files = [
      path + 'px' + format, path + 'nx' + format,
      path + 'py' + format, path + 'ny' + format,
      path + 'pz' + format, path + 'nz' + format
  ];
  var loader = new THREE.CubeTextureLoader();
  var cubeMap = loader.load(files);
  cubeMap.format = THREE.RGBFormat;
  return cubeMap;
}
function buildFloor(path, name) {
            
  let planeMat = new THREE.TextureLoader().load(path + name);
  planeMat.wrapS = THREE.RepeatWrapping;
  planeMat.wrapT = THREE.RepeatWrapping;
  planeMat.repeat.set(15, 15);
  let plane = new THREE.Mesh(new THREE.PlaneGeometry(240, 240, 4, 4),
      new THREE.MeshLambertMaterial({
          side: THREE.DoubleSide, 
          map: planeMat,
          color: 0xF0F0F0,
      }));
  plane.rotation.x -= Math.PI / 2;
  return plane;
}




function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event) {
  event.preventDefault();
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);

   var intersects = raycaster.intersectObjects( pickables, true );
  
  if (intersects.length > 0) {
    if (intersects[0].object.name === "flame0" || intersects[0].object.name === "body0"){
    	candles_arr[0].flameOff();
    } 
    
    else if (intersects[0].object.name === "flame1" || intersects[0].object.name === "body1"){
    	candles_arr[1].flameOff();
    } 
    
  	else if (intersects[0].object.name === "flame2" || intersects[0].object.name === "body2"){
    	candles_arr[2].flameOff();
    } 
    
    else if (intersects[0].object.name === "flame3" || intersects[0].object.name === "body3"){
    	candles_arr[3].flameOff();
    } 
    
    else if (intersects[0].object.name === "flame4" || intersects[0].object.name === "body4"){
    	candles_arr[4].flameOff();
    } 
	else if (intersects[0].object.name === "flame5" || intersects[0].object.name === "body5"){
      candles_arr[5].flameOff();
    } 
  }

}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  
  for(let i = 0;i<6;i++){
      candles_arr[i].candle.lookAt(camera.position.x,0,camera.position.z);
  }
  
}
export {init, animate, scene};