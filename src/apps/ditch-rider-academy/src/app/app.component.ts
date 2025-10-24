import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: `
    <div class="ditch-rider-academy">
      <header class="academy-header">
        <h1>🌊 Ditch Rider Academy</h1>
        <p>Master Angular Data Flow - The Western Way</p>
      </header>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .ditch-rider-academy {
      min-height: 100vh;
      background: linear-gradient(135deg, #2C3E50 0%, #34495E 100%);
      color: white;
      padding: 2rem;
    }

    .academy-header {
      text-align: center;
      margin-bottom: 3rem;
      padding: 2rem;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      backdrop-filter: blur(10px);
    }

    .academy-header h1 {
      font-size: 3rem;
      margin: 0 0 1rem 0;
      color: #4A90E2;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
    }

    .academy-header p {
      font-size: 1.5rem;
      color: #D4A574;
      margin: 0;
    }
  `],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent {
  title = 'ditch-rider-academy';
}
