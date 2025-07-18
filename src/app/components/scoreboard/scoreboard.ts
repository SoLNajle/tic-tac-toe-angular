import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-scoreboard',
  imports: [],
  templateUrl: './scoreboard.html',
  styleUrl: './scoreboard.css',
  standalone: true,
})
export class Scoreboard {
  @Input() playerXWins = 0;
  @Input() playerOWins = 0;
  @Input() draws = 0;
  @Output() restartMatchClicked = new EventEmitter<void>();

  onRestartMatchClicked() {
    this.restartMatchClicked.emit();
  }
}
