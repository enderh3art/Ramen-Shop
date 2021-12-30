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

        //Set up tick function
        this.update = function update() {}

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.ramenShop = this.experience.world.ramenShop
            this.hologram = this.experience.world.hologram

            // Update Function
            this.enableUpdate()
        })
    }

    enableUpdate()
    {
        this.update = function update() {
            {this.ramenShop.fan1.rotation.y = -this.time.elapsed * 3 * 0.001}
            {this.ramenShop.fan2.rotation.y = -this.time.elapsed * 3 * 0.001}
            {this.ramenShop.dish.rotation.y = Math.sin(this.time.elapsed * 0.5 * 0.001) *.4 - Math.PI *.2}
            {this.hologram.mesh.rotation.y += - 0.25 * this.time.delta * 0.001}
        }
    }
}