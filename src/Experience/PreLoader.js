import * as THREE from 'three'
import Experience from './Experience.js'
import EventEmitter from './Utils/EventEmitter.js'

export default class PreLoader extends EventEmitter
{
    constructor()
    {
        super()

        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.overlay = document.querySelector('.overlay')
        this.cooking = document.querySelector('#cooking')
        this.startButton = document.querySelector('.start')       
        // this.startButton.style.display = 'none'
    

        // Progress
        this.resources.on('itemLoaded', () =>
        {
            this.progressRatio = (this.resources.loaded + 1)/ this.resources.toLoad
            
            document.getElementById("progressPercentage").innerHTML = Math.trunc(this.progressRatio * 100)
        })

        //Loaded
        this.resources.on('ready', () =>
        {

            window.setTimeout(() =>
            {
                this.cooking.classList.add('fade')
            }, 1500)

            window.setTimeout(() =>
            {
                this.readyScreen()
            }, 2500)
        })
    }
    
    readyScreen()
    {
        this.cooking.remove()
        this.startButton.style.display = "inline"
        this.startButton.classList.add('fadeIn')
        this.startButton.addEventListener("click", async () => {

            this.resources.video[Object.keys(this.resources.video)[1]].pause()

            // for ( let i = 0; i < Object.keys(this.resources.video).length; i ++ ) {
            //     this.resources.video[Object.keys(this.resources.video)[i]].play()
            // }

            // Remove overlay and button
            this.overlay.classList.add('fade')
            this.startButton.classList.add('fadeOut')

            window.setTimeout(() =>
            {
                this.startButton.remove()
                this.overlay.remove()
            }, 2000)

            // Trigger start events
            this.controller = this.experience.controller
            this.performance = this.experience.performance
            this.controller.camControls.toDefault()

            await this.sleep(500)
            this.performance.performanceCheck()       

            // Emit Event
            this.trigger('start')

        },{ once: true });
    }

    sleep(ms) 
    {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}