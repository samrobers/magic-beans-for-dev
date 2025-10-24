import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

interface Tutorial {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  icon: string;
  estimatedTime: string;
}

@Component({
  selector: 'app-tutorials-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="tutorials-list-container">
      <header>
        <a routerLink="/" class="back-button">← Back to Home</a>
        <h2>All Tutorials</h2>
      </header>

      <div class="filters">
        <button 
          *ngFor="let cat of categories"
          (click)="filterByCategory(cat.id)"
          [class.active]="selectedCategory === cat.id"
          class="filter-btn"
        >
          {{ cat.icon }} {{ cat.name }}
        </button>
      </div>

      <div class="tutorials-grid">
        <div *ngFor="let tutorial of filteredTutorials" class="tutorial-card">
          <div class="tutorial-icon">{{ tutorial.icon }}</div>
          <div class="tutorial-content">
            <h3>{{ tutorial.title }}</h3>
            <p>{{ tutorial.description }}</p>
            <div class="tutorial-meta">
              <span class="difficulty" [class]="'difficulty-' + tutorial.difficulty">
                {{ tutorial.difficulty }}
              </span>
              <span class="time">⏱️ {{ tutorial.estimatedTime }}</span>
            </div>
            <a [routerLink]="['/tutorial', tutorial.id]" class="start-btn">
              Start Tutorial →
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tutorials-list-container {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .back-button {
      color: #4A90E2;
      text-decoration: none;
      font-weight: bold;
    }

    header h2 {
      color: white;
      font-size: 2rem;
      margin: 0;
    }

    .filters {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 0.75rem 1.5rem;
      background: rgba(255, 255, 255, 0.1);
      border: 2px solid transparent;
      border-radius: 0.5rem;
      color: white;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s;
    }

    .filter-btn:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    .filter-btn.active {
      background: #4A90E2;
      border-color: #4A90E2;
    }

    .tutorials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
    }

    .tutorial-card {
      background: rgba(255, 255, 255, 0.05);
      border-radius: 1rem;
      padding: 2rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: 2px solid transparent;
    }

    .tutorial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 30px rgba(74, 144, 226, 0.3);
      border-color: #4A90E2;
    }

    .tutorial-icon {
      font-size: 3rem;
      text-align: center;
      margin-bottom: 1rem;
    }

    .tutorial-content h3 {
      color: white;
      margin: 0 0 0.5rem 0;
    }

    .tutorial-content p {
      color: rgba(255, 255, 255, 0.7);
      margin-bottom: 1rem;
    }

    .tutorial-meta {
      display: flex;
      gap: 1rem;
      align-items: center;
      margin-bottom: 1rem;
    }

    .difficulty {
      padding: 0.25rem 0.75rem;
      border-radius: 0.25rem;
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
    }

    .difficulty-beginner {
      background: #7ED321;
      color: white;
    }

    .difficulty-intermediate {
      background: #F5A623;
      color: white;
    }

    .difficulty-advanced {
      background: #D0021B;
      color: white;
    }

    .time {
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9rem;
    }

    .start-btn {
      display: inline-block;
      background: #4A90E2;
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 0.5rem;
      text-decoration: none;
      font-weight: bold;
      transition: background 0.3s;
    }

    .start-btn:hover {
      background: #357ABD;
    }
  `]
})
export class TutorialsListComponent implements OnInit {
  selectedCategory: string = 'all';
  
  categories = [
    { id: 'all', name: 'All', icon: '📚' },
    { id: 'observables', name: 'Observables', icon: '🌊' },
    { id: 'services', name: 'Services', icon: '🏗️' },
    { id: 'signals', name: 'Signals', icon: '⚡' },
    { id: 'data-flow', name: 'Data Flow', icon: '🔄' },
  ];

  allTutorials: Tutorial[] = [
    {
      id: 'behavior-subject',
      title: 'BehaviorSubject',
      description: 'State management with current value - Perfect for application state',
      difficulty: 'beginner',
      category: 'observables',
      icon: '🏊',
      estimatedTime: '15 min'
    },
    {
      id: 'observable-basics',
      title: 'Observable Basics',
      description: 'Learn the fundamentals of reactive streams',
      difficulty: 'beginner',
      category: 'observables',
      icon: '💧',
      estimatedTime: '20 min'
    },
    {
      id: 'replay-subject',
      title: 'ReplaySubject',
      description: 'Replay past emissions to new subscribers',
      difficulty: 'intermediate',
      category: 'observables',
      icon: '⏮️',
      estimatedTime: '18 min'
    },
    {
      id: 'singleton-service',
      title: 'Singleton Services',
      description: 'App-wide shared services and dependency injection',
      difficulty: 'beginner',
      category: 'services',
      icon: '🌐',
      estimatedTime: '12 min'
    },
    {
      id: 'writable-signals',
      title: 'Writable Signals',
      description: 'Modern reactive primitives for direct state updates',
      difficulty: 'beginner',
      category: 'signals',
      icon: '✍️',
      estimatedTime: '15 min'
    },
    {
      id: 'computed-signals',
      title: 'Computed Signals',
      description: 'Derived reactive values that auto-update',
      difficulty: 'intermediate',
      category: 'signals',
      icon: '🧮',
      estimatedTime: '20 min'
    },
    {
      id: 'parent-child-flow',
      title: 'Parent to Child Communication',
      description: 'Data flow patterns using @Input decorator',
      difficulty: 'beginner',
      category: 'data-flow',
      icon: '⬇️',
      estimatedTime: '10 min'
    },
    {
      id: 'child-parent-flow',
      title: 'Child to Parent Communication',
      description: 'Event emission using @Output and EventEmitter',
      difficulty: 'beginner',
      category: 'data-flow',
      icon: '⬆️',
      estimatedTime: '12 min'
    }
  ];

  filteredTutorials: Tutorial[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Check for category query param
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.selectedCategory = category;
      }
      this.filterTutorials();
    });
  }

  filterByCategory(categoryId: string) {
    this.selectedCategory = categoryId;
    this.filterTutorials();
  }

  filterTutorials() {
    if (this.selectedCategory === 'all') {
      this.filteredTutorials = this.allTutorials;
    } else {
      this.filteredTutorials = this.allTutorials.filter(
        t => t.category === this.selectedCategory
      );
    }
  }
}
