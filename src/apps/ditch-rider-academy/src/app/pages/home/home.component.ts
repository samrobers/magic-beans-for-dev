import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface TutorialCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  tutorials: Tutorial[];
}

interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="home-container">
      <section class="welcome-section">
        <div class="water-animation">
          <div class="water-drop"></div>
          <div class="water-drop"></div>
          <div class="water-drop"></div>
        </div>
        <h2>Welcome to the Ditch Rider Academy</h2>
        <p>Learn Angular data storage and state management through interactive, animated tutorials</p>
      </section>

      <section class="categories-section">
        <h3>Choose Your Path</h3>
        <div class="categories-grid">
          <div *ngFor="let category of categories" class="category-card">
            <div class="category-icon">{{ category.icon }}</div>
            <h4>{{ category.name }}</h4>
            <p>{{ category.description }}</p>
            <div class="tutorial-count">{{ category.tutorials.length }} tutorials</div>
            <a [routerLink]="['/tutorials']" [queryParams]="{category: category.id}" class="explore-btn">
              Explore →
            </a>
          </div>
        </div>
      </section>

      <section class="features-section">
        <h3>What You'll Learn</h3>
        <div class="features-grid">
          <div class="feature">
            <span class="feature-icon">🌊</span>
            <h5>Data Flow Visualization</h5>
            <p>See how data flows through your Angular app with animated water metaphors</p>
          </div>
          <div class="feature">
            <span class="feature-icon">🎮</span>
            <h5>Interactive Demos</h5>
            <p>Drag, drop, and interact with components to understand state management</p>
          </div>
          <div class="feature">
            <span class="feature-icon">⚡</span>
            <h5>Real-World Patterns</h5>
            <p>Learn production-ready patterns used in enterprise Angular applications</p>
          </div>
          <div class="feature">
            <span class="feature-icon">💡</span>
            <h5>Best Practices</h5>
            <p>Avoid common pitfalls and master memory management</p>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .home-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    .welcome-section {
      text-align: center;
      padding: 3rem 0;
      position: relative;
      overflow: hidden;
    }

    .water-animation {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 200px;
      height: 200px;
      pointer-events: none;
    }

    .water-drop {
      position: absolute;
      width: 20px;
      height: 20px;
      background: #4A90E2;
      border-radius: 50%;
      opacity: 0.6;
      animation: drop 3s infinite;
    }

    .water-drop:nth-child(2) {
      left: 40px;
      animation-delay: 1s;
    }

    .water-drop:nth-child(3) {
      left: 80px;
      animation-delay: 2s;
    }

    @keyframes drop {
      0% {
        top: -20px;
        opacity: 0;
      }
      50% {
        opacity: 0.6;
      }
      100% {
        top: 200px;
        opacity: 0;
      }
    }

    .welcome-section h2 {
      font-size: 2.5rem;
      margin-bottom: 1rem;
      color: #4A90E2;
    }

    .welcome-section p {
      font-size: 1.2rem;
      color: #D4A574;
    }

    .categories-section,
    .features-section {
      margin: 4rem 0;
    }

    .categories-section h3,
    .features-section h3 {
      font-size: 2rem;
      text-align: center;
      margin-bottom: 2rem;
      color: #4A90E2;
    }

    .categories-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }

    .category-card {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 1rem;
      padding: 2rem;
      text-align: center;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 2px solid transparent;
    }

    .category-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
      border-color: #4A90E2;
    }

    .category-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .category-card h4 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: white;
    }

    .category-card p {
      color: rgba(255, 255, 255, 0.8);
      margin-bottom: 1rem;
    }

    .tutorial-count {
      color: #7ED321;
      font-weight: bold;
      margin-bottom: 1rem;
    }

    .explore-btn {
      display: inline-block;
      background: #4A90E2;
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: bold;
      transition: background 0.3s ease;
    }

    .explore-btn:hover {
      background: #357ABD;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
    }

    .feature {
      background: rgba(255, 255, 255, 0.05);
      padding: 2rem;
      border-radius: 1rem;
      text-align: center;
    }

    .feature-icon {
      font-size: 3rem;
      display: block;
      margin-bottom: 1rem;
    }

    .feature h5 {
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
      color: white;
    }

    .feature p {
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.9rem;
    }
  `]
})
export class HomeComponent {
  categories: TutorialCategory[] = [
    {
      id: 'observables',
      name: 'Observables & Subjects',
      icon: '🌊',
      description: 'Master RxJS streams and reactive programming',
      tutorials: [
        {
          id: 'observable-basics',
          title: 'Observable Basics',
          description: 'Learn the fundamentals of observables',
          difficulty: 'beginner',
          icon: '💧'
        },
        {
          id: 'behavior-subject',
          title: 'BehaviorSubject',
          description: 'State management with current value',
          difficulty: 'beginner',
          icon: '🏊'
        },
        {
          id: 'replay-subject',
          title: 'ReplaySubject',
          description: 'Replay past emissions',
          difficulty: 'intermediate',
          icon: '⏮️'
        }
      ]
    },
    {
      id: 'services',
      name: 'Services & DI',
      icon: '🏗️',
      description: 'Dependency injection and service patterns',
      tutorials: [
        {
          id: 'singleton-service',
          title: 'Singleton Services',
          description: 'App-wide shared services',
          difficulty: 'beginner',
          icon: '🌐'
        },
        {
          id: 'service-state',
          title: 'Service State Management',
          description: 'Managing state through services',
          difficulty: 'intermediate',
          icon: '📦'
        }
      ]
    },
    {
      id: 'signals',
      name: 'Signals (Angular 16+)',
      icon: '⚡',
      description: 'Modern reactive primitives',
      tutorials: [
        {
          id: 'writable-signals',
          title: 'Writable Signals',
          description: 'Direct state updates',
          difficulty: 'beginner',
          icon: '✍️'
        },
        {
          id: 'computed-signals',
          title: 'Computed Signals',
          description: 'Derived reactive values',
          difficulty: 'intermediate',
          icon: '🧮'
        }
      ]
    },
    {
      id: 'data-flow',
      name: 'Data Flow Patterns',
      icon: '🔄',
      description: 'Component communication strategies',
      tutorials: [
        {
          id: 'parent-child',
          title: 'Parent to Child',
          description: '@Input decorator patterns',
          difficulty: 'beginner',
          icon: '⬇️'
        },
        {
          id: 'child-parent',
          title: 'Child to Parent',
          description: '@Output and EventEmitter',
          difficulty: 'beginner',
          icon: '⬆️'
        }
      ]
    }
  ];
}
