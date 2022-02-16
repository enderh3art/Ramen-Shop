import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.config = this.experience.config

        if(this.config.vertical === true)
        {
        this.aboutMeDistance = 2.6
        this.projectsDistance = 4.6
        }
        else
        {
        this.aboutMeDistance = 2.2
        this.projectsDistance = 4.2
        }



        this.setInstance()
        this.setControls()
        this.setCamAngles()
        this.setTransitions()

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
                this.cam ? this.camAngle.default() : this.camAngle.unlocked()
            })   
        }
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.4, 50)
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
        this.controls.enableRotate = false
        this.controls.enableZoom = false
    }

    setCamAngles()
    {
        this.camAngle = {}

        this.camAngle.unlocked = () =>
        {
            this.controls.maxDistance = 30
            this.controls.minDistance = 0
            this.controls.minAzimuthAngle = 0
            this.controls.maxAzimuthAngle = Math.PI * 1.999
            this.controls.minPolarAngle = 0
            this.controls.maxPolarAngle = Math.PI
            this.cam = true
        }

        this.camAngle.default = () =>
        {
            this.controls.minDistance = 7
            this.controls.maxDistance = 16
            this.controls.minAzimuthAngle = 0 
            this.controls.maxAzimuthAngle = Math.PI *1.9999
            this.controls.minPolarAngle = Math.PI *0.2
            this.controls.maxPolarAngle = Math.PI * 0.55
            this.cam = false
        }

        this.camAngle.vendingMachine = () =>
        {
            this.controls.minDistance = 2
            this.controls.maxDistance = 3.5
            this.controls.minAzimuthAngle = -(Math.PI * 0.1) //left
            this.controls.maxAzimuthAngle = Math.PI * 0.1 //right
            this.controls.minPolarAngle = Math.PI * .4
            this.controls.maxPolarAngle = Math.PI * .53
        }

        this.camAngle.aboutMe = () =>
        {
            this.controls.minDistance = 1
            this.controls.maxDistance = this.aboutMeDistance
            this.controls.minAzimuthAngle = -(Math.PI * 0.2) //left
            this.controls.maxAzimuthAngle = Math.PI * 0.2 //right
            this.controls.minPolarAngle = Math.PI * .3
            this.controls.maxPolarAngle = Math.PI * .65
        }

        this.camAngle.credits = () =>
        {
            this.controls.minDistance = 1.5
            this.controls.maxDistance = 2.5
            this.controls.minAzimuthAngle = -(Math.PI * 0.2) //left
            this.controls.maxAzimuthAngle = Math.PI * 0.2 //right
            this.controls.minPolarAngle = Math.PI * .3
            this.controls.maxPolarAngle = Math.PI * .65
        }
    
    }

    setTransitions()
    {
        this.transitions = {}

        this.transitions.vendingMachine = async (duration) =>
        {
            this.controls.enableRotate = false
            this.controls.enableZoom = false

            gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
            x: 1.15,
            y:-1.2,
            z:this.projectsDistance})
            gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
            x: 1.15,
            y:-1.2,
            z:1.7})

            await this.sleep(1500)
            // this.controls.enableRotate = true
            this.controls.enableZoom = true
        }

        this.transitions.default = async (duration) =>
        {
            this.controls.enableRotate = false
            this.controls.enableZoom = false

            gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
            x: -11.1,
            y: -1,
            z: -7.6})
            
            gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
            x: 0,
            y: 0,
            z: -1})

            await this.sleep(1500)
            this.controls.enableRotate = true
            this.controls.enableZoom = true
        }

        this.transitions.jZhou = async (duration) =>
        {
            this.controls.enableRotate = false
            this.controls.enableZoom = false

            gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
            x: -10.2,
            y: 6.3,
            z: 3.8})

            await this.sleep(1500)
            this.controls.enableRotate = true
            this.controls.enableZoom = true
        }

        this.transitions.aboutMe = async (duration) =>
        {
            this.controls.enableRotate = false
            this.controls.enableZoom = false

            gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
            x: 0.66,
            y: 3.8,
            z: this.aboutMeDistance})
            gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
            x: 0.66,
            y: 3.8,
            z: 0.7})

            await this.sleep(1500)
            // this.controls.enableRotate = true
            this.controls.enableZoom = true
        }

        this.transitions.credits = async (duration) =>
        {
            this.controls.enableRotate = false
            this.controls.enableZoom = false

            gsap.to(this.instance.position, { duration: duration, ease: "power1.inOut",
            x: -0.6,
            y: -1.05,
            z: 3.8})
            gsap.to(this.controls.target, { duration: duration, ease: "power1.inOut",
            x: -0.6,
            y: -1.05,
            z: 2.2})

            await this.sleep(1500)
            // this.controls.enableRotate = true
            this.controls.enableZoom = true
        }
    
    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
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

// test