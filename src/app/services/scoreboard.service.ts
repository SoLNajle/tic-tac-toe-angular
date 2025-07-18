import { Injectable } from "@angular/core";
import { Scoreboard } from "../models/scoreboard.model";
const SCOREBOARD_KEY = 'tic-tac-toe-scoreboard';

@Injectable({ providedIn: 'root' })
export class ScoreboardService {
    load(): Scoreboard {
        const scoreboardJson = localStorage.getItem(SCOREBOARD_KEY);
        if (scoreboardJson) {
            return JSON.parse(scoreboardJson);
        }
        return { playerXWins: 0, playerOWins: 0, draws: 0 };
    }

    save(scoreboard: Scoreboard): void {
        localStorage.setItem(SCOREBOARD_KEY, JSON.stringify(scoreboard));
    }

    reset(): void {
        localStorage.removeItem(SCOREBOARD_KEY);
    }
}