import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import * as anime from "animejs";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <header class="academy-header">
      <div class="header-content">
        <div class="logo-section">
          <div class="rango-avatar" #rangoAvatar>
            <div class="hat"></div>
            <div class="face"></div>
            <div class="eyes">
              <div class="eye left"></div>
              <div class="eye right"></div>
            </div>
          </div>
          <h1 class="academy-title">Ditch Rider Academy</h1>
        </div>
        <nav class="navigation">
          <a routerLink="/" class="nav-link" #homeLink>Home</a>
          <a routerLink="/pipeline-tutorial" class="nav-link" #pipelineLink
            >Pipes</a
          >
          <a routerLink="/rxjs-visualization" class="nav-link" #rxjsLink
            >RxJS</a
          >
          <a routerLink="/drag-drop-builder" class="nav-link" #builderLink
            >Builder</a
          >
        </nav>
      </div>
    </header>
  `,
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
  ngOnInit() {
    // Animate Rango character on load
    anime({
      targets: ".rango-avatar",
      scale: [0, 1],
      rotate: [0, 360],
      duration: 2000,
      easing: "easeOutElastic(1, .8)",
    });

    // Animate navigation links
    anime({
      targets: ".nav-link",
      translateY: [-50, 0],
      opacity: [0, 1],
      delay: (el, i) => i * 200,
      duration: 1000,
      easing: "easeOutExpo",
    });
  }
}
