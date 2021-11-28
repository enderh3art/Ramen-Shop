import * as THREE from 'three'
import Experience from './Experience.js'

export default class PreLoader
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.overlay = document.querySelector('.overlay')
        this.loadingBarElement = document.querySelector('.loading-bar')

        // this.overlay.style.opacity = 1

        // Progress
        this.resources.on('itemLoaded', () =>
        {
            this.progressRatio = (this.resources.loaded + 1)/ this.resources.toLoad
            this.loadingBarElement.style.transform = `scaleX(${this.progressRatio})`
            console.log(this.resources.loaded)

        })

        //Loaded
        this.resources.on('ready', () =>
        {

            window.setTimeout(() =>
            {
                this.loadingBarElement.classList.add('ended')
                this.loadingBarElement.style.transform = ''
                // this.overlay.classList.add('ended')

                this.startButton()
            }, 1000)

            window.setTimeout(() =>
            {
                // this.overlay.remove()
            }, 3000)
            
            

        })
    }
    
    startButton()
    {
        
    }

    startExperience()
    {
        // window.setTimeout(() =>
        // {
        //     this.loadingBarElement.classList.add('ended')
        //     this.loadingBarElement.style.transform = ''
        //     this.overlay.classList.add('ended')
        // }, 1000)

        // window.setTimeout(() =>
        // {
        //     this.overlay.remove()
        // }, 3000)
    }

}