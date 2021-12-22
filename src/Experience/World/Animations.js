import Experience from '../Experience.js'
import RamenShop from './RamenShop.js'

export default class Animations
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.loaded = 0

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.ramenShop = new RamenShop()
            this.loaded = 1
        })
    }

    update()
    {
        if(this.loaded === 1) {this.ramenShop.fan1.rotation.y = -this.time.elapsed * 3 * 0.001}
        if(this.loaded === 1) {this.ramenShop.fan2.rotation.y = -this.time.elapsed * 3 * 0.001}
        if(this.loaded === 1) {this.ramenShop.dish.rotation.y = Math.sin(this.time.elapsed * 0.5 * 0.001) *.4 - Math.PI *.2}
    }
}