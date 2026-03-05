import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-above-the-fold',
  standalone: true,
  imports: [],
  templateUrl: './above-the-fold.component.html',
  styleUrl: './above-the-fold.component.scss'
})
export class AboveTheFoldComponent implements AfterViewInit, OnDestroy {
  constructor(public db: DatabaseService) { }

  @ViewChild('hero') hero!: ElementRef;
  @ViewChild('main') main!: ElementRef;
  @ViewChild('sideLeft') sideLeft!: ElementRef;
  @ViewChild('sideRight') sideRight!: ElementRef;
  @ViewChild('ribbon') ribbon!: ElementRef;

  private ctx!: gsap.Context;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.ctx = gsap.context(() => {
      gsap.to(this.main.nativeElement, {
        yPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: this.hero.nativeElement,
          start: 'top top',
          end: '+=100%',
          scrub: 0.8
        }
      });
      gsap.to(this.sideLeft.nativeElement, {
        yPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: this.hero.nativeElement,
          start: 'top top',
          end: '+=100%',
          scrub: 0.8
        }
      });
      gsap.to(this.sideRight.nativeElement, {
        yPercent: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: this.hero.nativeElement,
          start: 'top top',
          end: '+=100%',
          scrub: 0.8
        }
      });
      gsap.fromTo(
        this.ribbon.nativeElement,
        { y: 0, opacity: 1 },
        {
          y: 150,
          opacity: 0,
          scrollTrigger: {
            trigger: this.hero.nativeElement,
            start: 'top top',
            end: '+=100%',
            scrub: 0.8
          }
        }
      );
    });
    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.ctx.revert();
  }
}
