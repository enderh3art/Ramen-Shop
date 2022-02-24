import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Hologram
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.preLoader = this.experience.preLoader
        this.sounds = this.experience.sounds

        // Debug
        if(this.debug.active)
        {
            // this.debugFolder = this.debug.ui.addFolder('hologram')
        }

        // Resource
        this.ramenHologram = this.resources.items.ramenHologram
        this.update = function update() {}

        this.animate = true
        this.positions = this.combineBuffer( this.ramenHologram.scene, 'position' )
        this.createMesh( this.positions, this.scene, 0.0225, -0.1, 2, -0.95 )


        this.started = false
        this.preLoader.on('start', () => 
        {
            window.setTimeout(()=>{
                this.raiseHologram()
            }, 100)
            this.started = true

            
        })

    }

    combineBuffer( model, bufferName ) 
    {
        this.totalCount = 0;
    
        model.traverse( ( child ) => {
    
            if ( child.isMesh ) {
                
                this.buffer = child.geometry.attributes[ bufferName ];
    
                this.totalCount += this.buffer.array.length;
            }
    
        } );
    
        this.combined = new Float32Array( this.totalCount );
    
        this.offset = 0;
    
        model.traverse(( child ) => {
    
            if ( child.isMesh ) {
    
                this.buffer = child.geometry.attributes[ bufferName ];
    
                this.combined.set( this.buffer.array, this.offset );
                this.offset += this.buffer.array.length;
            }
        } );
    
        return new THREE.BufferAttribute( this.combined, 3 );
    }

    createMesh( positions, scene, scale, x, y, z ) {

        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute( 'position', positions.clone() );
        this.geometry.setAttribute( 'initialPosition', positions.clone() );
    
        this.geometry.attributes.position.setUsage( THREE.DynamicDrawUsage );

        this.mesh = new THREE.Points( this.geometry, new THREE.PointsMaterial( { size: .01, color: new THREE.Color( 0x00ffff ) } ) );
        this.mesh.scale.x = this.mesh.scale.y = this.mesh.scale.z = scale;
    
        this.mesh.position.x = x 
        this.mesh.position.y = y 
        this.mesh.position.z = z 
    
        scene.add( this.mesh );
        
        this.data = {
            mesh: this.mesh, verticesDown: 0, verticesUp: 0, direction: 0, speed: 15, delay: 500,
            start: 10,
        }

        this.enableUpdate()
        

    }

    raiseHologram()
    {
        if ( this.data.verticesDown >= this.count ) {
                this.data.direction = 1;
                this.data.speed = 5;
                this.data.verticesDown = 0;
                this.data.delay = 1000;

        }
    }

    breakHologram()
    {
        if ( this.data.verticesUp >= this.count && this.animate === true) {
                this.sounds.playHologram()
                this.data.direction = - 1;
                this.data.speed = 15;
                this.data.verticesUp = 0;
                this.data.delay = 50;

        }
    }

    enableUpdate()
    {
        // Update Function
        this.update = function update() {

            // Mesh drop and Rise
            this.positions = this.data.mesh.geometry.attributes.position;
            this.initialPositions = this.data.mesh.geometry.attributes.initialPosition;

            this.count = this.positions.count;

            if ( this.data.start > 0 ) {

                this.data.start -= 1;

            } else {

                
                if ( this.data.direction === 0 && this.started === false) {
                    this.data.direction = - 1;
                }

            }

            for ( let i = 0; i < this.count; i ++ ) {

                this.px = this.positions.getX( i );
                this.py = this.positions.getY( i );
                this.pz = this.positions.getZ( i );

                // falling down
                if ( this.data.direction < 0 ) {

                    if ( this.py > 0 ) {

                        this.positions.setXYZ(
                            i,
                            this.px + 1.5 * ( 0.50 - Math.random() ) * this.data.speed * this.time.delta * 0.01,
                            this.py + 3.0 * ( 0.25 - Math.random() ) * this.data.speed * this.time.delta * 0.01,
                            this.pz + 1.5 * ( 0.50 - Math.random() ) * this.data.speed * this.time.delta * 0.01
                        );

                    } else {

                        this.data.verticesDown += 1;

                    }

                }

                // rising up
                if ( this.data.direction > 0 ) {

                    this.ix = this.initialPositions.getX( i );
                    this.iy = this.initialPositions.getY( i );
                    this.iz = this.initialPositions.getZ( i );

                    this.dx = Math.abs( this.px - this.ix );
                    this.dy = Math.abs( this.py - this.iy );
                    this.dz = Math.abs( this.pz - this.iz );

                    this.d = this.dx + this.dy + this.dx;

                    if ( this.d > 1 ) {

                        this.positions.setXYZ(
                            i,
                            this.px - ( this.px - this.ix ) / this.dx * this.data.speed * this.time.delta * ( 0.85 - Math.random() ) * 0.01,
                            this.py - ( this.py - this.iy ) / this.dy * this.data.speed * this.time.delta * ( 1 + Math.random() ) * 0.01,
                            this.pz - ( this.pz - this.iz ) / this.dz * this.data.speed * this.time.delta * ( 0.85 - Math.random() ) * 0.01
                        );

                    } else {

                        this.data.verticesUp += 1;

                    }

                }

            }

            // all vertices down (go up)

            if ( this.data.verticesDown >= this.count && this.animate === true) {
                if ( this.data.delay <= 0 ) {

                    this.data.direction = 1;
                    this.data.speed = 5;
                    this.data.verticesDown = 0;
                    // this.data.delay = 1000;

                } else {

                    this.data.delay -= 1;

                }

            }

            // all vertices up (go down)

            // if ( this.data.verticesUp >= this.count && this.animate === true) {

            //     if ( this.data.delay <= 0 ) {

            //         this.data.direction = - 1;
            //         this.data.speed = 15;
            //         this.data.verticesUp = 0;
            //         this.data.delay = 20;

            //     } else {

            //         this.data.delay -= 1;

            //     }

            // }

            this.positions.needsUpdate = true;

        }
    }
    
}