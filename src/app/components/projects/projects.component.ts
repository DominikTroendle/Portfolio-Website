import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';
import { DOCUMENT } from '@angular/common';
import { DatabaseService } from '../../services/database/database.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [OverlayComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('title') title!: ElementRef;
  @ViewChild('eyebrow') eyebrow!: ElementRef;
  @ViewChild('intro') intro!: ElementRef;
  @ViewChild('projects') projects!: ElementRef;

  private ctx!: gsap.Context;
  private mm!: gsap.MatchMedia;

  isVisible = false;
  selectedProject = {};
  selectedIndex = 0;

  constructor(
    public db: DatabaseService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  showOverlay(index: number) {
    this.isVisible = true;
    this.selectedProject = this.db.data.projectsData.overlay[index];
    this.selectedIndex = index + 1;
    this.renderer.addClass(this.document.body, 'no-scroll');
  }

  updateOverlay(displayIndex: number) {
    const length = this.db.data.projectsData.overlay.length;
    const currentIndex = displayIndex - 1;
    const nextIndex = (currentIndex + 1) % length;
    this.selectedProject = this.db.data.projectsData.overlay[nextIndex];
    this.selectedIndex = nextIndex + 1;
  }

  closeOverlay() {
    this.isVisible = false;
    this.selectedIndex = 0;
    this.renderer.removeClass(this.document.body, 'no-scroll');
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
        trigger: this.eyebrow.nativeElement,
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: 0.8
      },
    });
    tl.fromTo(
      this.title.nativeElement,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)' },
    )
      .fromTo(
        this.eyebrow.nativeElement,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)' },
        '<',
      )
      .fromTo(
        this.intro.nativeElement,
        { opacity: 0 },
        { opacity: 1 },
        "<",
      )
      .fromTo(
        this.projects.nativeElement,
        { xPercent: -50, opacity: 0 },
        { xPercent: 0, opacity: 1 },
        '+=0.2',
      );
  }

  private mobileAnimation() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.eyebrow.nativeElement,
        start: 'top 80%',
        end: 'bottom 60%',
        scrub: 0.8
      },
    });
    tl.fromTo(
      this.title.nativeElement,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)' },
    )
      .fromTo(
        this.eyebrow.nativeElement,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)' },
        '<',
      )
      .fromTo(
        this.intro.nativeElement,
        { opacity: 0 },
        { opacity: 1 },
        '<',
      );
    gsap.fromTo(
      this.projects.nativeElement,
      { xPercent: -50, opacity: 0 },
      {
        xPercent: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: this.title.nativeElement,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: 0.8,
        },
      },
    );
  }

  ngOnDestroy(): void {
    this.ctx.revert();
    this.mm?.revert();
  }
}
