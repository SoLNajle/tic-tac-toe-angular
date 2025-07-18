// src/app/services/confetti.service.ts
import { Injectable } from '@angular/core';
import confetti from 'canvas-confetti';

@Injectable({
  providedIn: 'root'
})
export class ConfettiService {
    triggerConfetti() {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    
      triggerPlayerConfetti(player: string) {
        const colors = player === 'X' ? ['#ff6b6b', '#ff8e8e'] : ['#4ecdc4', '#44a08d'];
        
        confetti({
          particleCount: 100,
          spread: 100,
          origin: { y: 0.6 },
          colors: colors
        });
      }
    
}