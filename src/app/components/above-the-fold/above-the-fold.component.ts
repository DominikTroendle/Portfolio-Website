import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ButtonComponent } from '../button/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-above-the-fold',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './above-the-fold.component.html',
  styleUrl: './above-the-fold.component.scss',
})

export class AboveTheFoldComponent implements AfterViewInit, OnDestroy {
  constructor(public db: DatabaseService) {}

  @ViewChild('atf') atf!: ElementRef<HTMLElement>;
  @ViewChild('main') main!: ElementRef<HTMLDivElement>;
  @ViewChild('left') left!: ElementRef<HTMLDivElement>;
  @ViewChild('right') right!: ElementRef<HTMLDivElement>;
  @ViewChild('ribbon') ribbon!: ElementRef<HTMLDivElement>;

  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const atfEl = this.atf.nativeElement;
    const mainEl = this.main.nativeElement;
    const leftEl = this.left.nativeElement;
    const rightEl = this.right.nativeElement;
    const ribbonEl = this.ribbon.nativeElement;
    const scrollConfig = {
      trigger: atfEl,
      start: 'top top',
      end: '+=100%',
      scrub: 0.8
    };

    this.ctx = gsap.context(() => {
      gsap.to(mainEl, {
        yPercent: -100,
        ease: 'none',
        scrollTrigger: scrollConfig
      });
      gsap.to(leftEl, {
        yPercent: -100,
        ease: 'none',
        scrollTrigger: scrollConfig
      });
      gsap.to(rightEl, {
        yPercent: -100,
        ease: 'none',
        scrollTrigger: scrollConfig
      });
      gsap.fromTo(
        ribbonEl,
        { y: 0, opacity: 1 },
        {
          y: 150,
          opacity: 0,
          scrollTrigger: scrollConfig
        },
      );
    });
    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
