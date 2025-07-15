import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cell.html',
  styleUrl: './cell.css',
})
export class Cell {
  @Input() value: string = "O"; // Now it can receive data from parent
  @Input() gameOver: boolean = false;
  @Input() hovered: boolean = false;
  @Input() currentPlayer: string = 'X'; // Default value, can be overridden by parent
  @Output() CellClicked = new EventEmitter<void>(); // or EventEmitter<{row: number, col: number}>()
  @Output() CellHovered = new EventEmitter<void>();
  @Output() CellMouseLeave = new EventEmitter<void>();

  onClick() {
    this.CellClicked.emit();
  }
  onHover() {
    this.CellHovered.emit();
  }
  onMouseLeave() {
    this.CellMouseLeave.emit();
  }
}
