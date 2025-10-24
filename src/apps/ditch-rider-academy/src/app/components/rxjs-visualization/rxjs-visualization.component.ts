import { Component, OnInit, OnDestroy } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  Subject,
  BehaviorSubject,
  ReplaySubject,
  AsyncSubject,
  Observable,
  interval,
  fromEvent,
} from "rxjs";
import { takeUntil, map, filter, scan } from "rxjs/operators";
import * as anime from "animejs";

@Component({
  selector: "app-rxjs-visualization",
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="rxjs-container">
      <h1 class="page-title">RxJS Visualization - The Desert Data Streams</h1>

      <div class="visualization-section">
        <div class="concept-selector">
          <button
            *ngFor="let concept of concepts"
            class="concept-button"
            [class.active]="selectedConcept === concept.id"
            (click)="selectConcept(concept.id)"
          >
            {{ concept.name }}
          </button>
        </div>

        <div class="visualization-area" #visualizationArea>
          <!-- Observer Pattern Visualization -->
          <div *ngIf="selectedConcept === 'observer'" class="observer-demo">
            <div class="data-source" #dataSource>
              <div class="source-label">Data Source</div>
              <div class="data-particles" #dataParticles></div>
            </div>

            <div class="observers-container">
              <div
                *ngFor="let observer of observers; let i = index"
                class="observer"
                [attr.data-index]="i"
                #observerElement
              >
                <div class="observer-label">Observer {{ i + 1 }}</div>
                <div class="observer-data">{{ observer.data }}</div>
              </div>
            </div>
          </div>

          <!-- Subject vs BehaviorSubject Comparison -->
          <div *ngIf="selectedConcept === 'subject'" class="subject-comparison">
            <div class="comparison-container">
              <div class="subject-demo">
                <h3>Subject</h3>
                <div class="subject-data">{{ subjectData }}</div>
                <button (click)="emitToSubject()" class="emit-button">
                  Emit Data
                </button>
              </div>

              <div class="vs-divider">VS</div>

              <div class="behavior-subject-demo">
                <h3>BehaviorSubject</h3>
                <div class="behavior-subject-data">
                  {{ behaviorSubjectData }}
                </div>
                <button (click)="emitToBehaviorSubject()" class="emit-button">
                  Emit Data
                </button>
              </div>
            </div>
          </div>

          <!-- ReplaySubject Demo -->
          <div
            *ngIf="selectedConcept === 'replay-subject'"
            class="replay-subject-demo"
          >
            <div class="demo-container">
              <h3>ReplaySubject - The Memory Keeper</h3>
              <div class="replay-data">{{ replaySubjectData }}</div>
              <div class="button-group">
                <button (click)="emitToReplaySubject()" class="emit-button">
                  Emit Data
                </button>
                <button
                  (click)="subscribeToReplaySubject()"
                  class="subscribe-button"
                >
                  Subscribe (See Replay)
                </button>
              </div>
            </div>
          </div>

          <!-- AsyncSubject Demo -->
          <div
            *ngIf="selectedConcept === 'async-subject'"
            class="async-subject-demo"
          >
            <div class="demo-container">
              <h3>AsyncSubject - The Final Answer</h3>
              <div class="async-data">{{ asyncSubjectData }}</div>
              <div class="button-group">
                <button (click)="emitToAsyncSubject()" class="emit-button">
                  Emit Data
                </button>
                <button
                  (click)="completeAsyncSubject()"
                  class="complete-button"
                >
                  Complete (Get Final Value)
                </button>
              </div>
            </div>
          </div>

          <!-- Observable Demo -->
          <div *ngIf="selectedConcept === 'observable'" class="observable-demo">
            <div class="demo-container">
              <h3>Observable - The Data Stream</h3>
              <div class="observable-data">{{ observableData }}</div>
              <div class="button-group">
                <button (click)="createObservable()" class="emit-button">
                  Create Observable
                </button>
                <button
                  (click)="subscribeToObservable()"
                  class="subscribe-button"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <!-- Operators Visualization -->
          <div *ngIf="selectedConcept === 'operators'" class="operators-demo">
            <div class="operator-pipeline">
              <div
                class="pipeline-stage"
                *ngFor="let stage of pipelineStages; let i = index"
                [class.active]="stage.active"
                #pipelineStage
              >
                <div class="stage-label">{{ stage.name }}</div>
                <div class="stage-data">{{ stage.data }}</div>
              </div>
            </div>
            <button (click)="startPipeline()" class="start-pipeline-button">
              Start Data Flow
            </button>
          </div>
        </div>

        <div class="explanation-panel">
          <h3>{{ getCurrentConcept()?.title }}</h3>
          <p>{{ getCurrentConcept()?.explanation }}</p>
          <div class="code-example">
            <pre><code>{{ getCurrentConcept()?.codeExample }}</code></pre>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./rxjs-visualization.component.scss"],
})
export class RxjsVisualizationComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private subject = new Subject<string>();
  private behaviorSubject = new BehaviorSubject<string>("Initial Value");
  private replaySubject = new ReplaySubject<string>(3);
  private asyncSubject = new AsyncSubject<string>();

  selectedConcept = "observer";
  subjectData = "No data yet";
  behaviorSubjectData = "Initial Value";
  replaySubjectData = "No data yet";
  asyncSubjectData = "No data yet";
  observableData = "No data yet";

  observers = [
    { data: "Waiting..." },
    { data: "Waiting..." },
    { data: "Waiting..." },
  ];

  pipelineStages = [
    { name: "Source", data: "", active: false },
    { name: "Filter", data: "", active: false },
    { name: "Map", data: "", active: false },
    { name: "Scan", data: "", active: false },
  ];

  concepts = [
    {
      id: "observer",
      name: "Observer Pattern",
      title: "The Observer Pattern",
      explanation:
        "Observers watch for data changes and react automatically. Like desert scouts watching for water!",
      codeExample: `const observer = {
  next: (data) => console.log('Got data:', data),
  error: (err) => console.log('Error:', err),
  complete: () => console.log('Stream complete')
};`,
    },
    {
      id: "subject",
      name: "Subject vs BehaviorSubject",
      title: "Subject vs BehaviorSubject",
      explanation:
        "Subjects are like messengers - they only deliver new messages. BehaviorSubjects remember the last message and deliver it to new subscribers.",
      codeExample: `// Subject - no initial value
const subject = new Subject();

// BehaviorSubject - has initial value
const behaviorSubject = new BehaviorSubject('initial');`,
    },
    {
      id: "replay-subject",
      name: "ReplaySubject",
      title: "ReplaySubject - The Memory Keeper",
      explanation:
        "ReplaySubject remembers and replays the last N emissions to new subscribers. Like a desert trader who remembers all his deals!",
      codeExample: `const replaySubject = new ReplaySubject(3);
// Replays last 3 emissions to new subscribers`,
    },
    {
      id: "async-subject",
      name: "AsyncSubject",
      title: "AsyncSubject - The Final Answer",
      explanation:
        "AsyncSubject only emits the last value when the stream completes. Perfect for one-time operations like API calls!",
      codeExample: `const asyncSubject = new AsyncSubject();
// Only emits when complete() is called`,
    },
    {
      id: "observable",
      name: "Observable",
      title: "Observable - The Data Stream",
      explanation:
        "Observables are the foundation - they represent a stream of data over time. Like water flowing through a desert river!",
      codeExample: `const observable = new Observable(observer => {
  observer.next('Hello');
  observer.complete();
});`,
    },
    {
      id: "operators",
      name: "Operators",
      title: "RxJS Operators",
      explanation:
        "Operators transform data as it flows through the stream, like water flowing through different pipes in the desert.",
      codeExample: `source$
  .pipe(
    filter(x => x > 5),
    map(x => x * 2),
    scan((acc, curr) => acc + curr, 0)
  )`,
    },
  ];

  ngOnInit() {
    this.setupSubjectSubscriptions();
    this.animateInitialLoad();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectConcept(conceptId: string) {
    this.selectedConcept = conceptId;
    this.animateConceptChange();
  }

  private setupSubjectSubscriptions() {
    this.subject.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.subjectData = data;
    });

    this.behaviorSubject.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.behaviorSubjectData = data;
    });

    this.replaySubject.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.replaySubjectData = data;
    });

    this.asyncSubject.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.asyncSubjectData = data;
    });
  }

  emitToSubject() {
    const data = `Data ${Date.now()}`;
    this.subject.next(data);
    this.animateDataEmission();
  }

  emitToBehaviorSubject() {
    const data = `Data ${Date.now()}`;
    this.behaviorSubject.next(data);
    this.animateDataEmission();
  }

  emitToReplaySubject() {
    const data = `Replay Data ${Date.now()}`;
    this.replaySubject.next(data);
    this.animateDataEmission();
  }

  subscribeToReplaySubject() {
    // This will show the replay effect
    this.replaySubject.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.replaySubjectData = `Replayed: ${data}`;
      this.animateDataEmission();
    });
  }

  emitToAsyncSubject() {
    const data = `Async Data ${Date.now()}`;
    this.asyncSubject.next(data);
    this.animateDataEmission();
  }

  completeAsyncSubject() {
    this.asyncSubject.complete();
    this.animateDataEmission();
  }

  createObservable() {
    this.observableData = "Creating Observable...";
    this.animateDataEmission();
  }

  subscribeToObservable() {
    const observable = new Observable<string>((observer) => {
      observer.next("Hello from Observable!");
      observer.next("Second emission!");
      observer.complete();
    });

    observable.pipe(takeUntil(this.destroy$)).subscribe((data) => {
      this.observableData = data;
      this.animateDataEmission();
    });
  }

  startPipeline() {
    // Reset pipeline
    this.pipelineStages.forEach((stage) => {
      stage.data = "";
      stage.active = false;
    });

    // Simulate data flow through pipeline
    const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let index = 0;

    const interval$ = interval(500).pipe(takeUntil(this.destroy$));

    interval$.subscribe(() => {
      if (index < data.length) {
        this.processDataThroughPipeline(data[index]);
        index++;
      }
    });
  }

  private processDataThroughPipeline(value: string) {
    // Stage 1: Source
    this.pipelineStages[0].data = value;
    this.pipelineStages[0].active = true;
    this.animateStage(0);

    setTimeout(() => {
      // Stage 2: Filter (only even numbers)
      if (parseInt(value) % 2 === 0) {
        this.pipelineStages[1].data = value;
        this.pipelineStages[1].active = true;
        this.animateStage(1);

        setTimeout(() => {
          // Stage 3: Map (multiply by 2)
          const mappedValue = (parseInt(value) * 2).toString();
          this.pipelineStages[2].data = mappedValue;
          this.pipelineStages[2].active = true;
          this.animateStage(2);

          setTimeout(() => {
            // Stage 4: Scan (accumulate)
            const currentSum = this.pipelineStages[3].data
              ? parseInt(this.pipelineStages[3].data) + parseInt(mappedValue)
              : parseInt(mappedValue);
            this.pipelineStages[3].data = currentSum.toString();
            this.pipelineStages[3].active = true;
            this.animateStage(3);
          }, 500);
        }, 500);
      }
    }, 500);
  }

  private animateInitialLoad() {
    anime({
      targets: ".page-title",
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 1000,
      easing: "easeOutExpo",
    });

    anime({
      targets: ".concept-button",
      translateX: [-100, 0],
      opacity: [0, 1],
      delay: (el, i) => i * 100,
      duration: 800,
      easing: "easeOutExpo",
    });
  }

  private animateConceptChange() {
    anime({
      targets: ".visualization-area",
      scale: [0.8, 1],
      opacity: [0, 1],
      duration: 600,
      easing: "easeOutExpo",
    });
  }

  private animateDataEmission() {
    anime({
      targets: ".data-particles",
      scale: [1, 1.5, 1],
      duration: 300,
      easing: "easeOutQuad",
    });
  }

  private animateStage(stageIndex: number) {
    const stageElement = document.querySelector(`[data-stage="${stageIndex}"]`);
    if (stageElement) {
      anime({
        targets: stageElement,
        scale: [1, 1.1, 1],
        backgroundColor: ["#FFD700", "#FFA500", "#FFD700"],
        duration: 500,
        easing: "easeOutQuad",
      });
    }
  }

  getCurrentConcept() {
    return this.concepts.find((c) => c.id === this.selectedConcept);
  }
}
