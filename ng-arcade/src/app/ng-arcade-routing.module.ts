import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MinesweeperMainComponent } from './minesweeper/minesweeper-main/minesweeper-main.component';
import { FlappyComponent } from './flappy/flappy.component';


const routes: Routes = [
  { path: 'games/minesweeper', component: MinesweeperMainComponent },
  { path: 'games/flappy', component: FlappyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class NgArcadeRoutingModule { }
