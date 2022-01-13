import * as THREE from 'three'
import Experience from './Experience.js'
import gsap from 'gsap'

export default class Controller
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.resources = this.experience.resources

        this.setLogic()
        this.setProjectControls()
        this.setMenuControls()
        this.setCamControls()

        this.resources.on('ready', () =>
        {
            this.ramenShop = this.experience.world.ramenShop
            this.materials = this.experience.materials
        })
    }

    setLogic()
    {
        this.logic = {}
        this.logic.buttonsLocked = false
        this.logic.mode = 'menu'

        this.logic.lockButtons = async (lockDuration) =>
        {
            this.logic.buttonsLocked = true
            await this.sleep(lockDuration)
            this.logic.buttonsLocked = false
        }
    }

    // https://jsfiddle.net/prisoner849/dns0xhkz/
    setProjectControls()
    {
        this.projectControls = {}
        this.projectControls.project1 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects1'
                this.ramenShop.vendingMachineScreen.material = this.materials.project1Material
            }
            console.log('project1')
        }
        this.projectControls.project2 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects2'
                this.ramenShop.vendingMachineScreen.material = this.materials.project2Material
            }
            console.log('project2')
        }
        this.projectControls.project3 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects3'
                this.ramenShop.vendingMachineScreen.material = this.materials.project3Material
            }
            console.log('project3')
        }
        this.projectControls.project4 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects4'
                this.ramenShop.vendingMachineScreen.material = this.materials.project4Material
            }
            console.log('project4')
        }
        this.projectControls.project5 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects5'
                this.ramenShop.vendingMachineScreen.material = this.materials.project5Material
            }
            console.log('project5')
        }
        this.projectControls.project6 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects6'
                this.ramenShop.vendingMachineScreen.material = this.materials.project6Material
            }
            console.log('project6')
        }
        this.projectControls.project7 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects7'
                this.ramenShop.vendingMachineScreen.material = this.materials.project7Material
            }
            console.log('project7')
        }
        this.projectControls.project8 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects0')
            {
                this.logic.mode = 'projects8'
                this.ramenShop.vendingMachineScreen.material = this.materials.project8Material
            }
            console.log('project8')
        }

        // Go back
        this.projectControls.projectBack = async () =>
        {
            if(this.logic.buttonsLocked === false && (this.logic.mode === 'projects0'))
            {
                this.logic.mode = 'menu'
                this.camControls.toDefault()
            }

            if(this.logic.buttonsLocked === false && (this.logic.mode === 'projects1' || this.logic.mode === 'projects2' || this.logic.mode === 'projects3'|| this.logic.mode === 'projects4'|| this.logic.mode === 'projects5'|| this.logic.mode === 'projects6'|| this.logic.mode === 'projects7'|| this.logic.mode === 'projects8'))
            {
                this.logic.mode = 'projects0'
                this.ramenShop.vendingMachineScreen.material = this.materials.vendingMachineScreenMaterial
            }
            console.log('projectBack')
        }

        // Enter
        this.projectControls.projectEnter = async () =>
        {
            console.log('projectEnter')
        }
    }

    setMenuControls()
    {
        this.menuControls = {}
        this.menuControls.projects = async (obj, color) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.logic.mode = 'projects0'
                this.menuControls.buttonIndicator(obj, color)
                this.camControls.toProjects()
            }
 
        }
        this.menuControls.jZhou = async (obj, color) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.logic.lockButtons(1500)
                this.menuControls.buttonIndicator(obj, color)
                this.camera.transitions.jZhou(1.5)
            }
        }
        this.menuControls.articles = async (obj, color) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.menuControls.buttonIndicator(obj, color)
                await this.sleep(250)
                window.open('https://medium.com/@jesse-zhou', '_blank');
            }
        }
        this.menuControls.aboutMe = async (obj, color) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.menuControls.buttonIndicator(obj, color)
                console.log('aboutMe')
            }
        }
        this.menuControls.credits = async (obj, color) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.menuControls.buttonIndicator(obj, color)
                console.log('credits')
            }
        }

        this.menuControls.buttonIndicator = async (obj, color) =>
        {
            if (color === 'black') {
                obj.material = this.ramenShop.materials.whiteSignMaterial
                await this.sleep(200)
                obj.material = this.ramenShop.materials.blackSignMaterial
            }
            if (color === 'white') {
                obj.material = this.ramenShop.materials.blackSignMaterial
                await this.sleep(200)
                obj.material = this.ramenShop.materials.whiteSignMaterial
            }
        }
    }

    setCamControls()
    {
        this.camControls = {}
        this.camControls.toProjects = async () =>
        {
            this.logic.lockButtons(1500)
            this.camera.camAngle.unlocked()
            this.camera.transitions.vendingMachine(1.5)
            await this.sleep(1500)
            this.camera.camAngle.vendingMachine()
        }
        this.camControls.toDefault = async () =>
        {
            this.camera.camAngle.unlocked()
            this.camera.transitions.default(1.5)
            await this.sleep(1500)
            this.camera.camAngle.default()
        }
    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}