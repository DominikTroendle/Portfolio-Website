import { Component, ChangeDetectionStrategy } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OverlayComponent {
  constructor(private OverlayService: OverlayService) {}

  /* closeOverlay(){
    this.OverlayService.dispose();
  } */
}
