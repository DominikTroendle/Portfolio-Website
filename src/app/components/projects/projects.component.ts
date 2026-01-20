import { Component } from '@angular/core';
import { OverlayComponent } from "../overlay/overlay.component";
import { NgStyle } from '@angular/common';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    OverlayComponent,
    NgStyle
],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  isVisible = false;
  selectedProject = {};
  selectedIndex = 0;

  constructor(public db: DatabaseService) { }

  showOverlay(index: number){
    this.isVisible = true;
    this.selectedProject = this.db.data.projectsData.overlay[index];
    this.selectedIndex = index + 1;
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
  }

}
