import { NgModule } from '@angular/core';
import { MinesweeperMainComponent } from './minesweeper-main/minesweeper-main.component';
import { BoardComponent } from './board/board.component';
import { TileComponent } from './tile/tile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  declarations: [
    MinesweeperMainComponent,
    BoardComponent,
    TileComponent
  ],
  exports: [
    MinesweeperMainComponent
  ]
})
export class MinesweeperModule { }
