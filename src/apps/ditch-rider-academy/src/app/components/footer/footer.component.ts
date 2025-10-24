import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-footer",
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="academy-footer">
      <div class="footer-content">
        <p class="footer-text">
          🌵 Ditch Rider Academy - Learn Angular the Western Way 🌵
        </p>
        <div class="footer-decorations">
          <span class="cactus">🌵</span>
          <span class="cactus">🌵</span>
          <span class="cactus">🌵</span>
        </div>
      </div>
    </footer>
  `,
  styleUrls: ["./footer.component.scss"],
})
export class FooterComponent {}
