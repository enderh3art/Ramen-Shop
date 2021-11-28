import * as THREE from 'three'
import Experience from './Experience.js'

export default class RayCaster
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.camera = this.experience.camera
        this.sizes = this.experience.sizes
        this.performance = this.experience.performance 
        this.preLoader = this.experience.preLoader

        // Wait for resources
        this.preLoader.on('start', () =>
        {
            // Setup
            this.config = {}
            this.config.touch = this.experience.config.touch
            this.ramenShop = this.experience.world.ramenShop
            this.raycaster = new THREE.Raycaster()
            this.cursor = new THREE.Vector2()

            console.log(this.config.touch)

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
            
            this.objectsToTest = [
                this.ramenShop.floor,
                this.ramenShop.ramenShop
            ]

            // Sign Hit Boxes
            this.projectsHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 0.6, 1.7 ),
                new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true} )
            )
            this.projectsHitBox.position.set(-4,0.4,-5)

            this.jZhouHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 1, 1 ),
                new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } )
            )
            this.jZhouHitBox.position.set(-4,-0.4,-4.72)

            this.articlesHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 0.4, 1.5 ),
                new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
            )
            this.articlesHitBox.position.set(-4,-1.2,-5)

            this.aboutMeHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 0.5, 1.7 ),
                new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } )
            )
            this.aboutMeHitBox.position.set(-4,-1.65,-5.1)

            this.creditsHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 0.4, 1.4 ),
                new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
            )
            this.creditsHitBox.position.set(-4,-2.15,-5.03)

            this.scene.add(this.projectsHitBox, this.jZhouHitBox, this.articlesHitBox,this.aboutMeHitBox, this.creditsHitBox )

            // Listener
            window.addEventListener('pointerdown', (event) =>
            {
                this.cursor.x = event.clientX / this.sizes.width * 2 - 1
                this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1
                this.raycaster.setFromCamera(this.cursor, this.camera.instance)

                this.intersectsBottles = this.raycaster.intersectObjects(this.bottlesToTest)
                if(this.intersectsBottles.length)
                {
                    this.selectedBottle = this.intersectsBottles[ 0 ].object
                    switch(this.selectedBottle)
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

                this.intersectsObjects = this.raycaster.intersectObjects(this.objectsToTest)
                if(this.intersectsObjects.length)
                {
                    const selectedModel = this.intersectsObjects[ 0 ].object
        
                    switch(selectedModel)
                    {
                        case this.ramenShop.floor:
                            console.log('floor')
                            break 
                        // case projectsRed:
                        // case projectsWhite:
                        //     controller.buttonIndicator(projectsWhite, 'white')
                        //     controller.toProjects()
                        //     break
        
                        // case articlesWhite:
                        // case articlesRed:
                        //     controller.buttonIndicator(articlesWhite, 'white')
                            
                        //     window.open('https://medium.com/@jesse-zhou', '_blank');
                        //     break
        
                        // case aboutMeBlack:
                        // case aboutMeBlue:
                        //     controller.buttonIndicator(aboutMeBlack, 'black')
                        //     controller.toInfo()
                        //     break
        
                        // case creditsBlack:
                        // case creditsOrange:
                        //     controller.buttonIndicator(creditsBlack, 'black')
                        //     controller.toCredits()
                        //     break
                
                    }
        
                }  

            })
        })


    }
}