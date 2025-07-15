import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-cell',
  standalone: true,
  imports: [],
  templateUrl: './cell.html',
  styleUrl: './cell.css',
})
export class Cell {
  @Input() value: string = "O"; // Now it can receive data from parent
  @Input() gameOver: boolean = false;
  @Output() CellClicked = new EventEmitter<void>(); // or EventEmitter<{row: number, col: number}>()


  onClick() {
    this.CellClicked.emit();
    
  }
}
