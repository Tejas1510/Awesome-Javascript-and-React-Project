import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Tile } from '../classes/tile';

@Component({
  selector: 'tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit {

  @Output() tileClick = new EventEmitter();
  @Input() tile: Tile;

  constructor() { }

  ngOnInit() {
  }

  tileClicked(){
    this.tileClick.emit(this.tile);
  }

  getTile(tile: Tile){
    this.tile = tile;
  }
}
