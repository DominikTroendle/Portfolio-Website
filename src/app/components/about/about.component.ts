import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  constructor(public db: DatabaseService) {}

  @ViewChild('left') left!: ElementRef;
  @ViewChild('right') right!: ElementRef;

  private ctx!: gsap.Context;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.ctx = gsap.context(() => {
      gsap.fromTo(this.left.nativeElement,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: this.left.nativeElement,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.5
          }
        });
        gsap.fromTo(this.right.nativeElement,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: this.right.nativeElement.parentElement,
              start: "top 90%",
              end: "top 0%",
              scrub: 0.5
            }
          });
    });
    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.ctx.revert();
  }
}
