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

  @ViewChild('left') left!: ElementRef<HTMLDivElement>;
  @ViewChild('right') right!: ElementRef<HTMLDivElement>;

  private ctx?: gsap.Context;

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);

    const leftElement = this.left.nativeElement;
    const rightElement = this.right.nativeElement;
    const rightParent = rightElement.parentElement;
    if (!rightParent) return;

    this.ctx = gsap.context(() => {
      gsap.fromTo(leftElement,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: leftElement,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.8
          }
        });
        gsap.fromTo(rightElement,
          { yPercent: 100 },
          {
            yPercent: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: rightParent,
              start: "top 90%",
              end: "top 0%",
              scrub: 0.8
            }
          });
    });
    ScrollTrigger.refresh();
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
  }
}
