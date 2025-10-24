import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import * as anime from "animejs";

interface DragItem {
  id: string;
  name: string;
  type: "source" | "operator" | "output";
  icon: string;
  description: string;
  x: number;
  y: number;
  isDragging: boolean;
}

interface Connection {
  from: string;
  to: string;
  id: string;
}

@Component({
  selector: "app-drag-drop-builder",
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="builder-container">
      <h1 class="page-title">Drag & Drop Pipeline Builder</h1>

      <div class="builder-workspace">
        <div class="toolbox">
          <h3>Pipeline Components</h3>
          <div class="component-categories">
            <div class="category">
              <h4>Data Sources</h4>
              <div class="component-list">
                <div
                  *ngFor="let source of dataSources"
                  class="component-item source"
                  draggable="true"
                  (dragstart)="onDragStart($event, source)"
                  (dragend)="onDragEnd($event)"
                >
                  <span class="component-icon">{{ source.icon }}</span>
                  <span class="component-name">{{ source.name }}</span>
                </div>
              </div>
            </div>

            <div class="category">
              <h4>Operators</h4>
              <div class="component-list">
                <div
                  *ngFor="let operator of operators"
                  class="component-item operator"
                  draggable="true"
                  (dragstart)="onDragStart($event, operator)"
                  (dragend)="onDragEnd($event)"
                >
                  <span class="component-icon">{{ operator.icon }}</span>
                  <span class="component-name">{{ operator.name }}</span>
                </div>
              </div>
            </div>

            <div class="category">
              <h4>Outputs</h4>
              <div class="component-list">
                <div
                  *ngFor="let output of outputs"
                  class="component-item output"
                  draggable="true"
                  (dragstart)="onDragStart($event, output)"
                  (dragend)="onDragEnd($event)"
                >
                  <span class="component-icon">{{ output.icon }}</span>
                  <span class="component-name">{{ output.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="canvas-area"
          #canvasArea
          (dragover)="onDragOver($event)"
          (drop)="onDrop($event)"
          (dragenter)="onDragEnter($event)"
          (dragleave)="onDragLeave($event)"
        >
          <div class="canvas-header">
            <h3>Pipeline Canvas</h3>
            <div class="canvas-controls">
              <button (click)="clearCanvas()" class="control-button clear">
                🗑️ Clear All
              </button>
              <button (click)="runPipeline()" class="control-button run">
                ▶️ Run Pipeline
              </button>
              <button (click)="savePipeline()" class="control-button save">
                💾 Save Pipeline
              </button>
            </div>
          </div>

          <div class="canvas-content">
            <div
              *ngFor="let item of canvasItems"
              class="canvas-item"
              [class.dragging]="item.isDragging"
              [style.left.px]="item.x"
              [style.top.px]="item.y"
              [attr.data-type]="item.type"
              draggable="true"
              (dragstart)="onCanvasItemDragStart($event, item)"
              (dragend)="onCanvasItemDragEnd($event, item)"
              (mousedown)="onCanvasItemMouseDown($event, item)"
              (mousemove)="onCanvasItemMouseMove($event, item)"
              (mouseup)="onCanvasItemMouseUp($event, item)"
            >
              <div class="item-header">
                <span class="item-icon">{{ item.icon }}</span>
                <span class="item-name">{{ item.name }}</span>
                <button class="delete-button" (click)="removeCanvasItem(item)">
                  ×
                </button>
              </div>

              <div class="item-content">
                <div
                  class="input-port"
                  (click)="startConnection(item, 'input')"
                  [class.connecting]="
                    connectionMode && connectionFrom === item.id
                  "
                >
                  ●
                </div>
                <div class="item-description">{{ item.description }}</div>
                <div
                  class="output-port"
                  (click)="startConnection(item, 'output')"
                  [class.connecting]="
                    connectionMode && connectionFrom === item.id
                  "
                >
                  ●
                </div>
              </div>
            </div>

            <!-- Connection lines -->
            <svg class="connections-svg" #connectionsSvg>
              <line
                *ngFor="let connection of connections"
                [attr.x1]="getConnectionX(connection.from, 'output')"
                [attr.y1]="getConnectionY(connection.from, 'output')"
                [attr.x2]="getConnectionX(connection.to, 'input')"
                [attr.y2]="getConnectionY(connection.to, 'input')"
                class="connection-line"
                [class.active]="isConnectionActive(connection)"
              ></line>
            </svg>
          </div>
        </div>

        <div class="properties-panel">
          <h3>Properties</h3>
          <div *ngIf="selectedItem" class="item-properties">
            <h4>{{ selectedItem.name }}</h4>
            <div class="property-group">
              <label>X Position:</label>
              <input
                type="number"
                [(ngModel)]="selectedItem.x"
                class="property-input"
              />
            </div>
            <div class="property-group">
              <label>Y Position:</label>
              <input
                type="number"
                [(ngModel)]="selectedItem.y"
                class="property-input"
              />
            </div>
            <div class="property-group">
              <label>Description:</label>
              <textarea
                [(ngModel)]="selectedItem.description"
                class="property-textarea"
              ></textarea>
            </div>
          </div>

          <div *ngIf="!selectedItem" class="no-selection">
            <p>Select an item to edit its properties</p>
          </div>
        </div>
      </div>

      <div class="pipeline-output">
        <h3>Pipeline Output</h3>
        <div class="output-display">
          <pre>{{ pipelineOutput }}</pre>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./drag-drop-builder.component.scss"],
})
export class DragDropBuilderComponent implements OnInit {
  @ViewChild("canvasArea") canvasArea!: ElementRef;
  @ViewChild("connectionsSvg") connectionsSvg!: ElementRef;

  selectedItem: DragItem | null = null;
  canvasItems: DragItem[] = [];
  connections: Connection[] = [];
  connectionMode = false;
  connectionFrom: string | null = null;
  pipelineOutput = "No pipeline output yet...";

  dataSources = [
    {
      id: "array",
      name: "Array Source",
      icon: "📊",
      description: "Generate data from array",
    },
    {
      id: "interval",
      name: "Interval Source",
      icon: "⏰",
      description: "Generate data at intervals",
    },
    {
      id: "user-input",
      name: "User Input",
      icon: "👤",
      description: "Data from user input",
    },
  ];

  operators = [
    {
      id: "filter",
      name: "Filter",
      icon: "🔍",
      description: "Filter data based on condition",
    },
    {
      id: "map",
      name: "Map",
      icon: "🔄",
      description: "Transform each data item",
    },
    {
      id: "scan",
      name: "Scan",
      icon: "📈",
      description: "Accumulate values over time",
    },
    {
      id: "debounce",
      name: "Debounce",
      icon: "⏱️",
      description: "Delay emission until quiet period",
    },
  ];

  outputs = [
    {
      id: "console",
      name: "Console Log",
      icon: "🖥️",
      description: "Output to console",
    },
    {
      id: "display",
      name: "Display",
      icon: "📺",
      description: "Show on screen",
    },
    {
      id: "storage",
      name: "Storage",
      icon: "💾",
      description: "Save to storage",
    },
  ];

  ngOnInit() {
    this.animateInitialLoad();
  }

  onDragStart(event: DragEvent, item: any) {
    if (event.dataTransfer) {
      event.dataTransfer.setData("text/plain", JSON.stringify(item));
      event.dataTransfer.effectAllowed = "copy";
    }
  }

  onDragEnd(event: DragEvent) {
    // Clean up any drag effects
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.dataTransfer!.dropEffect = "copy";
  }

  onDragEnter(event: DragEvent) {
    event.preventDefault();
    this.canvasArea.nativeElement.classList.add("drag-over");
  }

  onDragLeave(event: DragEvent) {
    this.canvasArea.nativeElement.classList.remove("drag-over");
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.canvasArea.nativeElement.classList.remove("drag-over");

    const data = event.dataTransfer!.getData("text/plain");
    const item = JSON.parse(data);

    const rect = this.canvasArea.nativeElement.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    this.addCanvasItem(item, x, y);
  }

  addCanvasItem(item: any, x: number, y: number) {
    const canvasItem: DragItem = {
      id: `${item.id}-${Date.now()}`,
      name: item.name,
      type: this.getItemType(item),
      icon: item.icon,
      description: item.description,
      x: x - 50, // Center the item
      y: y - 25,
      isDragging: false,
    };

    this.canvasItems.push(canvasItem);
    this.animateItemAppearance(canvasItem);
  }

  private getItemType(item: any): "source" | "operator" | "output" {
    if (this.dataSources.includes(item)) return "source";
    if (this.outputs.includes(item)) return "output";
    return "operator";
  }

  onCanvasItemDragStart(event: DragEvent, item: DragItem) {
    item.isDragging = true;
    if (event.dataTransfer) {
      event.dataTransfer.setData("text/plain", JSON.stringify(item));
    }
  }

  onCanvasItemDragEnd(event: DragEvent, item: DragItem) {
    item.isDragging = false;
  }

  onCanvasItemMouseDown(event: MouseEvent, item: DragItem) {
    this.selectedItem = item;
    event.preventDefault();
  }

  onCanvasItemMouseMove(event: MouseEvent, item: DragItem) {
    if (event.buttons === 1 && this.selectedItem === item) {
      const rect = this.canvasArea.nativeElement.getBoundingClientRect();
      item.x = event.clientX - rect.left - 50;
      item.y = event.clientY - rect.top - 25;
      this.updateConnections();
    }
  }

  onCanvasItemMouseUp(event: MouseEvent, item: DragItem) {
    // Handle mouse up
  }

  startConnection(item: DragItem, port: "input" | "output") {
    if (!this.connectionMode) {
      this.connectionMode = true;
      this.connectionFrom = item.id;
    } else {
      if (this.connectionFrom !== item.id) {
        this.createConnection(this.connectionFrom!, item.id);
      }
      this.connectionMode = false;
      this.connectionFrom = null;
    }
  }

  createConnection(fromId: string, toId: string) {
    const connection: Connection = {
      from: fromId,
      to: toId,
      id: `${fromId}-${toId}`,
    };

    this.connections.push(connection);
    this.animateConnection(connection);
  }

  removeCanvasItem(item: DragItem) {
    this.canvasItems = this.canvasItems.filter((i) => i.id !== item.id);
    this.connections = this.connections.filter(
      (c) => c.from !== item.id && c.to !== item.id
    );
    if (this.selectedItem === item) {
      this.selectedItem = null;
    }
  }

  clearCanvas() {
    this.canvasItems = [];
    this.connections = [];
    this.selectedItem = null;
    this.connectionMode = false;
    this.connectionFrom = null;
  }

  runPipeline() {
    this.pipelineOutput = "Running pipeline...\n";

    // Simulate pipeline execution
    setTimeout(() => {
      this.pipelineOutput = `Pipeline executed successfully!\n\n`;
      this.pipelineOutput += `Items in pipeline: ${this.canvasItems.length}\n`;
      this.pipelineOutput += `Connections: ${this.connections.length}\n`;
      this.pipelineOutput += `Execution time: ${Math.random() * 1000}ms\n`;

      this.canvasItems.forEach((item, index) => {
        this.pipelineOutput += `${index + 1}. ${item.name} (${item.type})\n`;
      });
    }, 1000);
  }

  savePipeline() {
    const pipeline = {
      items: this.canvasItems,
      connections: this.connections,
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem("desert-pipeline", JSON.stringify(pipeline));
    this.animateSave();
  }

  private animateItemAppearance(item: DragItem) {
    const element = document.querySelector(`[data-item-id="${item.id}"]`);
    if (element) {
      anime({
        targets: element,
        scale: [0, 1],
        rotate: [0, 360],
        duration: 500,
        easing: "easeOutElastic(1, .8)",
      });
    }
  }

  private animateConnection(connection: Connection) {
    const line = document.querySelector(`[data-connection="${connection.id}"]`);
    if (line) {
      anime({
        targets: line,
        strokeDasharray: [0, 1000],
        duration: 1000,
        easing: "easeOutQuad",
      });
    }
  }

  private animateSave() {
    anime({
      targets: ".save",
      scale: [1, 1.2, 1],
      duration: 300,
      easing: "easeOutQuad",
    });
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
      targets: ".component-item",
      translateX: [-100, 0],
      opacity: [0, 1],
      delay: (el, i) => 500 + i * 100,
      duration: 800,
      easing: "easeOutExpo",
    });
  }

  private updateConnections() {
    // Update connection positions when items move
  }

  getConnectionX(itemId: string, port: "input" | "output"): number {
    const item = this.canvasItems.find((i) => i.id === itemId);
    if (!item) return 0;
    return item.x + (port === "output" ? 100 : 0);
  }

  getConnectionY(itemId: string, port: "input" | "output"): number {
    const item = this.canvasItems.find((i) => i.id === itemId);
    if (!item) return 0;
    return item.y + 25;
  }

  isConnectionActive(connection: Connection): boolean {
    return (
      this.connectionMode &&
      (this.connectionFrom === connection.from ||
        this.connectionFrom === connection.to)
    );
  }
}
