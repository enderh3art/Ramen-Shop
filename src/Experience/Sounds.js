import Experience from './Experience.js'
import { Howl, Howler } from 'howler'

import arcade from '../../static/sounds/arcade.mp3'
import bloop from '../../static/sounds/bloop.mp3'
import click from '../../static/sounds/click.mp3'
import ding from '../../static/sounds/ding.mp3'
import cooking from '../../static/sounds/cooking.mp3'
import whoosh from '../../static/sounds/whoosh.mp3'
import hologram from '../../static/sounds/hologram.mp3'

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

        this.cooking = new Howl({
            src: [cooking],
            loop: true,
            volume: 0.05
        });
        
        this.whoosh = new Howl({
            src: [whoosh],
            volume: 0.6
        });

        this.hologram = new Howl({
            src: [hologram],
            volume: 0.2
        });

        this.setMute()
    }

    setMute()
    {
        // Set up
        this.muted = typeof this.debug !== 'undefined'
        Howler.mute(this.muted)

        // M Key
        window.addEventListener('keydown', (_event) =>
        {
            if(_event.key === 'm')
            {
                this.muted = !this.muted
                Howler.mute(this.muted)
            }
        })

        // Tab focus / blur
        document.addEventListener('visibilitychange', () =>
        {
            if(document.hidden)
            {
                Howler.mute(true)
            }
            else
            {
                Howler.mute(this.muted)
            }
        })

        // Debug
        if(this.debug)
        {
            this.debugFolder.add(this, 'muted').listen().onChange(() =>
            {
                Howler.mute(this.muted)
            })
        }
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

    playCooking() {
        this.cooking.play()
    }

    playWhoosh() {
        this.whoosh.play()
    }

    playHologram() {
        this.hologram.play()
    }



}
