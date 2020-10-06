import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { FlappyPipe } from './classes/pipe';
import { Bird } from './classes/bird';

@Component({
  selector: 'app-flappy',
  templateUrl: './flappy.component.html',
  styleUrls: ['./flappy.component.css']
})
export class FlappyComponent implements OnInit {

private p5: any;
private canvas: p5;
private score: number = 0;

  constructor() { }

  ngOnInit() {
    const sketch = (s: any) => {
      var bird: any;
      var pipes = [];
      var gameStart = false;

      s.setup = () => {
        var gameWindow = s.createCanvas(1200, 800);
        gameWindow.position(50, 55);
        bird = new Bird(this.canvas);
      };

      s.draw = () => {
        s.background(51);

        if(gameStart) {
          for(var i = pipes.length - 1; i >= 0; i--){
            if(pipes[i].hit(bird)){
              this.freezeGame(bird, pipes);
            }
            else if(pipes[i].past(bird)) {
              this.score++;
            }

            pipes[i].show();
            pipes[i].update();

            if(pipes[i].offscreen()){
                pipes.splice(i, 1);
            }
          }

          bird.show();
          bird.update();

          if(s.frameCount % 100 == 0){
              pipes.push(new FlappyPipe(this.canvas));
          }

          this.canvas.textSize(32);
          this.canvas.fill(255);
          this.canvas.text('Score: ' + this.score.toString(), 1000, 768);
        }
        else {
          this.canvas.textSize(32);
          this.canvas.fill(255);
          this.canvas.text('Press Space to Start', this.canvas.width*.38, this.canvas.height/2);
        }
      };

      s.keyPressed = () => {
        if(s.key == ' ') {
          gameStart ? null : gameStart = true;
            bird.flap();
        }
      };
  }

    this.canvas = new p5(sketch);
  }

  freezeGame(bird: any, pipes: any) {
    bird.freeze();
    for(var i = 0; i < pipes.length; i++) {
      pipes[i].freeze();
    }
  }
}
