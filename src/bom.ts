import * as PIXI from 'pixi.js'

export class Bom extends PIXI.Sprite {
    speed : number
    hitbox:PIXI.Rectangle
    rotationSpeed: number = 0.01

    constructor(texture: PIXI.Texture) {
        super(texture)
        this.hitbox = new PIXI.Rectangle(0, 0, 70, 55)
        this.anchor.set(0.4)
        this.scale.set(0.7)


        let greenBox = new PIXI.Graphics()
        greenBox.lineStyle(2, 0x33FF33, 1)
        greenBox.drawRect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height)
        this.addChild(greenBox)

        this.resetPosition()
    }

    thrive() {
        this.x -= this.speed

        if (this.x < -100) {
            this.x = window.innerWidth + 100
            this.y = Math.random() * window.innerHeight
        }
        
    }

    getBounds() : PIXI.Rectangle {
        return new PIXI.Rectangle(this.x + this.hitbox.x, this.y + this.hitbox.y, this.hitbox.width, this.hitbox.height)
    }

    update(){
        this.rotation += this.rotationSpeed
        this.x -= this.speed
        if (this.x < -100) this.resetPosition()
    }

    resetPosition() {
      this.rotationSpeed = Math.random() / 100
        this.speed = 1 + Math.random()
        this.x = 1700 + Math.random() * 120
        this.y = Math.random() * 570
    }
}