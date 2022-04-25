import * as THREE from 'three'
import Experience from '../Experience.js'
import chromaVertexShader from '../../shaders/chromaShaders/vertex.glsl'
import chromaFragmentShader from '../../shaders/chromaShaders/fragment.glsl'
import TransitionVertexShader from '../../shaders/transitionShaders/vertex.glsl'
import TransitionFragmentShader from '../../shaders/transitionShaders/fragment.glsl'
import SlideTransitionFragmentShader from '../../shaders/transitionShaders/slideFragment.glsl'
import hologramVertexShader from '../../shaders/hologramShaders/vertex.glsl'
import hologramFragmentShader from '../../shaders/hologramShaders/fragment.glsl'
import bigScreenVertexShader from '../../shaders/bigScreenShaders/vertex.glsl'
import bigScreenFragmentShader from '../../shaders/bigScreenShaders/fragment.glsl'

export default class Materials
{
    constructor()
    {
        this.experience = new Experience()
        this.debug = this.experience.debug
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.preLoader = this.experience.preLoader
        this.config = this.experience.config

        this.mapColors()

        // Wait for textures
        this.resources.on('ready', () =>
        {
            this.mapTextures()
        })

        this.preLoader.on('start', () =>
        {
            // Setup
            this.config.touch = this.experience.config.touch
            this.mapEasel()
        }) 

        // Debug
        this.debugObject = {}
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
        this.lightMatcapMaterial = new THREE.MeshMatcapMaterial({matcap: this.resources.items.lightMatcapTexture})
        this.neonBlueMatcapMaterial = new THREE.MeshMatcapMaterial({matcap: this.resources.items.neonBlueMatcapTexture})
        this.neonGreenMatcapMaterial = new THREE.MeshMatcapMaterial({matcap: this.resources.items.neonGreenMatcapTexture})

        // map screen textures
        // this.bigScreenMaterial = this.getTransitionShaderMaterial(this.resources.items.bigScreenDefaultTexture)
        // this.vendingMachineScreenMaterial = this.getTransitionShaderMaterial(this.resources.items.vendingMachineDefaultTexture)
        this.arcadeScreenMaterial = this.getTransitionShaderMaterial(this.resources.items.arcadeScreenDefaultTexture)


        this.sideScreenMaterial = this.getSideScreenShaderMaterial(this.resources.items.sideScreen1Texture)

        // Map video textures

        // https://discourse.threejs.org/t/basis-video-texture/12716/2

        this.littleTVScreenVideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.littleTVScreenVideoTexture, new THREE.Color("rgb(0, 255, 0)"));
        this.tallScreenVideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.tallScreenVideoTexture, new THREE.Color("rgb(0, 255, 0)"));
        this.tvScreenVideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.tvScreenVideoTexture, new THREE.Color("rgb(0, 255, 0)"));

        this.smallScreen1Material = this.getTransitionShaderMaterial(this.resources.items.smallScreenOne1)
        this.smallScreen2Material = this.getTransitionShaderMaterial(this.resources.items.smallScreenTwo1)

        this.smallScreen3VideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.smallScreen3VideoTexture, new THREE.Color("rgb(0, 255, 0)"));
        this.smallScreen4VideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.smallScreen4VideoTexture, new THREE.Color("rgb(0, 255, 0)"));
        this.smallScreen5VideoMaterial = this.getChromaKeyShaderMaterial(this.resources.items.smallScreen5VideoTexture, new THREE.Color("rgb(0, 255, 0)"));
        
        // play the videos
        for ( let i = 0; i < Object.keys(this.resources.video).length; i ++ ) {
            this.resources.video[Object.keys(this.resources.video)[i]].play()
        }

        // Shader Materials

        //Hologram
        this.hologramBaseMaterial = new THREE.ShaderMaterial({
          vertexShader: hologramVertexShader,
          fragmentShader: hologramFragmentShader,
          transparent: true,
          uniforms:{
              uTime: { value: 0},
              uBigGridThickness: {value : 0.13},
              uLittleGridThickness: {value : 0.1},
              uBigGridFrequency: {value : 8.0},
              uLittleGridFrequency: {value : 24.0},
              uSpeed : {value: 0.8},
              uColor: {value: new THREE.Color('#42f2ff')},
          }
        })

        // Big Screen

        this.debugObject.bigScreenLightColor = '#00FFF0'
        this.debugObject.bigScreenDarkColor = '#05a7bd'
        this.debugObject.vendingMachineScreenLightColor = '#34fe81'
        this.debugObject.vendingMachineScreenDarkColor = '#386aff'

        this.bigScreenMaterial = new THREE.ShaderMaterial({
          vertexShader: bigScreenVertexShader,
          fragmentShader: bigScreenFragmentShader,
          uniforms:{
              uTime: { value: 0},
              uXOffset: {value : 0.268},
              uYOffset: {value : 0.648},
              uRadialThickness: {value : 4.0},
              uSpeed : {value: 0.3},
              uLightColor: {value: new THREE.Color(this.debugObject.bigScreenLightColor)},
              uDarkColor: {value: new THREE.Color(this.debugObject.bigScreenDarkColor)},
              uDefaultTexture: {value: this.resources.items.bigScreenDefaultTexture},
              uTexture1: {value: null },
              uTexture2: {value: null },
              uProgress: {value: 0 },
              uTexture1IsDefault: {value: 1.0},
              uTexture2IsDefault: {value: 0},
          }
        })

        this.vendingMachineScreenMaterial = new THREE.ShaderMaterial({
          vertexShader: bigScreenVertexShader,
          fragmentShader: bigScreenFragmentShader,
          uniforms:{
              uTime: { value: 0},
              uXOffset: {value : 0.421},
              uYOffset: {value : 0.522},
              uRadialThickness: {value : 4.0},
              uSpeed : {value: 0.3},
              uLightColor: {value: new THREE.Color(this.debugObject.vendingMachineScreenLightColor)},
              uDarkColor: {value: new THREE.Color(this.debugObject.vendingMachineScreenDarkColor)},
              uDefaultTexture: {value: this.resources.items.vendingMachineDefaultTexture},
              uTexture1: {value: null },
              uTexture2: {value: null },
              uProgress: {value: 0 },
              uTexture1IsDefault: {value: 1.0},
              uTexture2IsDefault: {value: 0},
          }
        })

        // Debug
        if(this.debug.active)
        {
            //Hologram
            this.debugFolder = this.debug.ui.addFolder('shaderMaterials')
            this.debugFolder.add(this.hologramBaseMaterial.uniforms.uBigGridThickness, 'value').min(0).max(1).step(0.001).name('uBigGridThickness')
            this.debugFolder.add(this.hologramBaseMaterial.uniforms.uLittleGridThickness, 'value').min(0).max(1).step(0.001).name('uLittleGridThickness')
            this.debugFolder.add(this.hologramBaseMaterial.uniforms.uBigGridFrequency, 'value').min(0).max(10).step(1).name('uBigGridFrequency')
            this.debugFolder.add(this.hologramBaseMaterial.uniforms.uLittleGridFrequency, 'value').min(0).max(30).step(1).name('uLittleGridFrequency')
            this.debugFolder.add(this.hologramBaseMaterial.uniforms.uSpeed, 'value').min(0).max(3).step(0.001).name('uSpeed')      
          
            //bigScreen
            this.debugFolder.add(this.bigScreenMaterial.uniforms.uXOffset, 'value').min(-1).max(1).step(0.001).name('bigScreenUXOffset')
            this.debugFolder.add(this.bigScreenMaterial.uniforms.uYOffset, 'value').min(-1).max(1).step(0.001).name('bigScreenUYOffset')
            this.debugFolder.add(this.bigScreenMaterial.uniforms.uRadialThickness, 'value').min(0).max(8.0).step(0.001).name('bigScreenURadialThickness')
            this.debugFolder.add(this.bigScreenMaterial.uniforms.uSpeed, 'value').min(0).max(4).step(0.001).name('bigScreenUSpeed')
            this.debugFolder
              .addColor(this.debugObject, 'bigScreenLightColor')
              .name('bigScreenLightColor')
              .onChange(() =>
              {
                this.bigScreenMaterial.uniforms.uLightColor.value.set(this.debugObject.bigScreenLightColor)
              })
            this.debugFolder
              .addColor(this.debugObject, 'bigScreenDarkColor')
              .name('bigScreenDarkColor')
              .onChange(() =>
              {
                this.bigScreenMaterial.uniforms.uDarkColor.value.set(this.debugObject.bigScreenDarkColor)
              })

              //VendingMchineScreen
              this.debugFolder.add(this.vendingMachineScreenMaterial.uniforms.uXOffset, 'value').min(-1).max(1).step(0.001).name('vendingMachineScreenUXOffset')
              this.debugFolder.add(this.vendingMachineScreenMaterial.uniforms.uYOffset, 'value').min(-1).max(1).step(0.001).name('vendingMachineScreenUYOffset')
              this.debugFolder.add(this.vendingMachineScreenMaterial.uniforms.uRadialThickness, 'value').min(0).max(8.0).step(0.001).name('vendingMachineScreenURadialThickness')
              this.debugFolder.add(this.vendingMachineScreenMaterial.uniforms.uSpeed, 'value').min(0).max(4).step(0.001).name('vendingMachineScreenUSpeed')
              this.debugFolder
                .addColor(this.debugObject, 'vendingMachineScreenLightColor')
                .name('vendingMachineScreenLightColor')
                .onChange(() =>
                {
                  this.vendingMachineScreenMaterial.uniforms.uLightColor.value.set(this.debugObject.vendingMachineScreenLightColor)
                })
              this.debugFolder
                .addColor(this.debugObject, 'vendingMachineScreenDarkColor')
                .name('vendingMachineScreenDarkColor')
                .onChange(() =>
                {
                  this.vendingMachineScreenMaterial.uniforms.uDarkColor.value.set(this.debugObject.vendingMachineScreenDarkColor)
                })
            
        }



        this.resources.trigger('texturesMapped')
    }

    mapEasel()
    {
      if(this.config.touch === true)
      {
        this.easelMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.easelTouchTexture })
      }
      else{
        this.easelMaterial = new THREE.MeshBasicMaterial({ map: this.resources.items.easelClickTexture })
      }

      this.ramenShop = this.experience.world.ramenShop
      this.ramenShop.setEaselMaterial()
    }

// https://discourse.threejs.org/t/basis-video-texture/12716

    getChromaKeyShaderMaterial(texture, color) {
    
        return new THREE.ShaderMaterial({
          side: THREE.FrontSide,
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
          vertexShader: chromaVertexShader,
          fragmentShader: chromaFragmentShader
        });
      }
    
    getTransitionShaderMaterial(texture) {
  
      return new THREE.ShaderMaterial({
        side: THREE.FrontSide,
        uniforms: {
          texture1: {value: texture },
          progress: {value: 0 },
          texture2: {value: null },
        },
        // wireframe: true,
        vertexShader: TransitionVertexShader,
        fragmentShader: TransitionFragmentShader
      });
    }

    getSideScreenShaderMaterial(texture) {
  
      return new THREE.ShaderMaterial({
        side: THREE.FrontSide,
        uniforms: {
          texture1: {value: texture },
          progress: {value: 0 },
          texture2: {value: null },
        },
        // wireframe: true,
        vertexShader: TransitionVertexShader,
        fragmentShader: SlideTransitionFragmentShader
      });
    }


}



