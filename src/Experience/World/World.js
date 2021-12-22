import Experience from '../Experience.js'
import Environment from './Environment.js'
import RamenShop from './RamenShop.js'

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
            // this.environment = new Environment()
        })
    }

    update()
    {
    }
}