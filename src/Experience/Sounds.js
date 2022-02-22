import Experience from './Experience.js'
import { Howl, Howler } from 'howler'

import arcade from '../../static/sounds/arcade.mp3'
import bloop from '../../static/sounds/bloop.mp3'
import click from '../../static/sounds/click.mp3'
import ding from '../../static/sounds/ding.mp3'
import music from '../../static/sounds/music.mp3'
import whoosh from '../../static/sounds/whoosh.mp3'

export default class Sounds
{
    constructor()
    {
        this.experience = new Experience()

        this.arcade = new Howl({
            src: [arcade],
            volume: 0.15
        });

        this.bloop = new Howl({
            src: [bloop],
            volume: 0.3
        });

        this.click = new Howl({
            src: [click],
            volume: 0.3
        });

        this.ding = new Howl({
            src: [ding],
            volume: 0.14
        });

        this.music = new Howl({
            src: [music],
            loop: true,
            volume: 0.35
        });
        
        this.whoosh = new Howl({
            src: [whoosh],
            volume: 0.6
        });



    }

    playArcade() {
        this.arcade.play()
    }

    playBloop() {
        this.bloop.play()
    }

    playClick() {
        this.click.play()
    }

    playDing() {
        this.ding.play()
    }

    playMusic() {
        this.music.play()
    }

    playWhoosh() {
        this.whoosh.play()
    }



}
