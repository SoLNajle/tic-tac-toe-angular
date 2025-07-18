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
  @Input() isDraw = false;
  @Input() gameOver = false;
  @Input() currentPlayer = '';
  @Output() restartGameClicked = new EventEmitter<void>();
}
