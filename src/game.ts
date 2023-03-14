import * as PIXI from 'pixi.js'
import bomImage from "./images/bom.png"
import planeImage from "./images/plane.png"
import cloudImage from "./images/wolken.jpg"
import laserImage from "./images/laser.png"
import laserSound from "url:./sounds/blaster.mp3"
import { Bom } from "./bom"
import { Plane } from "./plane"
import { Laser } from './laser'

export class game {
    pixi : PIXI.Application
    loader : PIXI.Loader
    bom : Bom []=[]
    plane : Plane
    laser : Laser [] = []
    container: any
    assetLoader: any
    laserSound: HTMLAudioElement


constructor(){
    this.pixi = new PIXI.Application({ width: 1500, height: 700 })
    const pixiCanvas = document.getElementById("pixi-canvas")
   
    if (pixiCanvas != null) {
        pixiCanvas.appendChild(this.pixi.view)
    }


    this.loader = new PIXI.Loader()
    this.loader.add('bomTexture', bomImage)
        .add('planeTexture', planeImage)
        .add('cloudTexture', cloudImage)
        .add('laserTexture', laserImage)
        .add('laserSound', laserSound)
    this.loader.load(()=> this.loadCompleted())

}

loadCompleted(){
    let bg = new PIXI.TilingSprite(this.loader.resources["cloudTexture"].texture!, 1200, 700)
    this.pixi.stage.addChild(bg)
    bg.scale.set (1.4) 

    for (let i=0; i<10; i++){
        let bigBomb = new Bom(this.loader.resources["bomTexture"].texture!)
        this.pixi.stage.addChild(bigBomb)
        this.bom.push(bigBomb)
    }

    this.plane = new Plane (this.loader.resources["planeTexture"].texture!, this)
    this.pixi.stage.addChild(this.plane)

    this.laserSound = this.loader.resources["laserSound"].data

    this.pixi.ticker.add(() => this.update())
}

update(){

    for (let bom of this.bom){
        bom.update()
    }

    for (let laser of this.laser) {
        laser.update()
    }
    
    for (let bom of this.bom){
        bom.thrive()
    }

    this.plane.thrive()
    this.checkCollision()
}


addBullet(x: number, y: number) {
    console.log("shoot")
    let b = new Laser(this.loader.resources["laserTexture"].texture!, this, x, y)
    this.laser.push(b)
    this.laserSound.play()
    this.pixi.stage.addChild(b)
}

removeBullet(laser: Laser) {
    this.laser = this.laser.filter((b: Laser) => b != laser)
    laser.destroy()
}


checkCollision(){
    for(let laser of this.laser){
        for(let bom of this.bom){
            if(this.collision(laser, bom)){
                this.removeBullet(laser)
                bom.resetPosition()
                break
            }
        }
    }
}

collision(laser:Laser, bom:Bom){
    const bounds1 = laser.getBounds()
    const bounds2 = bom.getBounds()

    return bounds1.x < bounds2.x + bounds2.width
    && bounds1.x + bounds1.width > bounds2.x
    && bounds1.y < bounds2.y + bounds2.height
    && bounds1.y + bounds1.height > bounds2.y;
}


}

new game()