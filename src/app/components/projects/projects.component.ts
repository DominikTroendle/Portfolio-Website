import { Component } from '@angular/core';
import { OverlayComponent } from "../overlay/overlay.component";
import { NgStyle } from '@angular/common';

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

  handleOverlay(){
    this.isVisible = !this.isVisible;
  }

}
