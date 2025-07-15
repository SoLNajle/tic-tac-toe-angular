import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameBoard } from './game-board';

describe('GameBoard', () => {
  let component: GameBoard;
  let fixture: ComponentFixture<GameBoard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameBoard]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameBoard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should reset all cells to empty and not hovered', () => {
    // Fill the board with values and hovered true
    component.board = [
      [{ value: 'X', hovered: true }, { value: 'O', hovered: true }, { value: 'X', hovered: true }],
      [{ value: 'O', hovered: true }, { value: 'X', hovered: true }, { value: 'O', hovered: true }],
      [{ value: 'X', hovered: true }, { value: 'O', hovered: true }, { value: 'X', hovered: true }]
    ];

    component.restartBoard();

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        expect(component.board[row][col].value).toBe('');
        expect(component.board[row][col].hovered).toBeFalse();
      }
    }
  });

  it('should create a new board array instance', () => {
    const oldBoard = component.board;
    component.restartBoard();
    expect(component.board).not.toBe(oldBoard);
  });
});



