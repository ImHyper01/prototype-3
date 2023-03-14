import * as PIXI from 'pixi.js'

export class Plane extends PIXI.Sprite {
xspeed : number = 0
yspeed : number = 0
game: any


constructor(texture: PIXI.Texture, game:any){
    super(texture)
    this.xspeed = 0
    this.yspeed = 0
    this.game = game
    this.x = 100
    this.y = 100
    this.anchor.set(0.5)
    this.scale.set(1.7)
    

    window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
    window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))
    }

    thrive() {
        this.x += this.xspeed
        this.y += this.yspeed
    }

    
    shoot(){
        this.game.addBullet(this.x + 0, this.y + 0)
    }
    

    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "W":
            case "ARROWUP":
                this.yspeed = -7
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 7
                break
            case "D":
            case "ARROWRIGHT":
                this.shoot()
                break
        }
    }

    onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
    }

}

