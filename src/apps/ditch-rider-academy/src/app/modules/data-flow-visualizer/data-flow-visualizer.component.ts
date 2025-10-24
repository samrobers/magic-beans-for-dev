import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-data-flow-visualizer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="padding:1rem">
      <h3>Data Flow Visualizer (stub)</h3>
      <p>This is a lightweight placeholder component to satisfy lazy-loading routes.</p>
    </div>
  `,
})
export class DataFlowVisualizerComponent {}
