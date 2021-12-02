import * as THREE from 'three'
import Experience from './Experience.js'

export default class Controller
{
    constructor()
    {
        this.experience = new Experience()
        this.camera = this.experience.camera

        this.setBottleControls()
        this.setMenuControls()
        this.setCamControls()
    }

    setBottleControls()
    {
        this.bottleControls = {}
        this.bottleControls.bottle1 = async () =>
        {
            console.log('bottle1')
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
        this.menuControls.projects = async () =>
        {
            this.camControls.toProjects()
        }
        this.menuControls.articles = async () =>
        {
            this.camControls.toDefault()
        }
        this.menuControls.aboutMe = async () =>
        {
            console.log('aboutMe')
        }
        this.menuControls.credits = async () =>
        {
            console.log('credits')
        }
    }

    setCamControls()
    {
        this.camControls = {}
        this.camControls.toProjects = async () =>
        {
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