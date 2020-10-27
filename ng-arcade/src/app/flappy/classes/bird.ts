import * as p5 from 'p5';

export class Bird {
    x: number;
    y: number;
    size: number;
    velocity: number;
    gravity: number;
    canvas: any;

    frozen: boolean;

    constructor(canvas: any) {
        this.canvas = canvas;
        this.x = 100;
        this.y = canvas.height/2;
        this.size = 30;
        this.velocity = 0;
        this.gravity = 0.25;
        this.frozen = false;
    }

    show() {
        this.canvas.fill(255)
        this.canvas.ellipse(this.x, this.y, this.size, this.size);
    }

    update() {
        if(!this.frozen){
            if(this.y > this.canvas.height-this.size/2){
                this.y = this.canvas.height-this.size/2;
                this.velocity = 0;
            }
            else if(this.y < 0+this.size/2){
                this.y = 0+this.size/2;
                this.velocity = 0;
            }
            else{
                this.velocity += this.gravity;
                if(this.velocity > 10) this.velocity = 10;
                else if(this.velocity < -10) this.velocity = -10;
                this.y += this.velocity;
            }
        }
    }

    freeze() {
        this.frozen = true;
    }

    flap() {
        this.velocity -= 10;
    }
}