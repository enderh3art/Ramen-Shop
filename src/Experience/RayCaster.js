import * as THREE from 'three'
import { GridHelper, Group } from 'three'
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
        this.controller = this.experience.controller
        this.config = this.experience.config
        this.sounds = this.experience.sounds

        // Wait for resources
        this.preLoader.on('start', () =>
        {
            // Setup
            this.config.touch = this.experience.config.touch
            this.ramenShop = this.experience.world.ramenShop
            this.hologram = this.experience.world.hologram
            this.raycaster = new THREE.Raycaster()
            this.cursorDown = new THREE.Vector2()
            this.cursor = new THREE.Vector2()

            // Create sign hitboxes
            this.signHitBoxes = new THREE.Group()
            this.hitBoxMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true} )

            this.projectsHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 0.6, 1.7 ),
                this.hitBoxMaterial
            )
            this.projectsHitBox.position.set(-4,0.4,-5)

            this.jZhouHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 1, 1 ),
                this.hitBoxMaterial
            )
            this.jZhouHitBox.position.set(-4,-0.4,-4.72)
            this.articlesHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 0.45, 1.5 ),
                this.hitBoxMaterial
            )
            this.articlesHitBox.position.set(-4,-1.25,-5)

            this.aboutMeHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 0.43, 1.7 ),
                this.hitBoxMaterial
            )
            this.aboutMeHitBox.position.set(-4,-1.83,-5.1)

            this.creditsHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 0.4, 0.4, 1.4 ),
                this.hitBoxMaterial
            )
            this.creditsHitBox.position.set(-4,-2.3,-5.03)

            this.signHitBoxes.add(this.projectsHitBox, this.jZhouHitBox, this.articlesHitBox,this.aboutMeHitBox, this.creditsHitBox )
            this.signHitBoxes.visible = false
            this.scene.add(this.signHitBoxes)

            // Create Project Hitboxes
            
            this.projectHitBoxes = new THREE.Group()
            this.projectHitBoxGeometry = new THREE.PlaneGeometry( 0.29, 0.435 )

            this.project1 = new THREE.Mesh(
                this.projectHitBoxGeometry,
                this.hitBoxMaterial
            )
            this.project1.position.set(0.72,-0.695,2.88)

            this.project2 = new THREE.Mesh(
                this.projectHitBoxGeometry,
                this.hitBoxMaterial
            )
            this.project2.position.set(0.72 + 0.29,-0.695,2.88)

            this.project3 = new THREE.Mesh(
                this.projectHitBoxGeometry,
                this.hitBoxMaterial
            )
            this.project3.position.set(0.72 + 0.29*2,-0.695,2.88)

            this.project4 = new THREE.Mesh(
                this.projectHitBoxGeometry,
                this.hitBoxMaterial
            )
            this.project4.position.set(0.72 + 0.29*3,-0.695,2.88)

            this.project5 = new THREE.Mesh(
                this.projectHitBoxGeometry,
                this.hitBoxMaterial
            )
            this.project5.position.set(0.72,-1.23,2.87)

            this.project6 = new THREE.Mesh(
                this.projectHitBoxGeometry,
                this.hitBoxMaterial
            )
            this.project6.position.set(0.72 + 0.29,-1.23,2.87)

            this.project7 = new THREE.Mesh(
                this.projectHitBoxGeometry,
                this.hitBoxMaterial
            )
            this.project7.position.set(0.72 + 0.28*2,-1.23,2.87)

            this.project8 = new THREE.Mesh(
                this.projectHitBoxGeometry,
                this.hitBoxMaterial
            )
            this.project8.position.set(0.72 + 0.28*3,-1.23,2.87)

            this.projectNavigateHitBoxGeometry = new THREE.PlaneGeometry( 0.47, 0.27 )

            this.projectBack = new THREE.Mesh(
                this.projectNavigateHitBoxGeometry,
                this.hitBoxMaterial
            )
            this.projectBack.position.set(0.86,-1.66,2.85)

            this.projectEnter = new THREE.Mesh(
                this.projectNavigateHitBoxGeometry,
                this.hitBoxMaterial
            )
            this.projectEnter.position.set(1.415,-1.66,2.85)

            this.projectHitBoxes.add(this.project1, this.project2, this.project3, this.project4, this.project5, this.project6, this.project7, this.project8, this.projectBack, this.projectEnter)
            this.projectHitBoxes.visible = false
            this.scene.add(this.projectHitBoxes)

            // Create aboutMe Hitboxes

            this.aboutMeBoxes = new THREE.Group()

            if(this.config.vertical === true)
            {
                this.aboutMeHitBoxGeometry = new THREE.PlaneGeometry( 0.3, 0.2 )

                this.aboutMeBack = new THREE.Mesh(
                    new THREE.PlaneGeometry( 0.3, 0.2 ),
                    this.hitBoxMaterial
                )
                this.aboutMeBack.position.set(0.12, 4.58, 0.58)

                this.aboutMeScreens = new THREE.Mesh(
                    this.aboutMeHitBoxGeometry,
                    this.hitBoxMaterial
                )
                this.aboutMeScreens.position.set(0.45, 4.58, 0.58)

                this.skills = new THREE.Mesh(
                    this.aboutMeHitBoxGeometry,
                    this.hitBoxMaterial
                )
                this.skills.position.set(0.78, 4.58, 0.58)

                this.experience = new THREE.Mesh(
                    new THREE.PlaneGeometry( 0.45, 0.2 ),
                    this.hitBoxMaterial
                )
                this.experience.position.set(1.15, 4.58, 0.58)

            }
            else
            {
                this.aboutMeHitBoxGeometry = new THREE.PlaneGeometry( 0.4, 0.4 )

                this.aboutMeBack = new THREE.Mesh(
                    new THREE.PlaneGeometry( 0.7, 0.2 ),
                    this.hitBoxMaterial
                )
                this.aboutMeBack.position.set(-0.5, 4.58, 0.58)

                this.aboutMeScreens = new THREE.Mesh(
                    this.aboutMeHitBoxGeometry,
                    this.hitBoxMaterial
                )
                this.aboutMeScreens.position.set(2, 4.4, 0.58)
                this.aboutMeScreens.rotation.z = Math.PI / 2

                this.skills = new THREE.Mesh(
                    this.aboutMeHitBoxGeometry,
                    this.hitBoxMaterial
                )
                this.skills.position.set(2, 4, 0.58)
                this.skills.rotation.z = Math.PI / 2

                this.experience = new THREE.Mesh(
                    new THREE.PlaneGeometry( 0.6, 0.4 ),
                    this.hitBoxMaterial
                )
                this.experience.position.set(2, 3.5, 0.58)
                this.experience.rotation.z = Math.PI / 2
            }
            
            this.aboutMeBoxes.add(this.aboutMeBack, this.aboutMeScreens, this.skills, this.experience)
            this.aboutMeBoxes.visible = false

            this.scene.add(this.aboutMeBoxes)

            // Create social Hitboxes

            this.socials = new THREE.Group()

            this.socialButtonGeometry = new THREE.PlaneGeometry( 0.13, 0.13 )

            this.twitterSocialButton = new THREE.Mesh(
                this.socialButtonGeometry,
                this.hitBoxMaterial
            )
            this.twitterSocialButton.position.set(-0.27, 3.05, 0.58)

            this.linkedInSocialButton = new THREE.Mesh(
                this.socialButtonGeometry,
                this.hitBoxMaterial
            )
            this.linkedInSocialButton.position.set(-0.131, 3.05, 0.58)

            this.gitHubSocialButton = new THREE.Mesh(
                this.socialButtonGeometry,
                this.hitBoxMaterial
            )
            this.gitHubSocialButton.position.set(-0.01, 3.05, 0.58)

            this.mediumSocialButton = new THREE.Mesh(
                this.socialButtonGeometry,
                this.hitBoxMaterial
            )
            this.mediumSocialButton.position.set(0.115, 3.05, 0.58)

            this.mailSocialButton = new THREE.Mesh(
                this.socialButtonGeometry,
                this.hitBoxMaterial
            )
            this.mailSocialButton.position.set(0.245, 3.05, 0.58)

            this.socials.add(this.twitterSocialButton, this.linkedInSocialButton, this.gitHubSocialButton, this.mediumSocialButton, this.mailSocialButton)

            if(this.config.vertical === true)
            {
                this.socials.translateX(0.36)
            }

            this.socials.visible = false
            this.scene.add(this.socials)

            // Create hologram hitbox

            this.hologramHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 2, 2, 2 ),
                this.hitBoxMaterial
            )
            this.hologramHitBox.position.set(0,4,-1)
            this.hologramHitBox.visible = false

            this.scene.add(this.hologramHitBox)

            // Create large object hitboxes

            this.vendingMachineHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 1.6, 3.1, 1.6 ),
                this.hitBoxMaterial
            )
            this.vendingMachineHitBox.position.set(1.15,-1.1,2.1)
            this.vendingMachineHitBox.visible = false

            this.arcadeMachineHitBox = new THREE.Mesh(
                new THREE.BoxGeometry( 1.3, 2.9, 1.8 ),
                this.hitBoxMaterial
            )
            this.arcadeMachineHitBox.position.set(-0.58,-1.5,2.25)
            this.arcadeMachineHitBox.visible = false

            this.scene.add(this.vendingMachineHitBox, this.arcadeMachineHitBox)


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
                        this.project1.visible = this.hitBoxVisibility.visible
                        this.project2.visible = this.hitBoxVisibility.visible
                        this.project3.visible = this.hitBoxVisibility.visible
                        this.project4.visible = this.hitBoxVisibility.visible
                        this.project5.visible = this.hitBoxVisibility.visible
                        this.project6.visible = this.hitBoxVisibility.visible
                        this.project7.visible = this.hitBoxVisibility.visible
                        this.project8.visible = this.hitBoxVisibility.visible
                        this.projectBack.visible = this.hitBoxVisibility.visible
                        this.projectEnter.visible = this.hitBoxVisibility.visible
                    })
                
            }

            // Objects to test

            this.objectsToTest = [
                //menu
                this.ramenShop.projectsRed,this.ramenShop.projectsWhite,
                this.ramenShop.jZhouBlack, this.ramenShop.jZhouPink,
                this.ramenShop.articlesWhite,this.ramenShop.articlesRed,
                this.ramenShop.aboutMeBlack,this.ramenShop.aboutMeBlue,
                this.ramenShop.creditsBlack,this.ramenShop.creditsOrange,

                //projects
                this.project1, 
                this.project2, 
                this.project3, 
                this.project4, 
                this.project5, 
                this.project6, 
                this.project7, 
                this.project8,
                this.projectBack,
                this.projectEnter,

                //aboutMeScreen
                this.aboutMeBack, 
                this.aboutMeScreens, 
                this.skills, 
                this.experience,

                // arcadeScreen
                this.ramenShop.arcadeScreen,

                // Models
                this.ramenShop.ramenShop,
                this.ramenShop.machines,
                this.ramenShop.floor,
                this.ramenShop.misc,
                this.ramenShop.graphics,
                this.ramenShop.jesseZhouJoined,

                //hologram
                this.hologramHitBox,

                //TV screens
                this.ramenShop.bigScreen,
                this.ramenShop.littleTVScreen,
                this.ramenShop.tallScreen,
                this.ramenShop.tvScreen,
                
                this.ramenShop.smallScreen1,
                this.ramenShop.smallScreen2,
                this.ramenShop.smallScreen3,
                this.ramenShop.smallScreen4,
                this.ramenShop.smallScreen5,

                // socials
                this.twitterSocialButton,
                this.linkedInSocialButton,
                this.gitHubSocialButton,
                this.mediumSocialButton,
                this.mailSocialButton
            ]

            // touch objects
            if(this.config.touch == true)
            {
                this.objectsToTest.push(
                    this.projectsHitBox,
                    this.jZhouHitBox,
                    this.articlesHitBox,
                    this.aboutMeHitBox,
                    this.creditsHitBox)
            }
            else 
            {
                this.objectsToTest.push(
                    this.ramenShop.projectsRed,this.ramenShop.projectsWhite,
                    this.ramenShop.jZhouBlack, this.ramenShop.jZhouPink,
                    this.ramenShop.articlesWhite,this.ramenShop.articlesRed,
                    this.ramenShop.aboutMeBlack,this.ramenShop.aboutMeBlue,
                    this.ramenShop.creditsBlack,this.ramenShop.creditsOrange,
                )
            }

            // add the machines

            this.machinesToTest = [this.vendingMachineHitBox, this.arcadeMachineHitBox, this.ramenShop.bigScreen,

                //obstructors
                this.ramenShop.ramenShop,
                this.ramenShop.machines,
                this.ramenShop.floor,
                this.ramenShop.misc,
                this.ramenShop.bigScreen,
                this.ramenShop.littleTVScreen,
                this.ramenShop.tallScreen,
                this.ramenShop.tvScreen,
                
                this.ramenShop.smallScreen1,
                this.ramenShop.smallScreen2,
                this.ramenShop.smallScreen3,
                this.ramenShop.smallScreen4,
                this.ramenShop.smallScreen5,
            ]

            this.touchedPoints = []

            window.addEventListener('pointerdown', (event) =>
            {
                this.touchedPoints.push(event.pointerId)

                this.cursorXMin = Math.abs((event.clientX / this.sizes.width * 2 - 1)*0.9)
                this.cursorXMax = Math.abs((event.clientX / this.sizes.width * 2 - 1)*1.1)

                this.cursorYMin = Math.abs((event.clientY / this.sizes.height * 2 - 1)*0.9)
                this.cursorYMax = Math.abs((event.clientY / this.sizes.height * 2 - 1)*1.1)

            })

            // Click listener
            window.addEventListener('pointerup', (event) =>
            {
                this.cursor.x = event.clientX / this.sizes.width * 2 - 1
                this.cursor.y = - (event.clientY / this.sizes.height) * 2 + 1

                this.absX = Math.abs(this.cursor.x)
                this.absY = Math.abs(this.cursor.y)

                if(this.touchedPoints.length === 1 && 
                this.absX > this.cursorXMin && this.absX < this.cursorXMax &&
                this.absY > this.cursorYMin && this.absY < this.cursorYMax) 

                {
                this.click(this.cursor)

                this.touchedPoints = []
                }
                else
                {this.touchedPoints = []}
            })
        })
    }

    click(cursor)
    {
        this.raycaster.setFromCamera(cursor, this.camera.instance)
        
        //Object click listener
        this.intersectsObjects = this.raycaster.intersectObjects(this.objectsToTest)
        if(this.intersectsObjects.length)
        {
            this.selectedModel = this.intersectsObjects[ 0 ].object

            switch(this.selectedModel)
            {
                // Menu
                case this.ramenShop.projectsRed:
                case this.ramenShop.projectsWhite:
                case this.projectsHitBox:
                    this.controller.menuControls.projects(this.ramenShop.projectsWhite, 'white')
                    break

                case this.ramenShop.jZhouBlack:
                case this.ramenShop.jZhouPink:
                case this.jZhouHitBox:
                    this.controller.menuControls.jZhou(this.ramenShop.jZhouBlack, 'black')
                    break

                case this.ramenShop.articlesWhite:
                case this.ramenShop.articlesRed:
                case this.articlesHitBox:
                    this.controller.menuControls.articles(this.ramenShop.articlesWhite, 'white')
                    break

                case this.ramenShop.aboutMeBlack:
                case this.ramenShop.aboutMeBlue:
                case this.aboutMeHitBox:
                    this.controller.menuControls.aboutMe(this.ramenShop.aboutMeBlack, 'black')
                    break

                case this.ramenShop.creditsBlack:
                case this.ramenShop.creditsOrange:
                case this.creditsHitBox:
                    this.controller.menuControls.credits(this.ramenShop.creditsBlack, 'black')
                    break

                //projects

                case this.project1:
                    this.controller.projectControls.project1()
                    break
                
                case this.project2:
                    this.controller.projectControls.project2()
                    break

                case this.project3:
                    this.controller.projectControls.project3()
                    break
                
                case this.project4:
                    this.controller.projectControls.project4()
                    break

                case this.project5:
                    this.controller.projectControls.project5()
                    break

                case this.project6:
                    this.controller.projectControls.project6()
                    break

                case this.project7:
                    this.controller.projectControls.project7()
                    break
                
                case this.project8:
                    this.controller.projectControls.project8()
                    break

                case this.projectBack:
                    this.controller.projectControls.projectBack()
                    break
                
                case this.projectEnter:
                    this.controller.projectControls.projectEnter()
                    break

                //aboutMe Menu
                case this.aboutMeBack:
                    this.controller.aboutMeControls.aboutMeBack()
                    break
                case this.aboutMeScreens:
                    this.controller.aboutMeControls.aboutMeScreens()
                    break
                case this.skills:
                    this.controller.aboutMeControls.aboutMeSkills()
                    break
                case this.experience:
                    this.controller.aboutMeControls.aboutMeExperience()
                    break
        
                //screens
                case this.ramenShop.arcadeScreen:
                    this.controller.screenControls.arcadeScreen()
                    break

                case this.hologramHitBox:
                    this.hologram.breakHologram()
                    break

                case this.ramenShop.littleTVScreen:
                    this.controller.videoControls.littleTVScreen()
                    break

                case this.ramenShop.tallScreen:
                    this.controller.videoControls.tallScreen()
                    break

                case this.ramenShop.tvScreen:
                    this.controller.videoControls.tvScreen()
                    break
                                    
                case this.ramenShop.smallScreen1:
                    this.controller.videoControls.smallScreen1()
                    this.sounds.playBloop()
                    break

                case this.ramenShop.smallScreen2:
                    this.controller.videoControls.smallScreen2()
                    this.sounds.playBloop()
                    break

                case this.ramenShop.smallScreen3:
                    this.controller.videoControls.smallScreen3()
                    break

                case this.ramenShop.smallScreen4:
                    this.controller.videoControls.smallScreen4()
                    break

                case this.ramenShop.smallScreen5:
                    this.controller.videoControls.smallScreen5()
                    break

                // Socials
                case this.twitterSocialButton:
                    this.controller.socialControls.twitter()
                    break

                case this.linkedInSocialButton:
                    this.controller.socialControls.linkedIn()
                    break
                
                case this.gitHubSocialButton:
                    this.controller.socialControls.gitHub()
                    break

                case this.mediumSocialButton:
                    this.controller.socialControls.medium()
                    break
                
                case this.mailSocialButton:
                    this.controller.socialControls.mail()
                    break
            }

        } 
        
        //Object click listener
        this.intersectsMachines= this.raycaster.intersectObjects(this.machinesToTest)
        if(this.intersectsMachines.length)
        {
            this.selectedMachine = this.intersectsMachines[ 0 ].object

            switch(this.selectedMachine)
            {
                // Menu
                case this.vendingMachineHitBox:
                    this.controller.menuControls.projects(this.ramenShop.projectsWhite, 'white')
                    break

                case this.arcadeMachineHitBox:
                    this.controller.menuControls.credits(this.ramenShop.creditsBlack, 'black')
                    break

                case this.ramenShop.bigScreen:
                    this.controller.menuControls.aboutMe(this.ramenShop.aboutMeBlack, 'black')
                    break
            }
        }
    }
}