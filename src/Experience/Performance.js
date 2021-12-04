import * as THREE from 'three'
import Experience from './Experience.js'
import Stats from 'stats.js'

export default class Performance
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.stats = new Stats()
            this.stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
            document.body.appendChild(this.stats.dom)
        }
        
        // Setup 
        this.filterStrength = 5
        this.frameTime = 0
        this.lastLoop = new Date
        this.intervalSet = null
    }

    performanceCheck()
    {

        // Perform checks every 5 seconds
        if(this.intervalSet === null)
        {
            setInterval(() => {
                this.performanceCheck()
            }, 5000);
            this.intervalSet = true
        }

        // Check Performance
        console.log(1000/this.frameTime)
        if (1000/this.frameTime <= 50) 
        {
            // disable bloom
            experience.postProcessing.renderBloom = function dontRenderBloom (){}
            experience.postProcessing.bloomComposer.reset()

            // // change materials
            experience.world.ramenShop.neonPink.material = new THREE.MeshBasicMaterial({color: new THREE.Color('#FFAEEA')})
            experience.world.ramenShop.neonBlue.material = new THREE.MeshBasicMaterial({color: new THREE.Color('#3BCBFF')})
            experience.world.ramenShop.arcadeRim.material = new THREE.MeshBasicMaterial({color: new THREE.Color('#3BCBFF')})
            experience.world.ramenShop.poleLight.material = new THREE.MeshBasicMaterial({color: new THREE.Color('#FCD4FF')})
            experience.world.ramenShop.neonGreen.material = new THREE.MeshBasicMaterial({color: new THREE.Color('#8FFF8F')})    
        }
    }

    update()
    {
        if(this.debug.active)
        {
            this.stats.begin()
            this.stats.end()
        }

        this.thisFrameTime = (this.thisLoop=new Date) - this.lastLoop;
        this.frameTime+= (this.thisFrameTime - this.frameTime) / this.filterStrength;
        this.lastLoop = this.thisLoop;
    }
}