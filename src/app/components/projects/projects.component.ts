import { Component } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {
  constructor(private OverlayService: OverlayService) {}

  openOverlay(){
    this.OverlayService.open();
  }
}
