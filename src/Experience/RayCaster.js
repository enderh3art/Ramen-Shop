import * as THREE from 'three'
import Experience from './Experience.js'

export default class RayCaster
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes
        this.performance = this.experience.performance

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.ramenShop = this.experience.world.ramenShop
            this.raycaster = new THREE.Raycaster()
            this.cursor = new THREE.Vector2()

            // Objects to test
            this.bottlesToTest = 
            [
                this.ramenShop.bottle1, 
                this.ramenShop.bottle2, 
                this.ramenShop.bottle3, 
                this.ramenShop.bottle4, 
                this.ramenShop.bottle5, 
                this.ramenShop.bottle6, 
                this.ramenShop.bottle7, 
                this.ramenShop.bottle8, 
                this.ramenShop.bottle9, 
                this.ramenShop.bottle10
            ]

            // Listener
            window.addEventListener('pointerdown', (event) =>
            {
                this.cursor.x = event.clientX / this.sizes.width * 2 - 1
                this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1
                this.raycaster.setFromCamera(this.cursor, this.camera.instance)

                this.intersectsObjects = this.raycaster.intersectObjects(this.bottlesToTest)
                if(this.intersectsObjects.length)
                {
                    this.selectedObject = this.intersectsObjects[ 0 ].object
                    switch(this.selectedObject)
                    {
                        case this.ramenShop.bottle1:
                            console.log('bottle1')
                            this.performance.performanceCheck()
                            break
                        
                        case this.ramenShop.bottle2:
                            console.log('bottle2')
                            break

                        case this.ramenShop.bottle3:
                            console.log('bottle3')
                            break
                        
                        case this.ramenShop.bottle4:
                            console.log('bottle4')
                            break

                        case this.ramenShop.bottle5:
                            break

                        case this.ramenShop.bottle6:
                            break

                        case this.ramenShop.bottle7:
                            break
                        
                        case this.ramenShop.bottle8:
                            break

                        case this.ramenShop.bottle9:
                            break

                        case this.ramenShop.bottle10:
                            break
                    }
                }

            })
        })


    }
}