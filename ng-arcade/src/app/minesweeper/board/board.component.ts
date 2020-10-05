import { Component, OnInit, Output, Input } from '@angular/core';
import { Board } from '../classes/board';
import { TileComponent } from '../tile/tile.component';
import { Tile } from '../classes/tile';

@Component({
  selector: 'board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Input() board: Board;
  @Input() action: string;

  constructor() { }

  ngOnInit() {
  }

  tileClicked(tile: Tile){
    if(!this.board.complete && !this.board.lost){
      if(this.action == 'uncovor'){
        if(tile.getMine() == true){
          this.board.lost = true;
        }
        else if(tile.getCovored() == true){
          this.board.cascadeUncovor(tile);
        }
      }
      if(this.action == 'flag'){
        if(tile.getCovored() == true){
          if(this.board.flagCount == 0 && tile.getFlagged() == true){
            tile.toggleFlagged();
            this.board.flagCount++;
          }
          else if(this.board.flagCount == this.board.mineCount && tile.getFlagged() == false){
            tile.toggleFlagged();
            this.board.flagCount--;
          }
          else if(this.board.flagCount > 0 && this.board.flagCount < this.board.mineCount){
            tile.toggleFlagged();
            if(tile.getFlagged() == true){
              this.board.flagCount--;
            }
            else{
              this.board.flagCount++;
            }
          }
        }
      }
      if(this.board.flagCount == 0){
        this.board.complete = this.board.checkCompleletion();
        console.log(this.board.complete);
      }
      this.board.handleCompletion();
    }
  }
}
