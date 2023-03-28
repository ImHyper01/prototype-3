import * as PIXI from "pixi.js"
import { game } from "./game";

export class UI {
    scoreField: PIXI.Text
    game:game
    score:number = 0


    constructor(game: game){
        this.game = game

        const style = new PIXI.TextStyle({
            fontFamily: 'ArcadeFont',
            fontSize: 40,
            fontWeight: 'bold',
            fill: ['#ffffff']
        })

        this.scoreField = new PIXI.Text('Score : 0', style)
        this.scoreField.x = 20
        this.scoreField.y = 20

        
        this.game.pixi.stage.addChild(this.scoreField)
    }

    addScore(n:number){
        this.score += n
        this.scoreField.text = `Score : ${this.score}`
    }
}