import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'visualizer',
    loadComponent: () =>
      import('./modules/data-flow-visualizer/data-flow-visualizer.component').then(
        (m) => m.DataFlowVisualizerComponent
      ),
  },
  {
    path: 'tutorial/:id',
    loadComponent: () =>
      import('./pages/tutorial/tutorial.component').then(
        (m) => m.TutorialComponent
      ),
  },
  {
    path: 'tutorials',
    loadComponent: () =>
      import('./pages/tutorials-list/tutorials-list.component').then(
        (m) => m.TutorialsListComponent
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
