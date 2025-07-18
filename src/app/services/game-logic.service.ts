import { Injectable } from "@angular/core";
import { BoardModel } from '../models/board.model';

@Injectable({ providedIn: 'root' })
export class GameLogicService {
    checkWinner(board: BoardModel): string | null {
        // Check rows
        const WinnerByRow = this.checkWinnerByRow(board);
        if (WinnerByRow) {
            return WinnerByRow;
        }
        // Check columns
        const WinnerByColumn = this.checkWinnerByColumn(board);
        if (WinnerByColumn) {
            return WinnerByColumn;
        }
        // Check diagonals
        const WinnerByDiagonal = this.checkWinnerByDiagonal(board);
        if (WinnerByDiagonal) {
            return WinnerByDiagonal;
        }
        return null;
    }

    checkWinnerByRow(board: BoardModel): string | null {
        for (let i = 0; i < 3; i++) {
            if (board[i][0].value === board[i][1].value && board[i][1].value === board[i][2].value && board[i][0].value !== '') {
                return board[i][0].value;
            }
        }
        return null;
    }
    checkWinnerByColumn(board: BoardModel): string | null {
        for (let i = 0; i < 3; i++) {
            if (board[0][i].value === board[1][i].value && board[1][i].value === board[2][i].value && board[0][i].value !== '') {
                return board[0][i].value;
            }
        }
        return null;
    }
    checkWinnerByDiagonal(board: BoardModel): string | null {
        if (board[0][0].value === board[1][1].value && board[1][1].value === board[2][2].value && board[0][0].value !== '') {
            return board[0][0].value;
        }
        if (board[0][2].value === board[1][1].value && board[1][1].value === board[2][0].value && board[0][2].value !== '') {
            return board[0][2].value;
        }
        return null;
    }
}