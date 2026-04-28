import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';
import { DOCUMENT } from '@angular/common';
import { DatabaseService } from '../../services/database/database.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { OverlayProject } from '../../services/database/database.types';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [OverlayComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})

export class ProjectsComponent implements AfterViewInit, OnDestroy {
  @ViewChild('title') title!: ElementRef<HTMLHeadingElement>;
  @ViewChild('eyebrow') eyebrow!: ElementRef<HTMLParagraphElement>;
  @ViewChild('intro') intro!: ElementRef<HTMLParagraphElement>;
  @ViewChild('projects') projects!: ElementRef<HTMLDivElement>;

  private ctx?: gsap.Context;
  private mm?: gsap.MatchMedia;

  isVisible = false;
  selectedProject: OverlayProject | null = null;
  selectedIndex = 0;

  private get overlayProjects(): OverlayProject[] {
    return this.db.data.projectsData?.overlay ?? [];
  }

  constructor(
    public db: DatabaseService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  showOverlay(index: number): void {
    this.isVisible = true;
    this.selectedProject = this.overlayProjects[index];
    this.selectedIndex = index + 1;
    this.renderer.addClass(this.document.body, 'no-scroll');
  }

  updateOverlay(displayIndex: number): void {
    const length = this.overlayProjects.length;
    const currentIndex = displayIndex - 1;
    const nextIndex = (currentIndex + 1) % length;
    this.selectedProject = this.overlayProjects[nextIndex];
    this.selectedIndex = nextIndex + 1;
  }

  closeOverlay(): void {
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

  private initAnimations(): void {
    this.mm = gsap.matchMedia();
    this.mm.add('(min-width: 1024px)', () => this.desktopAnimation());
    this.mm.add('(max-width: 1023px)', () => this.mobileAnimation());
  }

  private desktopAnimation(): void {
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

  private mobileAnimation(): void {
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
    this.ctx?.revert();
    this.mm?.revert();
  }
}
