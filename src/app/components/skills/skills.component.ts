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
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})

export class SkillsComponent implements AfterViewInit, OnDestroy {
  constructor(public db: DatabaseService) {}

  @ViewChild('left') left!: ElementRef;
  @ViewChild('right') right!: ElementRef;

  private ctx!: gsap.Context;
  private mm!: gsap.MatchMedia;

  isMobile = window.innerWidth < 1024;
  isVisible = false;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerHeight < 1024;
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.ctx = gsap.context(() => {
      this.initAnimations();
    });
    ScrollTrigger.refresh();
  }

  private initAnimations() {
    this.mm = gsap.matchMedia();
    this.mm.add('(min-width: 1024px)', () => this.desktopAnimation());
    this.mm.add('(max-width: 1023px)', () => this.mobileAnimation());
  }

  private desktopAnimation() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.left.nativeElement.parentElement,
        start: 'top 90%',
        end: 'top 40%',
        scrub: 0.8
      },
    });
    tl.fromTo(
      this.left.nativeElement,
      { x: -200, opacity: 0 },
      { x: 0, opacity: 1 },
    ).fromTo(
      this.right.nativeElement,
      { x: 200, opacity: 0 },
      { x: 0, opacity: 1 },
      '<',
    );
  }

  private mobileAnimation() {
    gsap.fromTo(
      this.left.nativeElement,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: this.left.nativeElement,
          start: 'top 85%',
          end: 'bottom 70%',
          scrub: 0.8
        },
      },
    );
    gsap.fromTo(
      this.right.nativeElement,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: this.right.nativeElement,
          start: 'top 85%',
          end: 'bottom 70%',
          scrub: 0.8
        },
      },
    );
  }

  ngOnDestroy(): void {
    this.ctx.revert();
    this.mm?.revert();
  }
}
