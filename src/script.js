import './style.css';
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';

const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('/textures/texture.jpg')
const height = textureLoader.load('/textures/height.png')
const alpha = textureLoader.load('/textures/alpha.jpg')

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64)
const material = new THREE.MeshStandardMaterial({
    color: 'gray',
    map: texture,
    displacementMap: height,
    displacementScale: 1,
    alphaMap: alpha,
    transparent: true,
    depthTest: false
})

// Mesh
const plane = new THREE.Mesh(geometry, material)
scene.add(plane)
plane.rotation.x = 181
gui.add(plane.rotation, 'x').min(0).max(360)

// Lights

const pointLight = new THREE.PointLight('#7e28ff', 3)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

gui.add(pointLight.position, 'x').min(-20).max(20)
gui.add(pointLight.position, 'y').min(-20).max(20)
gui.add(pointLight.position, 'z').min(-20).max(20)

const lightColor = { color : '#00f'}
gui.addColor(lightColor, 'color').onChange(()=>{
    pointLight.color.set(lightColor.color)
})



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth*0.7,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth*0.5
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = (sizes.width*0.5) / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width*0.5, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 3
scene.add(camera)

gui.add(plane.rotation, 'z').min(0).max(360)
gui.add(plane.rotation, 'y').min(0).max(360)
gui.add(plane.rotation, 'x').min(0).max(360)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
let mouseY = 0

function animateTerrain(ev) {
    mouseY = ev.clientY
}

document.addEventListener('mousemove', animateTerrain)


const clock = new THREE.Clock()

const tick = () =>
{
   
    plane.rotation.z+=0.01
    plane.material.displacementScale = .3 + mouseY*0.002

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    /* sphere.rotation.y = .5 * elapsedTime
    sphere.rotation.y += .05 * (targetY - sphere.rotation.y)
    sphere.rotation.x += .05 * (targetX - sphere.rotation.x)
    sphere.position.z += .005 * (targetY - sphere.rotation.x) */

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


const typed = new Typed('.type', {
    strings: ['Terrains', 'Maps', 'Contours'],
    smartBackspace: true,
    typeSpeed: 100,
    loop: true,
    loopCount: Infinity,
    showCursor: false,
    backDelay: 4000
})