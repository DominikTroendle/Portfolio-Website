import { Component } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  constructor(private OverlayService: OverlayService) {}

  openOverlay(){
    this.OverlayService.open();
  }
}
