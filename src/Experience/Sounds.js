import Experience from './Experience.js'
import { Howl, Howler } from 'howler'

import ding from '../../static/sounds/ding.mp3'
import whoosh from '../../static/sounds/whoosh.mp3'

export default class Sounds
{
    constructor()
    {
        this.experience = new Experience()
        
        this.sound = new Howl({
            src: [whoosh],
            volume: 1
        });

        this.ding = new Howl({
            src: [ding],
            volume: 0.08
        });
    }

    playStartSound()
    {

            
        this.sound.play()
        this.ding.play()

    }
}
