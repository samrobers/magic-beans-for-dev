import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Pipe, PipeTransform } from "@angular/core";
import * as anime from "animejs";

// Custom pipes for demonstration
@Pipe({
  name: "desertCurrency",
  standalone: true,
})
export class DesertCurrencyPipe implements PipeTransform {
  transform(value: number, currency: string = "Gold"): string {
    return `${value} ${currency} Nuggets`;
  }
}

@Pipe({
  name: "cactusCase",
  standalone: true,
})
export class CactusCasePipe implements PipeTransform {
  transform(value: string): string {
    return value.toLowerCase().replace(/\s+/g, "-");
  }
}

@Pipe({
  name: "waterFlow",
  standalone: true,
})
export class WaterFlowPipe implements PipeTransform {
  transform(value: number): string {
    const flow = Math.min(value, 100);
    return `💧 ${flow}% Water Flow`;
  }
}

@Component({
  selector: "app-pipeline-tutorial",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DesertCurrencyPipe,
    CactusCasePipe,
    WaterFlowPipe,
  ],
  template: `
    <div class="pipeline-container">
      <h1 class="page-title">Angular Pipes - The Desert Water System</h1>

      <div class="tutorial-section">
        <div class="pipe-demo">
          <h2>Built-in Pipes Demo</h2>
          <div class="demo-grid">
            <div
              class="demo-card"
              *ngFor="let demo of builtInPipes; let i = index"
              [attr.data-index]="i"
              #demoCard
            >
              <h3>{{ demo.name }}</h3>
              <div class="input-section">
                <label>Input:</label>
                <input
                  [(ngModel)]="demo.input"
                  class="demo-input"
                  (input)="animatePipe(demoCard)"
                />
              </div>
              <div class="output-section">
                <label>Output:</label>
                <div class="pipe-output">{{ demo.output }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="custom-pipes">
          <h2>Custom Desert Pipes</h2>
          <div class="custom-demo">
            <div class="custom-pipe-demo">
              <h3>Desert Currency Pipe</h3>
              <div class="demo-controls">
                <label>Amount:</label>
                <input
                  [(ngModel)]="currencyAmount"
                  type="number"
                  class="demo-input"
                />
                <label>Currency:</label>
                <select [(ngModel)]="currencyType" class="demo-select">
                  <option value="Gold">Gold</option>
                  <option value="Silver">Silver</option>
                  <option value="Copper">Copper</option>
                </select>
              </div>
              <div class="pipe-output">
                {{ currencyAmount | desertCurrency : currencyType }}
              </div>
            </div>

            <div class="custom-pipe-demo">
              <h3>Cactus Case Pipe</h3>
              <div class="demo-controls">
                <label>Text:</label>
                <input
                  [(ngModel)]="cactusText"
                  class="demo-input"
                  placeholder="Enter some text"
                />
              </div>
              <div class="pipe-output">
                {{ cactusText | cactusCase }}
              </div>
            </div>

            <div class="custom-pipe-demo">
              <h3>Water Flow Pipe</h3>
              <div class="demo-controls">
                <label>Flow Level:</label>
                <input
                  [(ngModel)]="waterLevel"
                  type="range"
                  min="0"
                  max="100"
                  class="water-slider"
                  (input)="animateWaterFlow()"
                />
                <span class="slider-value">{{ waterLevel }}%</span>
              </div>
              <div class="pipe-output water-flow-output">
                {{ waterLevel | waterFlow }}
              </div>
            </div>
          </div>
        </div>

        <div class="pipe-chaining">
          <h2>Pipe Chaining - The Desert Pipeline</h2>
          <div class="chaining-demo">
            <div class="data-flow">
              <div
                class="flow-stage"
                *ngFor="let stage of pipeChain; let i = index"
                [class.active]="stage.active"
                [attr.data-stage]="i"
                #flowStage
              >
                <div class="stage-name">{{ stage.name }}</div>
                <div class="stage-data">{{ stage.data }}</div>
                <div class="stage-pipe">{{ stage.pipe }}</div>
              </div>
            </div>
            <button (click)="demonstratePipeChaining()" class="demo-button">
              Start Pipeline Flow
            </button>
          </div>
        </div>

        <div class="interactive-builder">
          <h2>Interactive Pipe Builder</h2>
          <div class="builder-area">
            <div class="input-section">
              <label>Your Data:</label>
              <textarea
                [(ngModel)]="builderInput"
                class="builder-textarea"
                placeholder="Enter your data here..."
              ></textarea>
            </div>

            <div class="pipes-selector">
              <h4>Available Pipes:</h4>
              <div class="pipe-options">
                <button
                  *ngFor="let pipe of availablePipes"
                  class="pipe-option"
                  [class.selected]="selectedPipes.includes(pipe)"
                  (click)="togglePipe(pipe)"
                >
                  {{ pipe.name }}
                </button>
              </div>
            </div>

            <div class="output-section">
              <label>Result:</label>
              <div class="builder-output">{{ getBuilderOutput() }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./pipeline-tutorial.component.scss"],
})
export class PipelineTutorialComponent implements OnInit {
  // Built-in pipes demo data
  builtInPipes = [
    {
      name: "Uppercase",
      input: "hello desert",
      get output() {
        return this.input.toUpperCase();
      },
    },
    {
      name: "Lowercase",
      input: "HELLO DESERT",
      get output() {
        return this.input.toLowerCase();
      },
    },
    {
      name: "Date",
      input: new Date(),
      get output() {
        return this.input.toLocaleDateString();
      },
    },
    {
      name: "Currency",
      input: 123.45,
      get output() {
        return "$" + this.input.toFixed(2);
      },
    },
  ];

  // Custom pipe demo data
  currencyAmount = 100;
  currencyType = "Gold";
  cactusText = "Hello Desert World";
  waterLevel = 50;

  // Pipe chaining demo
  pipeChain = [
    { name: "Raw Data", data: "", pipe: "", active: false },
    { name: "Uppercase", data: "", pipe: "| uppercase", active: false },
    { name: "Slice", data: "", pipe: "| slice:0:10", active: false },
    { name: "Final Result", data: "", pipe: "", active: false },
  ];

  // Interactive builder
  builderInput = "Hello Desert Academy";
  selectedPipes: any[] = [];
  availablePipes = [
    { name: "Uppercase", pipe: "uppercase" },
    { name: "Lowercase", pipe: "lowercase" },
    { name: "Slice", pipe: "slice:0:10" },
    { name: "Cactus Case", pipe: "cactusCase" },
  ];

  ngOnInit() {
    this.animateInitialLoad();
  }

  animatePipe(cardElement: HTMLElement) {
    anime({
      targets: cardElement.querySelector(".pipe-output"),
      scale: [1, 1.1, 1],
      backgroundColor: ["#FFD700", "#FFA500", "#FFD700"],
      duration: 500,
      easing: "easeOutQuad",
    });
  }

  animateWaterFlow() {
    const waterElements = document.querySelectorAll(".water-flow-output");
    anime({
      targets: waterElements,
      scale: [1, 1.2, 1],
      duration: 300,
      easing: "easeOutQuad",
    });
  }

  demonstratePipeChaining() {
    const originalData = "Hello Desert Academy";
    let currentData = originalData;

    // Reset all stages
    this.pipeChain.forEach((stage) => {
      stage.data = "";
      stage.active = false;
    });

    // Animate through each stage
    this.pipeChain.forEach((stage, index) => {
      setTimeout(() => {
        stage.active = true;
        stage.data = currentData;

        // Apply transformation
        if (index === 1) {
          currentData = currentData.toUpperCase();
        } else if (index === 2) {
          currentData = currentData.slice(0, 10);
        }

        this.animateStage(index);
      }, index * 1000);
    });
  }

  private animateStage(stageIndex: number) {
    const stageElement = document.querySelector(`[data-stage="${stageIndex}"]`);
    if (stageElement) {
      anime({
        targets: stageElement,
        scale: [1, 1.1, 1],
        backgroundColor: [
          "rgba(255, 215, 0, 0.1)",
          "rgba(255, 215, 0, 0.3)",
          "rgba(255, 215, 0, 0.1)",
        ],
        duration: 800,
        easing: "easeOutQuad",
      });
    }
  }

  togglePipe(pipe: any) {
    const index = this.selectedPipes.indexOf(pipe);
    if (index > -1) {
      this.selectedPipes.splice(index, 1);
    } else {
      this.selectedPipes.push(pipe);
    }
  }

  getBuilderOutput(): string {
    let result = this.builderInput;

    this.selectedPipes.forEach((pipe) => {
      switch (pipe.pipe) {
        case "uppercase":
          result = result.toUpperCase();
          break;
        case "lowercase":
          result = result.toLowerCase();
          break;
        case "slice:0:10":
          result = result.slice(0, 10);
          break;
        case "cactusCase":
          result = result.toLowerCase().replace(/\s+/g, "-");
          break;
      }
    });

    return result;
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
      targets: ".demo-card",
      translateY: [50, 0],
      opacity: [0, 1],
      delay: (el, i) => 500 + i * 200,
      duration: 800,
      easing: "easeOutExpo",
    });
  }
}
