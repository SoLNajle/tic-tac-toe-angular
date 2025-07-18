import { Injectable } from "@angular/core";
import { ScoreboardModel } from "../models/scoreboard.model";
const SCOREBOARD_KEY = 'tic-tac-toe-scoreboard';

@Injectable({ providedIn: 'root' })
export class ScoreboardService {
    load(): ScoreboardModel {
        const scoreboardJson = localStorage.getItem(SCOREBOARD_KEY);
        if (scoreboardJson) {
            try {
                return JSON.parse(scoreboardJson);
            } catch (error) {
                console.error("Failed to parse scoreboard JSON:", error);
                return { playerXWins: 0, playerOWins: 0, draws: 0 };
            }
        }
        return { playerXWins: 0, playerOWins: 0, draws: 0 };
    }

    save(scoreboard: ScoreboardModel): void {
        localStorage.setItem(SCOREBOARD_KEY, JSON.stringify(scoreboard));
    }

    reset(): void {
        localStorage.removeItem(SCOREBOARD_KEY);
    }
}