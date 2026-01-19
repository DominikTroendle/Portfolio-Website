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

  constructor(public db: DatabaseService) { }

  handleOverlay(index: number){
    this.isVisible = !this.isVisible;
    this.selectedProject = this.db.data.projectsData.overlay[index];
  }

  closeOverlay(){
    this.isVisible = false;
  }

}
