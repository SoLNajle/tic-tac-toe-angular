import { Component, inject } from '@angular/core';
import { Cell } from '../cell/cell';
import { CommonModule } from '@angular/common';
import { GameStatus } from '../game-status/game-status';
import { ConfettiService } from '../../services/confetti';
import { Scoreboard } from '../scoreboard/scoreboard';
import { Scoreboard as ScoreboardModel } from '../../models/scoreboard.model';
import { ScoreboardService } from '../../services/scoreboard.service';

@Component({
  selector: 'app-game-board',
  imports: [Cell, CommonModule, GameStatus, Scoreboard,
  ],
  templateUrl: './game-board.html',
  styleUrl: './game-board.css',
  standalone: true,
})
export class GameBoard {
  private confettiService = inject(ConfettiService);
  private scoreboardService = inject(ScoreboardService);
  
  constructor() {
    this.scoreboard = this.scoreboardService.load();
  }
  playerX = "X";
  playerO = "O";
  winner: string | null = null;
  isDraw = false;
  gameOver = false;
  currentPlayer: string = this.playerX;
  scoreboard: ScoreboardModel = {
    playerXWins: 0,
    playerOWins: 0,
    draws: 0
  };

  board = [
    [{ value: '', hovered: false }, { value: '', hovered: false }, { value: '', hovered: false }],
    [{ value: '', hovered: false }, { value: '', hovered: false }, { value: '', hovered: false }],
    [{ value: '', hovered: false }, { value: '', hovered: false }, { value: '', hovered: false }]
  ];


  onCellClicked(row: number, col: number) {
    // Check if cell is empty
    if (this.board[row][col].value === '') {
      // Assign current player's value to the cell
      this.board[row][col].value = this.currentPlayer;

      // Switch to the other player
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    this.checkGameStatus();
  }
  checkWinnerbyRow() {
    for (let i = 0; i < 3; i++) {
      if (this.board[i][0].value === this.board[i][1].value && this.board[i][1].value === this.board[i][2].value && this.board[i][0].value !== '') {
        return this.board[i][0].value;
      }
    }
    return null;
  }
  checkWinnerbyColumn() {
    for (let i = 0; i < 3; i++) {
      if (this.board[0][i].value === this.board[1][i].value && this.board[1][i].value === this.board[2][i].value && this.board[0][i].value !== '') {
        return this.board[0][i].value;
      }
    }
    return null;
  }
  checkWinnerbyDiagonal() {
    if (this.board[0][0].value === this.board[1][1].value && this.board[1][1].value === this.board[2][2].value && this.board[0][0].value !== '') {
      return this.board[0][0].value;
    }
    if (this.board[0][2].value === this.board[1][1].value && this.board[1][1].value === this.board[2][0].value && this.board[0][2].value !== '') {
      return this.board[0][2].value;
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
      this.updateScoreboard(winner);
      return;
    }
    // Check for a draw
    if (this.board.flat().every(cell => cell.value !== '')) {
      this.isDraw = true;
      this.gameOver = true;
      this.onDraw();
      this.scoreboardService.save(this.scoreboard);
      return;
    }

  }

  updateScoreboard(winner: string) {
    if (winner === this.playerX) {
      this.onPlayerXWins();
    } else if (winner === this.playerO) {
      this.onPlayerOWins();
    }
    this.scoreboardService.save(this.scoreboard);
  }

  restartBoard() {
    this.board = [
      [{ value: '', hovered: false }, { value: '', hovered: false }, { value: '', hovered: false }],
      [{ value: '', hovered: false }, { value: '', hovered: false }, { value: '', hovered: false }],
      [{ value: '', hovered: false }, { value: '', hovered: false }, { value: '', hovered: false }]
    ];
  }

  onRestartMatchClicked() {
    this.restartScoreboard();
    this.scoreboardService.reset();
  }

  restartScoreboard() {
    this.scoreboard.playerXWins = 0;
    this.scoreboard.playerOWins = 0;
    this.scoreboard.draws = 0;
  }

  onPlayerXWins() {
    this.scoreboard.playerXWins++;
  }

  onPlayerOWins() {
    this.scoreboard.playerOWins++;
  }

  onDraw() {
    this.scoreboard.draws++;
  }

  onRestartGameClicked() {
    this.restartBoard();
    this.currentPlayer = this.playerX;
    this.gameOver = false;
    this.winner = null;
    this.isDraw = false;
  }
  onCellHovered(row: number, col: number) {
    if (this.board[row][col].value === '' && !this.gameOver) {
      this.board[row][col].hovered = true;
    }
  }

  onCellMouseLeave(row: number, col: number) {
    this.board[row][col].hovered = false;
  }

}
