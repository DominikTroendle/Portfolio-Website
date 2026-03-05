import { 
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core';
import { OverlayComponent } from "../overlay/overlay.component";
import { DOCUMENT } from '@angular/common';
import { DatabaseService } from '../../services/database/database.service';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    OverlayComponent
],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {

  @ViewChild('headline') headline!: ElementRef;
  @ViewChild('subheadline') subheadline!: ElementRef;
  @ViewChild('introduction') introduction!: ElementRef;
  @ViewChild('projects') projects!: ElementRef;

  private ctx!: gsap.Context;

  isVisible = false;
  selectedProject = {};
  selectedIndex = 0;

  constructor(
    public db: DatabaseService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  showOverlay(index: number){
    this.isVisible = true;
    this.selectedProject = this.db.data.projectsData.overlay[index];
    this.selectedIndex = index + 1;
    this.renderer.addClass(this.document.body, 'no-scroll');
  }

  updateOverlay(displayIndex: number){
    const length = this.db.data.projectsData.overlay.length;
    const currentIndex = displayIndex -1;
    const nextIndex = (currentIndex + 1) % length;
    this.selectedProject = this.db.data.projectsData.overlay[nextIndex];
    this.selectedIndex = nextIndex + 1;
  }

  closeOverlay(){
    this.isVisible = false;
    this.selectedIndex = 0;
    this.renderer.removeClass(this.document.body, 'no-scroll');
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: this.headline.nativeElement.parentElement,
          start: "top 80%",
          end: "bottom 60%",
          scrub: 1
        }
      });
      tl.fromTo(
        this.headline.nativeElement,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)" }
      ).fromTo(
        this.subheadline.nativeElement,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)" },
        "<"
      ).fromTo(
        this.projects.nativeElement,
        { xPercent: -50, opacity: 0 },
        { xPercent: 0, opacity: 1 },
        "+=0.2"
      ).fromTo(
        this.introduction.nativeElement,
        { opacity: 0 },
        { opacity: 1 }
      );
    });
  }

  ngOnDestroy(): void {
    this.ctx.revert();
  }

}
