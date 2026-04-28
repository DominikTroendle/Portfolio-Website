import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { OverlayProject } from '../../services/database/database.types';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss'
})

export class OverlayComponent {
  @Input() overlayData!: OverlayProject;
  @Input() projectNumber: string = '';
  @Output() close = new EventEmitter<Event>();
  @Output() next = new EventEmitter<Event>();

  get overlaySubtitle(): string {
    return this.db.data.projectsData?.subtitle ?? '';
  }

  get nextLabel(): string {
    return this.db.data.projectsData?.next ?? '';
  }

  constructor(public db: DatabaseService) {}

  closeOverlay(): void {
    this.close.emit();
  }

  nextProject(): void {
    this.next.emit();
  }
}
