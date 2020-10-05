import * as p5 from 'p5';

export class FlappyPipe {
    top: number;
    bottom: number;
    x: number;
    width: number;
    speed: number;
    canvas: any;

    highlight: boolean = false;
    frozen: boolean;
    counted: boolean = false;
    
    constructor(canvas: any){
        this.canvas = canvas;
        this.top = canvas.random(120, canvas.height - 240);
        this.bottom = this.top + 120;
        this.x = canvas.width;
        this.width = 20;
        this.speed = 4;
        this.frozen = false;
    }

    show() {
        this.canvas.fill(255);
        if(this.highlight) {
            this.canvas.fill(255, 0, 0);
        }
        this.canvas.rect(this.x, 0, this.width, this.top);
        this.canvas.rect(this.x, this.bottom, this.width, this.canvas.height);
    }

    offscreen(): boolean {
        var state;
        this.x < -this.width ? state = true : state = false;
        return state;
    }

    hit(bird: any) {
        if(bird.y-(bird.size/2) < this.top || bird.y+(bird.size/2) > this.bottom) {
            if(bird.x+(bird.size/2) > this.x && bird.x-(bird.size/2) < this.x+this.width) {
                this.highlight = true;
                return true;
            }
        }
    }

    past(bird: any) {
        var state: boolean;
        if((this.x + this.width) < (bird.x - (bird.size/2)) && !this.counted) { 
            state = true; 
            this.counted = true;
        } 
        else {
            state = false;
        }
        return state;
    }

    freeze() {
        this.frozen = true;
    }

    update() {
        if(!this.frozen) {
            this.x -= this.speed;
        }
    }
}