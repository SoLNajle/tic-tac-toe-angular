import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-game-status',
  imports: [],
  templateUrl: './game-status.html',
  styleUrl: './game-status.css',
  standalone: true,
})
export class GameStatus {
  @Input() winner: string | null = null;
  @Input() isDraw: boolean = false;
  @Input() gameOver: boolean = false;
  @Input() currentPlayer: string = '';
  @Output() onRestartGameClicked = new EventEmitter<void>();
}
