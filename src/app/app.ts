import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameBoard } from './components/game-board/game-board';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GameBoard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('app-zero');
}
