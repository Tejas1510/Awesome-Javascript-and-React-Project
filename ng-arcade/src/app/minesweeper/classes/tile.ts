export class Tile {
    private tileImage: string;
    private covored: boolean;
    private mine: boolean;
    private flagged: boolean;
    private adjacentMines: number;
    private row: number;
    private column: number;
    constructor(row: number, column: number) {
        this.tileImage = "assets/minesweeper-images/covered.png"
        this.covored = true;
        this.mine = false;
        this.flagged = false;
        this.adjacentMines = 0;
        this.row = row;
        this.column = column;
    };
    setTileImage(image: string){
        this.tileImage = image;
    }
    setCovored(){
        this.covored = true;
    }
    setUncovored(){
        this.covored = false;
        if(this.mine == true){
            this.tileImage = 'assets/minesweeper-images/mine.png';
        }
        else if(this.mine == false){
            switch(this.adjacentMines){
                case 0: this.tileImage = 'assets/minesweeper-images/blank.png'; break;
                case 1: this.tileImage = 'assets/minesweeper-images/one.png'; break;
                case 2: this.tileImage = 'assets/minesweeper-images/two.png'; break;
                case 3: this.tileImage = 'assets/minesweeper-images/three.png'; break;
                case 4: this.tileImage = 'assets/minesweeper-images/four.png'; break;
                case 5: this.tileImage = 'assets/minesweeper-images/five.png'; break;
                case 6: this.tileImage = 'assets/minesweeper-images/six.png'; break;
                case 7: this.tileImage = 'assets/minesweeper-images/seven.png'; break;
                case 8: this.tileImage = 'assets/minesweeper-images/eight.png'; break;

            }
        }
    }
    setMine(){
        this.mine = true;
    }
    setNoMine(){
        this.mine = false;
    }
    toggleFlagged(){
        this.flagged = !this.flagged;
        switch(this.flagged){
            case false: this.tileImage = 'assets/minesweeper-images/covered.png'; break;
            case true: this.tileImage = 'assets/minesweeper-images/flagged.png'; break;
        }
    }
    addAdjacentMine(){
        this.adjacentMines++;
    }
    getTileImage(){
        return this.tileImage;
    }
    getCovored(){
        return this.covored;
    }
    getMine(){
        return this.mine;
    }
    getFlagged(){
        return this.flagged;
    }
    getAdjacentMines(){
        return this.adjacentMines;
    }
    getRow(){
        return this.row;
    }
    getColumn(){
        return this.column;
    }
}
