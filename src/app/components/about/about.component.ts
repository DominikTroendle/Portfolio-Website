import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit, OnDestroy{
  constructor(public db: DatabaseService) { }

  @ViewChild('left') left!: ElementRef;
  @ViewChild('right') right!: ElementRef;

  private ctx!: gsap.Context;

 ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.ctx = gsap.context(() => {

      

      /* gsap.fromTo(this.left.nativeElement,
        { x: -200, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          scrollTrigger: {
            trigger: this.left.nativeElement,
            start: "top 90%",
            end: "top 40%",
            scrub: 0.5,
            // markers: true
          }
        });
        gsap.fromTo(this.right.nativeElement,
          { x: 200, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            scrollTrigger: {
              trigger: this.right.nativeElement,
              start: "top 90%",
              end: "top 40%",
              scrub: 0.5,
              markers: true
            }
          }); */
    });
  }

  ngOnDestroy(): void {
    this.ctx.revert();
  }
}
