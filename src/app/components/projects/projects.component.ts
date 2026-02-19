import { Component, Inject, Renderer2 } from '@angular/core';
import { OverlayComponent } from "../overlay/overlay.component";
import { DOCUMENT } from '@angular/common';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    OverlayComponent
],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  isVisible = false;
  selectedProject = {};
  selectedIndex = 0;

  constructor(
    public db: DatabaseService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
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

}
