import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})

export class SkillsComponent implements AfterViewInit, OnDestroy {
  constructor(public db: DatabaseService) {}

  @ViewChild('left') left!: ElementRef<HTMLDivElement>;
  @ViewChild('right') right!: ElementRef<HTMLDivElement>;

  private ctx?: gsap.Context;
  private mm?: gsap.MatchMedia;

  isMobile = window.innerWidth < 1024;
  isVisible = false;

  @HostListener('window:resize')
  onResize(): void {
    this.isMobile = window.innerWidth < 1024;
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.ctx = gsap.context(() => {
      this.initAnimations();
    });
    ScrollTrigger.refresh();
  }

  private initAnimations(): void {
    this.mm = gsap.matchMedia();
    this.mm.add('(min-width: 1024px)', () => this.desktopAnimation());
    this.mm.add('(max-width: 1023px)', () => this.mobileAnimation());
  }

  private desktopAnimation(): void {
    const leftEl = this.left.nativeElement;
    const rightEl = this.right.nativeElement;
    const containerEl = leftEl.parentElement;
    if (!containerEl) return;
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerEl,
        start: 'top 90%',
        end: 'top 40%',
        scrub: 0.8
      },
    });
    tl.fromTo(
      leftEl,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1 },
    ).fromTo(
      rightEl,
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1 },
      '<',
    );
  }

  private mobileAnimation():void {
    const leftEl = this.left.nativeElement;
    const rightEl = this.right.nativeElement;
    gsap.fromTo(
      leftEl,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: leftEl,
          start: 'top 85%',
          end: 'bottom 70%',
          scrub: 0.8
        },
      },
    );
    gsap.fromTo(
      rightEl,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: rightEl,
          start: 'top 85%',
          end: 'bottom 90%',
          scrub: 0.8
        },
      },
    );
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    this.mm?.revert();
  }
}
