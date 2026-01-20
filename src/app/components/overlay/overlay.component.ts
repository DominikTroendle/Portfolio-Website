import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
})
export class OverlayComponent {

  @Input()overlayData: any;
  @Input()projectNumber: any;
  @Output()close = new EventEmitter<Event>();
  @Output()next = new EventEmitter<Event>();

  constructor(public db: DatabaseService) { }

  closeOverlay(){
    this.close.emit();
  }

  nextProject(){
    this.next.emit();
  }
}
