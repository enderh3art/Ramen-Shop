import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Sounds from './Sounds.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'
import Materials from './World/Materials.js'
import Animations from './World/Animations.js'
import sources from './sources.js'
import PostProcessing from './PostProcessing.js'
import RayCaster from './RayCaster.js'
import Performance from './Performance.js'
import PreLoader from './PreLoader.js'
import Controller from './Controller.js'

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        //config
        this.config = {}
        this.config.touch = false
        window.addEventListener('touchstart', () =>
        {
            this.config.touch = true
        }, { once: true })

        // Setup
        this.debug = new Debug()
        this.scene = new THREE.Scene()
        this.sizes = new Sizes()

        if(this.sizes.width / this.sizes.height > 1) {this.config.vertical = false}
        else {this.config.vertical = true}

        this.time = new Time()
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.sounds = new Sounds()
        this.resources = new Resources(sources)
        this.performance = new Performance()
        this.preLoader = new PreLoader()
        this.world = new World()
        this.materials = new Materials()
        this.animations = new Animations()
        this.postProcessing = new PostProcessing()
        this.controller = new Controller()
        this.rayCaster = new RayCaster()

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
        this.postProcessing.resize()
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.postProcessing.update()
        this.animations.update()
        this.performance.update()
    }

    // destroy()
    // {
    //     this.sizes.off('resize')
    //     this.time.off('tick')

    //     // Traverse the whole scene
    //     this.scene.traverse((child) =>
    //     {
    //         // Test if it's a mesh
    //         if(child instanceof THREE.Mesh)
    //         {
    //             child.geometry.dispose()

    //             // Loop through the material properties
    //             for(const key in child.material)
    //             {
    //                 const value = child.material[key]

    //                 // Test if there is a dispose function
    //                 if(value && typeof value.dispose === 'function')
    //                 {
    //                     value.dispose()
    //                 }
    //             }
    //         }
    //     })

    //     this.camera.controls.dispose()
    //     this.renderer.instance.dispose()

    //     if(this.debug.active)
    //         this.debug.ui.destroy()
    // }
}