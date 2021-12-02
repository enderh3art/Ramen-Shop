import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas

        this.setInstance()
        this.setControls()
        this.setCamAngles()

        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('camera')

            this.positionDebugFolder = this.debugFolder.addFolder('cameraPosition')
            this.positionDebugFolder.add(this.instance.position, 'x').min(-20).max(20).step(0.1)
            this.positionDebugFolder.add(this.instance.position, 'y').min(-20).max(20).step(0.1)
            this.positionDebugFolder.add(this.instance.position, 'z').min(-20).max(20).step(0.1)

            this.targetDebugFolder = this.debugFolder.addFolder('cameraTarget')
            this.targetDebugFolder.add(this.controls.target, 'x').min(-20).max(20).step(0.1)
            this.targetDebugFolder.add(this.controls.target, 'y').min(-20).max(20).step(0.1)
            this.targetDebugFolder.add(this.controls.target, 'z').min(-20).max(20).step(0.1)

            this.debugFolder.add(this.controls, 'enablePan')

            this.cam = false
            this.cameraToggle = {unlockCamera:false}
            this.debugFolder
            .add(this.cameraToggle, 'unlockCamera')
            .onChange(() =>
            {
                this.cam ? this.camAngle.unlocked() : this.camAngle.default()
            })   
        }
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.x = 15.9
        this.instance.position.y = 6.8
        this.instance.position.z = -11.4
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.enablePan = false
        this.controls.rotateSpeed = 1.2
        this.controls.zoomSpeed = 0.8
        this.controls.target.z = -1
    }

    setCamAngles()
    {
        this.camAngle = {}

        this.camAngle.default = () =>
        {
            this.controls.maxDistance = 30
            this.controls.minDistance = 0
            this.controls.minAzimuthAngle = 0
            this.controls.maxAzimuthAngle = Math.PI * 1.999
            this.controls.minPolarAngle = 0
            this.controls.maxPolarAngle = Math.PI
            this.cam = true
        }

        this.camAngle.unlocked = () =>
        {
            this.controls.minDistance = 7
            this.controls.maxDistance = 16
            this.controls.minAzimuthAngle = 0 
            this.controls.maxAzimuthAngle = Math.PI *1.9999
            this.controls.maxPolarAngle = Math.PI * 0.55
            this.cam = false
        }

        this.camAngle.default = () =>
        {
            this.controls.maxDistance = 30
            this.controls.minDistance = 0
            this.controls.minAzimuthAngle = 0
            this.controls.maxAzimuthAngle = Math.PI * 1.999
            this.controls.minPolarAngle = 0
            this.controls.maxPolarAngle = Math.PI
            this.cam = true
        }

        this.camAngle.vendingMachine = () =>
        {
            this.controls.minDistance = 4
            this.controls.maxDistance = 14
            this.controls.minAzimuthAngle = -(Math.PI * 0.2) //left
            this.controls.maxAzimuthAngle = Math.PI * 0.2 //right
            this.controls.minPolarAngle = Math.PI * .3
            this.controls.maxPolarAngle = Math.PI * .53
        }

        this.camAngle.info = () =>
        {
            this.controls.minDistance = 4
            this.controls.maxDistance = 12
            this.controls.minAzimuthAngle = -(Math.PI * 0.2) //left
            this.controls.maxAzimuthAngle = Math.PI * 0.2 //right
            this.controls.minPolarAngle = Math.PI * .3
            this.controls.maxPolarAngle = Math.PI * .65
        }
    
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
    }
}