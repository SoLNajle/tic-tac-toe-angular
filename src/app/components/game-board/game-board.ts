import { Component } from '@angular/core';
import { Cell } from '../cell/cell';
import { CommonModule } from '@angular/common';
import { GameStatus } from '../game-status/game-status';

@Component({
  selector: 'app-game-board',
  imports: [Cell, CommonModule, GameStatus],
  templateUrl: './game-board.html',
  styleUrl: './game-board.css',
  standalone: true,
})
export class GameBoard {
  playerX: string = "X";
  playerO: string = "O";
  winner: string | null = null;
  isDraw: boolean = false;
  gameOver: boolean = false;
  currentPlayer: string = this.playerX;
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ];

  
  onCellClicked(row: number, col: number) {
    // Check if cell is empty
    if (this.board[row][col] === '') {
      // Assign current player's value to the cell
      this.board[row][col] = this.currentPlayer;
      
      // Switch to the other player
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }
}
