/* import { Component, Renderer2, ElementRef, HostListener, ViewChild } from '@angular/core';
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
} */

import { Component, Renderer2, ElementRef, HostListener, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
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
export class AppComponent implements AfterViewInit {
  @ViewChild('cursor', { static: true }) cursor!: ElementRef<HTMLDivElement>;

  title = 'Dominik Tröndle';

  constructor(
    public db: DatabaseService,
    private renderer: Renderer2,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.db.loadItems();
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.renderer.setStyle(this.cursor.nativeElement, 'left', `${event.clientX}px`);
    this.renderer.setStyle(this.cursor.nativeElement, 'top', `${event.clientY}px`);
  }

  ngAfterViewInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const tree = this.router.parseUrl(this.router.url);
      if(tree.fragment) {
        const interval = setInterval(() => {
          const el = document.getElementById(tree.fragment!);
          if(el) {
            el.scrollIntoView({ behavior: 'smooth' });
            clearInterval(interval);
          }
        }, 50);
      }
    });
  }
}