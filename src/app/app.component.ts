import { Component, ElementRef, ViewChild, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DatabaseService } from './services/database/database.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild('cursor', { static: true }) cursor!: ElementRef<HTMLDivElement>;

  title = 'Dominik Tröndle';

  constructor(
    public db: DatabaseService,
    private renderer: Renderer2
  ) { }

  async ngOnInit() {
    await this.db.loadItems();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.renderer.setStyle(this.cursor.nativeElement, 'left', `${event.clientX}px`);
    this.renderer.setStyle(this.cursor.nativeElement, 'top', `${event.clientY}px`);
  }
}
