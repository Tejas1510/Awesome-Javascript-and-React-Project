import { Tile } from './tile';

export class Board {
    size: number;
    mineCount: number;
    flagCount: number;
    tiles: Tile[][];
    complete: boolean;
    lost: boolean;
    message: string;
    constructor(size: number, mineCount: number){
        this.size = size;
        this.mineCount = mineCount;
        this.flagCount = mineCount;
        this.tiles = [];
        this.complete = false;
        this.lost = false;
    }
    initializeTiles(){
        for(var i = 0; i < this.size; i++){
            this.tiles[i] = [];
            for(var j = 0; j < this.size; j++){
                this.tiles[i][j] = new Tile(i, j);
            }
        }
        for(var i = 0; i < this.mineCount; i++){
            this.placeRandomMine();
        }
    }
    placeRandomMine(){ //must be run per number of mines
        var i = this.getRandomIntInclusive(0, this.size - 1);
        var j = this.getRandomIntInclusive(0, this.size - 1);
        if(this.tiles[i][j].getMine() === true){
            this.placeRandomMine();
        }
        else this.tiles[i][j].setMine();
    }
    getRandomIntInclusive(min, max): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    countAdjacentMines(){
        for(var i = 0; i < this.size; i++){
            for(var j = 0; j < this.size; j++){
                if(this.tiles[i][j].getMine() == false){
                    if(i !== 0 && j !== 0){ 
                        if(this.tiles[i-1][j-1].getMine() == true){
                            this.tiles[i][j].addAdjacentMine();
                        }
                    }
                    if(i !== 0){
                        if(this.tiles[i-1][j].getMine() == true){
                            this.tiles[i][j].addAdjacentMine();
                        }
                    }
                    if(i !== 0 && j !== (this.size - 1)){
                        if(this.tiles[i-1][j+1].getMine() == true){
                            this.tiles[i][j].addAdjacentMine();
                        }
                    }
                    if(j !== 0){
                        if(this.tiles[i][j-1].getMine() == true){
                            this.tiles[i][j].addAdjacentMine();
                        }
                    }
                    if(j !== (this.size - 1)){
                        if(this.tiles[i][j+1].getMine() == true){
                            this.tiles[i][j].addAdjacentMine();
                        }
                    }
                    if(i !== (this.size - 1) && j !== 0){ 
                        if(this.tiles[i+1][j-1].getMine() == true){
                            this. tiles[i][j].addAdjacentMine();
                        }
                    }
                    if(i !== (this.size - 1)){
                        if(this.tiles[i+1][j].getMine() == true){
                            this.tiles[i][j].addAdjacentMine();
                        }
                    }
                    if(i !== (this.size - 1) && j !== (this.size - 1)){
                        if(this.tiles[i+1][j+1].getMine() == true){
                            this.tiles[i][j].addAdjacentMine();
                        }
                    }
                    // console.log(this.tiles[i][j].getAdjacentMines());
                };
            }
        }
    }
    cascadeUncovor(tile: Tile){
        if(tile.getCovored() == true){
            tile.setUncovored();
            if(tile.getFlagged() == true)
                this.flagCount++;
            if(tile.getRow() != 0){
                if(tile.getAdjacentMines() == 0){
                    this.cascadeUncovor(this.tiles[tile.getRow() - 1][tile.getColumn()]);
                }
            }
            if(tile.getRow() != (this.size - 1)){
                if(tile.getAdjacentMines() == 0){
                    this.cascadeUncovor(this.tiles[tile.getRow() + 1][tile.getColumn()]);
                }
            }
            if(tile.getColumn() != 0){
                if(tile.getAdjacentMines() == 0){
                    this.cascadeUncovor(this.tiles[tile.getRow()][tile.getColumn() - 1]);
                }
            }
            if(tile.getColumn() != (this.size - 1)){
                if(tile.getAdjacentMines() == 0){
                    this.cascadeUncovor(this.tiles[tile.getRow()][tile.getColumn() + 1]);
                }
            }
        }
    }
    uncovor(){
        for(var i = 0; i < this.size; i++){
            for(var j = 0; j < this.size; j++){
                this.tiles[i][j].setUncovored();
            }
        }
    }
    checkCompleletion(): boolean{
        for(var i = 0; i < this.size; i++){
            for(var j = 0; j < this.size; j++){
                if(this.tiles[i][j].getMine() == true && this.tiles[i][j].getFlagged() == false){
                    return false;
                }
                if(this.tiles[i][j].getCovored() == true && this.tiles[i][j].getMine() == false){
                    return false;
                }
            }
        }
        return true;
    }
    handleCompletion(){
        if(this.lost == true){
            this.uncovor();
            this.message = "You lost... My condolences :("
        }
        if(this.complete == true){
            this.uncovor()
            this.message = "Congratulations! You swept all the mines! :^)";
        }
    }
}
