import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Materials
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        this.mapColors()

        // Wait for textures
        this.resources.on('ready', () =>
        {
            this.mapTextures()
        })
    }

    mapColors()
    {
        // non-glowing lights
        this.greenSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#1EFF51')})
        this.redSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FF0033')})
        this.whiteSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FFFFFF')})
        this.blackSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#000000')})
        this.pinkSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FF2FD5')})
        this.blueSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#01DDFF')})
        this.orangeSignMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FF5100')})
        this.redLedMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FF112B')})
        this.greenLedMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#00FF00')})
        this.grayLedOffMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#585858')})
        this.grayLedOnMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FFFFFF')})

        // glowing lights
        this.neonYellowMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FFF668')})
        this.neonPinkMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FF3DCB')})
        this.neonBlueMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#00BBFF')})
        this.poleLightMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#FF5EF1')})
        this.neonGreenMaterial = new THREE.MeshBasicMaterial({color: new THREE.Color('#56FF54')})
    }

    mapTextures()
    {

        // map baked textures
        this.ramenShopMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.ramenShopBakedTexture })
        this.machinesMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.machinesBakedTexture })
        this.floorMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.floorBakedTexture })
        this.miscMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.miscBakedTexture })
        this.graphicsMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.graphicsBakedTexture })

        // map matcap textures
        this.dishMatcapMaterial = new THREE.MeshMatcapMaterial({matcap: this.resources.items.dishMatcapTexture, side: THREE.DoubleSide})
        this.fanMatcapMaterial = new THREE.MeshMatcapMaterial({matcap: this.resources.items.fanMatcapTexture})

        // map screen textures
        this.bigScreenMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.bigScreenDefaultTexture })
        this.arcadeScreenMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.arcadeScreenDefaultTexture })
        this.vendingMachineScreenMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.vendingMachineDefaultTexture })

        // Map video textures

        // https://discourse.threejs.org/t/basis-video-texture/12716/2

        this.littleTVScreenVideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.littleTVScreenVideoTexture, new THREE.Color("rgb(0, 255, 0)"));
        this.tallScreenVideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.tallScreenVideoTexture, new THREE.Color("rgb(0, 255, 0)"));
        this.tvScreenVideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.tvScreenVideoTexture, new THREE.Color("rgb(0, 255, 0)"));

        for ( let i = 0; i < Object.keys(this.resources.video).length; i ++ ) {

            this.resources.video[Object.keys(this.resources.video)[i]].play()
        }

        this.resources.trigger('texturesMapped')
    }

    getChromaKeyShaderMaterial(texture, color) {

        this.vertexShader = `
        varying vec2 vUv;
        void main( void ) {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
        `;
        this.fragmentShader = `
        uniform vec3 keyColor;
        uniform float similarity;
        uniform float smoothness;
        varying vec2 vUv;
        uniform sampler2D map;
        void main() {
    
            vec4 videoColor = texture2D(map, vUv);
    
            float Y1 = 0.299 * keyColor.r + 0.587 * keyColor.g + 0.114 * keyColor.b;
            float Cr1 = keyColor.r - Y1;
            float Cb1 = keyColor.b - Y1;
    
            float Y2 = 0.299 * videoColor.r + 0.587 * videoColor.g + 0.114 * videoColor.b;
            float Cr2 = videoColor.r - Y2;
            float Cb2 = videoColor.b - Y2;
    
            float blend = smoothstep(similarity, similarity + smoothness, distance(vec2(Cr2, Cb2), vec2(Cr1, Cb1)));
            gl_FragColor = vec4(videoColor.rgb, videoColor.a * blend);
        }
        `;
    
        return new THREE.ShaderMaterial({
          transparent: true,
          uniforms: {
            map: {
              value: texture
            },
            keyColor: {
              value: color.toArray()
            },
            similarity: {
              value: 0.01
            },
            smoothness: {
              value: 0.0
            }
          },
          vertexShader: this.vertexShader,
          fragmentShader: this.fragmentShader
        });
      }

}



