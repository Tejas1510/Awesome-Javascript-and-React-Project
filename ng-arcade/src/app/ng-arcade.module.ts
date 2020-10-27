import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgArcadeRoutingModule } from './ng-arcade-routing.module';
import { NgArcadeComponent } from './ng-arcade.component';
import { MinesweeperModule } from './minesweeper/minesweeper.module';
import { FlappyComponent } from './flappy/flappy.component';

@NgModule({
  declarations: [
    NgArcadeComponent,
    FlappyComponent
  ],
  imports: [
    BrowserModule,
    NgArcadeRoutingModule,
    MinesweeperModule
  ],
  providers: [],
  bootstrap: [NgArcadeComponent],
  exports: [
    FlappyComponent,
    MinesweeperModule
  ]
})
export class NgArcadeModule { }
