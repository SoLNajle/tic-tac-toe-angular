import { Component } from '@angular/core';
import { Cell } from '../cell/cell';
import { CommonModule } from '@angular/common';
import { GameStatus } from '../game-status/game-status';
import { ConfettiService } from '../../services/confetti';

@Component({
  selector: 'app-game-board',
  imports: [Cell, CommonModule, GameStatus
  ],
  templateUrl: './game-board.html',
  styleUrl: './game-board.css',
  standalone: true,
})
export class GameBoard {
  constructor(private confettiService: ConfettiService) {}
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
    this.checkGameStatus();
  }
  checkWinnerbyRow() {
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0] === this.board[i][1] && this.board[i][1] === this.board[i][2] && this.board[i][0] !== '') {
        return this.board[i][0];
      }
    }
    return null;
  }
  checkWinnerbyColumn() {
    for (let i = 0; i < 3; i++) {
      if (this.board[0][i] === this.board[1][i] && this.board[1][i] === this.board[2][i] && this.board[0][i] !== '') {
        return this.board[0][i];
      }
    }
    return null;
  }
  checkWinnerbyDiagonal() {
    if (this.board[0][0] === this.board[1][1] && this.board[1][1] === this.board[2][2] && this.board[0][0] !== '') {
      return this.board[0][0];
    }
    return null;
  }
  checkWinner() {
    // Check rows
    const winnerByRow = this.checkWinnerbyRow();
    if (winnerByRow) {
      return winnerByRow;
    }
    // Check columns
    const winnerByColumn = this.checkWinnerbyColumn();
    if (winnerByColumn) {
      return winnerByColumn;
    }
    // Check diagonals
    const winnerByDiagonal = this.checkWinnerbyDiagonal();
    if (winnerByDiagonal) {
      return winnerByDiagonal;
    }
    return null;
  }
  checkGameStatus() {
    // Check if there is a winner
    const winner = this.checkWinner();
    if (winner) {
      this.winner = winner;
      this.gameOver = true;
      this.confettiService.triggerPlayerConfetti(winner);
      return;
    }
    // Check for a draw
    if (this.board.flat().every(cell => cell !== '')) {
      this.isDraw = true;
      this.gameOver = true;
      return;
    }

  }
  onRestartGameClicked() {
    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ];
    this.currentPlayer = this.playerX;
    this.gameOver = false;
    this.winner = null;
    this.isDraw = false;
  }
 
}
