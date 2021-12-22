import * as THREE from 'three'
import Experience from './Experience.js'

export default class Controller
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera
        this.resources = this.experience.resources

        this.setLogic()
        this.setBottleControls()
        this.setMenuControls()
        this.setCamControls()

        this.resources.on('ready', () =>
        {
            this.ramenShop = this.experience.world.ramenShop
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

    setBottleControls()
    {
        this.bottleControls = {}
        this.bottleControls.bottle1 = async () =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'projects')
            {
                this.logic.mode = 'menu'
                this.camControls.toDefault()
                console.log('back')
            }
        }
        this.bottleControls.bottle2 = async () =>
        {
            console.log('bottle2')
        }
        this.bottleControls.bottle3 = async () =>
        {
            console.log('bottle3')
        }
        this.bottleControls.bottle4 = async () =>
        {
            console.log('bottle4')
        }
        this.bottleControls.bottle5 = async () =>
        {
            console.log('bottle5')
        }
        this.bottleControls.bottle6 = async () =>
        {
            console.log('bottle6')
        }
        this.bottleControls.bottle7 = async () =>
        {
            console.log('bottle7')
        }
        this.bottleControls.bottle8 = async () =>
        {
            console.log('bottle8')
        }
        this.bottleControls.bottle9 = async () =>
        {
            console.log('bottle9')
        }
        this.bottleControls.bottle10 = async () =>
        {
            console.log('bottle10')
        }
    }

    setMenuControls()
    {
        this.menuControls = {}
        this.menuControls.projects = async (obj, color) =>
        {
            if(this.logic.buttonsLocked === false && this.logic.mode === 'menu')
            {
                this.logic.mode = 'projects'
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