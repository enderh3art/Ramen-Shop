import Experience from '../Experience.js'
import Environment from './Environment.js'
import Hologram from './Hologram.js'
import RamenShop from './RamenShop.js'
import Reflections from './Reflections.js'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.ramenShop = new RamenShop()
            this.hologram = new Hologram()
            this.reflections = new Reflections()
        })
    }

    update()
    {
        if(this.hologram) {this.hologram.update()}
    }
}