import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import * as anime from "animejs";

@Component({
  selector: "app-home",
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <div class="welcome-section">
        <h1 class="welcome-title" #welcomeTitle>
          Welcome to Ditch Rider Academy
        </h1>
        <p class="welcome-subtitle" #welcomeSubtitle>
          Learn Angular pipes, RxJS, and reactive programming in the wildest way
          possible!
        </p>
      </div>

      <div class="features-grid">
        <div
          class="feature-card"
          *ngFor="let feature of features; let i = index"
          [attr.data-index]="i"
          #featureCard
        >
          <div class="feature-icon">{{ feature.icon }}</div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-description">{{ feature.description }}</p>
          <a [routerLink]="feature.route" class="feature-button">
            {{ feature.buttonText }}
          </a>
        </div>
      </div>

      <div class="rango-quote">
        <div class="quote-bubble" #quoteBubble>
          <p class="quote-text">
            "In the desert of code, a good pipe is like water - it flows where
            you need it!"
          </p>
          <div class="quote-author">- Rango, Chief Ditch Rider</div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  features = [
    {
      icon: "🔧",
      title: "Pipeline Tutorial",
      description:
        "Master Angular pipes with interactive examples and visual data flow",
      route: "/pipeline-tutorial",
      buttonText: "Start Learning",
    },
    {
      icon: "⚡",
      title: "RxJS Visualization",
      description:
        "See how Observers, Subjects, and BehaviorSubjects work with animated examples",
      route: "/rxjs-visualization",
      buttonText: "Explore RxJS",
    },
    {
      icon: "🎮",
      title: "Drag & Drop Builder",
      description:
        "Build custom data pipelines with our interactive drag-and-drop tool",
      route: "/drag-drop-builder",
      buttonText: "Start Building",
    },
  ];

  ngOnInit() {
    // Animate welcome section
    anime({
      targets: "#welcomeTitle",
      translateY: [-50, 0],
      opacity: [0, 1],
      duration: 1500,
      easing: "easeOutExpo",
    });

    anime({
      targets: "#welcomeSubtitle",
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1500,
      delay: 500,
      easing: "easeOutExpo",
    });

    // Animate feature cards
    anime({
      targets: ".feature-card",
      translateY: [100, 0],
      opacity: [0, 1],
      delay: (el, i) => 1000 + i * 200,
      duration: 1000,
      easing: "easeOutExpo",
    });

    // Animate quote bubble
    anime({
      targets: "#quoteBubble",
      scale: [0, 1],
      rotate: [-10, 0],
      delay: 2000,
      duration: 1500,
      easing: "easeOutElastic(1, .8)",
    });

    // Add hover animations to feature cards
    this.setupCardHoverAnimations();
  }

  private setupCardHoverAnimations() {
    const cards = document.querySelectorAll(".feature-card");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        anime({
          targets: card,
          scale: 1.05,
          rotateY: 5,
          duration: 300,
          easing: "easeOutQuad",
        });
      });

      card.addEventListener("mouseleave", () => {
        anime({
          targets: card,
          scale: 1,
          rotateY: 0,
          duration: 300,
          easing: "easeOutQuad",
        });
      });
    });
  }
}
