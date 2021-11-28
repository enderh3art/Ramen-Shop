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
        this.loadingBarElement = document.querySelector('.loading-bar')
        this.startButton = document.querySelector('.btn-1')
        
        this.startButton.style.display = "none"
        
        this.overlay.style.opacity = 1

        // Progress
        this.resources.on('itemLoaded', () =>
        {
            this.progressRatio = (this.resources.loaded + 1)/ this.resources.toLoad
            this.loadingBarElement.style.transform = `scaleX(${this.progressRatio})`
        })

        //Loaded
        this.resources.on('ready', () =>
        {
            window.setTimeout(() =>
            {
                this.loadingBarElement.classList.add('ended')
                this.loadingBarElement.style.transform = ''
            }, 1000)

            window.setTimeout(() =>
            {
                this.readyScreen()
            }, 2500)
        })
    }
    
    readyScreen()
    {
        this.startButton.style.display = "inline"
        this.startButton.addEventListener("click",() => {

            // Remove overlay and button
            this.overlay.classList.add('ended')
            this.startButton = document.querySelector('.btn-1')
            this.startButton.remove()
            window.setTimeout(() =>
            {
                this.overlay.remove()
            }, 2000)

            // Emit Event
            this.trigger('start')
        });
    }
}