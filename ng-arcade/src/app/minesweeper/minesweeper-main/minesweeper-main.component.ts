import { Component, OnInit, Input } from '@angular/core';
import { Board } from '../classes/board';

import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-minesweeper-main',
  templateUrl: './minesweeper-main.component.html',
  styleUrls: ['./minesweeper-main.component.css']
})
export class MinesweeperMainComponent implements OnInit {

  boardSize: number;
  mineCount: number;
  action: string;
  board: Board;

  difficultyMenuActive: boolean;

  // Icons
  faDropdown = faAngleDown;

  constructor() { }

  ngOnInit() {
    this.difficultyMenuActive = false;
    this.easy();
    this.startNewGame();
  }

  startNewGame(): void {
    this.board = new Board(this.boardSize, this.mineCount);
    this.action = 'uncovor';
    this.board.initializeTiles();
    this.board.countAdjacentMines();
    console.log(this.board);
  }

  easy(): void {
    this.toggleDifficultyMenu();
    this.boardSize = 10;
    this.mineCount = 10;
    this.startNewGame();
  }

  medium(): void {
    this.toggleDifficultyMenu();
    this.boardSize = 15;
    this.mineCount = 25;
    this.startNewGame();
  }

  hard(): void {
    this.toggleDifficultyMenu();
    this.boardSize = 20;
    this.mineCount = 40;
    this.startNewGame();
  }

  setActionUncovor(): void {
    this.action = 'uncovor';
  }

  setActionFlag(): void {
    this.action = 'flag';
  }

  toggleDifficultyMenu(): void {
    this.difficultyMenuActive = !this.difficultyMenuActive;
  }

}
