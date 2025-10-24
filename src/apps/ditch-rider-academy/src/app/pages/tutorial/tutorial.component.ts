import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import anime from 'animejs';
import { BehaviorSubject } from 'rxjs';

interface Subscriber {
  id: number;
  name: string;
  value: string | null;
  x: number;
  y: number;
}

@Component({
  selector: 'app-tutorial',
  standalone: true,
  imports: [CommonModule, RouterLink, DragDropModule],
  template: `
    <div class="tutorial-container">
      <header class="tutorial-header">
        <a routerLink="/" class="back-button">← Back to Home</a>
        <h2>{{ tutorialTitle }}</h2>
        <div class="difficulty-badge" [class]="'difficulty-' + difficulty">
          {{ difficulty }}
        </div>
      </header>

      <div class="tutorial-content">
        <!-- Concept Explanation -->
        <section class="concept-section">
          <h3>📚 What is a BehaviorSubject?</h3>
          <p>
            A <strong>BehaviorSubject</strong> is like a water reservoir that always has a current level.
            When new subscribers connect, they immediately receive the current water level (value),
            and then receive any new updates.
          </p>
          <div class="key-points">
            <div class="point">
              <span class="icon">💧</span>
              <span>Always has a current value</span>
            </div>
            <div class="point">
              <span class="icon">🔄</span>
              <span>New subscribers get the latest value immediately</span>
            </div>
            <div class="point">
              <span class="icon">📡</span>
              <span>Perfect for state management</span>
            </div>
          </div>
        </section>

        <!-- Interactive Demo -->
        <section class="demo-section">
          <h3>🎮 Interactive Demo</h3>
          <p>Drag subscribers to connect them to the BehaviorSubject. Watch how they receive the current value!</p>
          
          <div class="demo-canvas" #demoCanvas>
            <!-- BehaviorSubject (Reservoir) -->
            <div class="behavior-subject" #reservoir>
              <div class="reservoir-icon">🌊</div>
              <div class="reservoir-value">Current: {{ currentValue }}</div>
              <div class="water-level" [style.height.%]="waterLevel"></div>
            </div>

            <!-- Value Control -->
            <div class="value-control">
              <label>Update Value:</label>
              <input 
                type="range" 
                min="0" 
                max="100" 
                [(ngModel)]="sliderValue"
                (input)="updateValue($event)"
                class="value-slider"
              >
              <span class="value-display">{{ sliderValue }}</span>
            </div>

            <!-- Subscribers Drop Zone -->
            <div class="subscribers-area">
              <h4>Subscribers</h4>
              <div 
                cdkDropList
                [cdkDropListData]="subscribers"
                (cdkDropListDropped)="onDrop($event)"
                class="subscriber-list"
              >
                <div 
                  *ngFor="let subscriber of subscribers"
                  cdkDrag
                  class="subscriber"
                  [class.subscribed]="subscriber.value !== null"
                >
                  <div class="subscriber-icon">👤</div>
                  <div class="subscriber-name">{{ subscriber.name }}</div>
                  <div class="subscriber-value" *ngIf="subscriber.value !== null">
                    Value: {{ subscriber.value }}
                  </div>
                  <div class="subscriber-status" *ngIf="subscriber.value === null">
                    Drag to subscribe
                  </div>
                </div>
              </div>
              <button (click)="addSubscriber()" class="add-subscriber-btn">
                + Add Subscriber
              </button>
            </div>

            <!-- Connection Lines (SVG) -->
            <svg class="connections-svg" #connectionsSvg>
              <line 
                *ngFor="let sub of activeSubscribers"
                [attr.x1]="200"
                [attr.y1]="150"
                [attr.x2]="sub.x"
                [attr.y2]="sub.y"
                class="connection-line"
                [attr.id]="'line-' + sub.id"
              />
            </svg>
          </div>

          <!-- Controls -->
          <div class="demo-controls">
            <button (click)="animateFlow()" class="control-btn primary">
              ▶️ Animate Data Flow
            </button>
            <button (click)="reset()" class="control-btn">
              🔄 Reset
            </button>
          </div>
        </section>

        <!-- Code Example -->
        <section class="code-section">
          <h3>💻 Code Example</h3>
          <pre><code>{{ codeExample }}</code></pre>
        </section>

        <!-- Best Practices -->
        <section class="best-practices-section">
          <h3>✨ Best Practices</h3>
          <ul>
            <li>✅ Always provide an initial value to BehaviorSubject</li>
            <li>✅ Use for state that needs to be accessed synchronously</li>
            <li>✅ Unsubscribe in ngOnDestroy to prevent memory leaks</li>
            <li>❌ Don't use for event streams (use Subject instead)</li>
            <li>❌ Avoid exposing the Subject directly (use asObservable())</li>
          </ul>
        </section>
      </div>
    </div>
  `,
  styles: [`
    .tutorial-container {
      padding: 2rem;
      max-width: 1400px;
      margin: 0 auto;
    }

    .tutorial-header {
      display: flex;
      align-items: center;
      gap: 2rem;
      margin-bottom: 2rem;
      padding-bottom: 1rem;
      border-bottom: 2px solid rgba(74, 144, 226, 0.3);
    }

    .back-button {
      color: #4A90E2;
      text-decoration: none;
      font-weight: bold;
      transition: color 0.3s;
    }

    .back-button:hover {
      color: #7ED321;
    }

    .tutorial-header h2 {
      flex: 1;
      margin: 0;
      color: white;
      font-size: 2rem;
    }

    .difficulty-badge {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.8rem;
    }

    .difficulty-beginner {
      background: #7ED321;
      color: white;
    }

    .tutorial-content section {
      background: rgba(255, 255, 255, 0.05);
      padding: 2rem;
      border-radius: 1rem;
      margin-bottom: 2rem;
    }

    .tutorial-content h3 {
      color: #4A90E2;
      margin-top: 0;
      font-size: 1.5rem;
    }

    .key-points {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1rem;
    }

    .point {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 0.5rem;
    }

    .point .icon {
      font-size: 1.5rem;
    }

    .demo-canvas {
      position: relative;
      min-height: 500px;
      background: rgba(44, 62, 80, 0.5);
      border-radius: 1rem;
      padding: 2rem;
      margin: 2rem 0;
    }

    .behavior-subject {
      position: absolute;
      left: 50px;
      top: 50px;
      width: 200px;
      height: 200px;
      background: linear-gradient(135deg, #4A90E2 0%, #357ABD 100%);
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 0 10px 30px rgba(74, 144, 226, 0.5);
      overflow: hidden;
      position: relative;
    }

    .water-level {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(126, 211, 33, 0.3);
      transition: height 0.5s ease;
    }

    .reservoir-icon {
      font-size: 3rem;
      z-index: 1;
    }

    .reservoir-value {
      color: white;
      font-weight: bold;
      z-index: 1;
      margin-top: 1rem;
    }

    .value-control {
      position: absolute;
      left: 50px;
      top: 280px;
      display: flex;
      align-items: center;
      gap: 1rem;
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 0.5rem;
    }

    .value-slider {
      width: 150px;
    }

    .value-display {
      font-weight: bold;
      color: #7ED321;
      min-width: 40px;
    }

    .subscribers-area {
      position: absolute;
      right: 50px;
      top: 50px;
      width: 300px;
    }

    .subscribers-area h4 {
      color: white;
      margin-top: 0;
    }

    .subscriber-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      min-height: 200px;
    }

    .subscriber {
      background: rgba(255, 255, 255, 0.1);
      padding: 1rem;
      border-radius: 0.5rem;
      cursor: move;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }

    .subscriber:hover {
      background: rgba(255, 255, 255, 0.15);
      border-color: #4A90E2;
    }

    .subscriber.subscribed {
      background: rgba(126, 211, 33, 0.2);
      border-color: #7ED321;
    }

    .subscriber-icon {
      font-size: 2rem;
      text-align: center;
    }

    .subscriber-name {
      font-weight: bold;
      color: white;
      text-align: center;
    }

    .subscriber-value {
      color: #7ED321;
      text-align: center;
      font-size: 0.9rem;
    }

    .subscriber-status {
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
      font-size: 0.8rem;
    }

    .add-subscriber-btn {
      width: 100%;
      padding: 0.75rem;
      background: #4A90E2;
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
      font-weight: bold;
      margin-top: 1rem;
      transition: background 0.3s;
    }

    .add-subscriber-btn:hover {
      background: #357ABD;
    }

    .connections-svg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
    }

    .connection-line {
      stroke: #7ED321;
      stroke-width: 3;
      stroke-dasharray: 10, 5;
      opacity: 0.6;
    }

    .demo-controls {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }

    .control-btn {
      padding: 1rem 2rem;
      border: none;
      border-radius: 0.5rem;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
      background: rgba(255, 255, 255, 0.1);
      color: white;
    }

    .control-btn.primary {
      background: #7ED321;
    }

    .control-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    }

    .code-section pre {
      background: #1e1e1e;
      padding: 1.5rem;
      border-radius: 0.5rem;
      overflow-x: auto;
      color: #d4d4d4;
    }

    .best-practices-section ul {
      list-style: none;
      padding: 0;
    }

    .best-practices-section li {
      padding: 0.75rem;
      margin: 0.5rem 0;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 0.5rem;
    }
  `]
})
export class TutorialComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('demoCanvas') demoCanvas!: ElementRef;
  @ViewChild('reservoir') reservoir!: ElementRef;
  @ViewChild('connectionsSvg') connectionsSvg!: ElementRef;

  tutorialTitle = 'BehaviorSubject - State with Memory';
  difficulty = 'beginner';
  
  currentValue = 50;
  sliderValue = 50;
  waterLevel = 50;
  
  subscribers: Subscriber[] = [
    { id: 1, name: 'Subscriber 1', value: null, x: 0, y: 0 },
    { id: 2, name: 'Subscriber 2', value: null, x: 0, y: 0 },
  ];
  
  nextSubscriberId = 3;
  
  private behaviorSubject$ = new BehaviorSubject<number>(50);

  codeExample = `import { BehaviorSubject } from 'rxjs';

// Create BehaviorSubject with initial value
const waterLevel$ = new BehaviorSubject<number>(50);

// Subscribe - immediately receives current value (50)
waterLevel$.subscribe(level => {
  console.log('Water level:', level);
});
// Output: Water level: 50

// Update the value
waterLevel$.next(75);
// All subscribers receive: Water level: 75

// New subscriber gets latest value immediately
waterLevel$.subscribe(level => {
  console.log('New subscriber sees:', level);
});
// Output: New subscriber sees: 75`;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const tutorialId = this.route.snapshot.paramMap.get('id');
    // Load tutorial data based on ID
  }

  ngAfterViewInit() {
    // Initial animation
    this.animateWaterFill();
  }

  ngOnDestroy() {
    // Cleanup
    this.behaviorSubject$.complete();
  }

  get activeSubscribers() {
    return this.subscribers.filter(s => s.value !== null);
  }

  updateValue(event: any) {
    this.currentValue = parseInt(event.target.value);
    this.waterLevel = this.currentValue;
    this.behaviorSubject$.next(this.currentValue);
    
    // Update all subscribed subscribers
    this.subscribers.forEach(sub => {
      if (sub.value !== null) {
        sub.value = this.currentValue.toString();
        this.animatePulse(sub.id);
      }
    });
  }

  addSubscriber() {
    this.subscribers.push({
      id: this.nextSubscriberId++,
      name: `Subscriber ${this.nextSubscriberId - 1}`,
      value: null,
      x: 0,
      y: 0
    });
  }

  onDrop(event: CdkDragDrop<Subscriber[]>) {
    const subscriber = this.subscribers[event.previousIndex];
    if (subscriber && subscriber.value === null) {
      // Subscribe and get current value
      subscriber.value = this.currentValue.toString();
      this.animateConnection(subscriber.id);
    }
  }

  animateFlow() {
    // Animate data particles flowing from reservoir to subscribers
    this.activeSubscribers.forEach((sub, index) => {
      setTimeout(() => {
        this.animateDataParticle(sub.id);
      }, index * 200);
    });
  }

  animateWaterFill() {
    anime({
      targets: '.water-level',
      height: ['0%', `${this.waterLevel}%`],
      easing: 'easeInOutQuad',
      duration: 1500
    });
  }

  animateConnection(subscriberId: number) {
    const line = document.getElementById(`line-${subscriberId}`);
    if (line) {
      anime({
        targets: line,
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 1000
      });
    }
  }

  animatePulse(subscriberId: number) {
    const subscriber = document.querySelector(`.subscriber:nth-child(${subscriberId})`);
    if (subscriber) {
      anime({
        targets: subscriber,
        scale: [1, 1.1, 1],
        duration: 500,
        easing: 'easeInOutQuad'
      });
    }
  }

  animateDataParticle(subscriberId: number) {
    // Create temporary particle element
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: 20px;
      height: 20px;
      background: #7ED321;
      border-radius: 50%;
      left: 150px;
      top: 150px;
      pointer-events: none;
      z-index: 10;
    `;
    this.demoCanvas.nativeElement.appendChild(particle);

    // Find subscriber position
    const sub = this.subscribers.find(s => s.id === subscriberId);
    if (!sub) return;

    anime({
      targets: particle,
      translateX: sub.x - 150,
      translateY: sub.y - 150,
      opacity: [1, 0],
      scale: [1, 0.5],
      easing: 'easeInOutQuad',
      duration: 1000,
      complete: () => {
        particle.remove();
      }
    });
  }

  reset() {
    this.sliderValue = 50;
    this.currentValue = 50;
    this.waterLevel = 50;
    this.subscribers = this.subscribers.map(sub => ({
      ...sub,
      value: null
    }));
    this.behaviorSubject$.next(50);
    this.animateWaterFill();
  }
}
