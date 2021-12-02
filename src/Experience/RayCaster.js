import * as THREE from 'three'
import Experience from './Experience.js'

export default class RayCaster
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
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

            // Create sign hitboxes
            this.projectsHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 0.6, 1.7 ),
                new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true} )
            )
            this.projectsHitBox.position.set(-4,0.4,-5)
            this.projectsHitBox.visible = false

            this.jZhouHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 1, 1 ),
                new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } )
            )
            this.jZhouHitBox.position.set(-4,-0.4,-4.72)
            this.jZhouHitBox.visible = false

            this.articlesHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 0.4, 1.5 ),
                new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
            )
            this.articlesHitBox.position.set(-4,-1.2,-5)
            this.articlesHitBox.visible = false

            this.aboutMeHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 0.5, 1.7 ),
                new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } )
            )
            this.aboutMeHitBox.position.set(-4,-1.65,-5.1)
            this.aboutMeHitBox.visible = false

            this.creditsHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 0.4, 1.4 ),
                new THREE.MeshBasicMaterial( { color: 0xffff00, wireframe: true } )
            )
            this.creditsHitBox.position.set(-4,-2.15,-5.03)
            this.creditsHitBox.visible = false

            this.scene.add(this.projectsHitBox, this.jZhouHitBox, this.articlesHitBox,this.aboutMeHitBox, this.creditsHitBox )

            // Debug
            if(this.debug.active)
            {
                this.hitBoxVisibility = {visible:false}
                this.debugFolder = this.debug.ui.addFolder('touchHitBoxes')
                this.debugFolder
                    .add(this.hitBoxVisibility, 'visible')
                    .onChange(() =>
                    {
                        this.projectsHitBox.visible = this.hitBoxVisibility.visible
                        this.jZhouHitBox.visible = this.hitBoxVisibility.visible
                        this.articlesHitBox.visible = this.hitBoxVisibility.visible
                        this.aboutMeHitBox.visible = this.hitBoxVisibility.visible
                        this.creditsHitBox.visible = this.hitBoxVisibility.visible
                    })
                
            }

            // Bottles to test
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
            
            // Objects to test 

            console.log(this.config.touch)
            if(this.config.touch == true)
            {
                this.objectsToTest = [
                    this.projectsHitBox,
                    this.jZhouHitBox,
                    this.articlesHitBox,
                    this.aboutMeHitBox,
                    this.creditsHitBox
                ]
            }
            else 
            {
                this.objectsToTest = [
                    this.ramenShop.projectsRed,this.ramenShop.projectsWhite,
                    this.ramenShop.articlesWhite,this.ramenShop.articlesRed,
                    this.ramenShop.aboutMeBlack,this.ramenShop.aboutMeBlue,
                    this.ramenShop.creditsBlack,this.ramenShop.creditsOrange
                ]
            }

            // Click listener
            window.addEventListener('pointerdown', (event) =>
            {
                this.cursor.x = event.clientX / this.sizes.width * 2 - 1
                this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1
                this.raycaster.setFromCamera(this.cursor, this.camera.instance)

                // Bottle click listener
                this.intersectsBottles = this.raycaster.intersectObjects(this.bottlesToTest)
                if(this.intersectsBottles.length)
                {
                    this.selectedBottle = this.intersectsBottles[ 0 ].object
                    switch(this.selectedBottle)
                    {

                        case this.ramenShop.bottle1:
                            console.log('bottle1')
                            this.openNav()
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

                //Object click listener
                this.intersectsObjects = this.raycaster.intersectObjects(this.objectsToTest)
                if(this.intersectsObjects.length)
                {
                    const selectedModel = this.intersectsObjects[ 0 ].object
        
                    switch(selectedModel)
                    {
                        case this.ramenShop.projectsRed:
                        case this.ramenShop.projectsWhite:
                        case this.projectsHitBox:
                            // controller.buttonIndicator(projectsWhite, 'white')
                            // controller.toProjects()
                            console.log('projects')
                            break
        
                        case this.ramenShop.articlesWhite:
                        case this.ramenShop.articlesRed:
                        case this.articlesHitBox:
                            // controller.buttonIndicator(articlesWhite, 'white')
                            // window.open('https://medium.com/@jesse-zhou', '_blank');
                            console.log('articles')
                            break
        
                        case this.ramenShop.aboutMeBlack:
                        case this.ramenShop.aboutMeBlue:
                        case this.aboutMeHitBox:
                            // controller.buttonIndicator(aboutMeBlack, 'black')
                            // controller.toInfo()
                            console.log('about me')
                            break
        
                        case this.ramenShop.creditsBlack:
                        case this.ramenShop.creditsOrange:
                        case this.creditsHitBox:
                            // controller.buttonIndicator(creditsBlack, 'black')
                            // controller.toCredits()
                            console.log('credits')
                            break
                
                    }
        
                }  

            })
        })


    }

}