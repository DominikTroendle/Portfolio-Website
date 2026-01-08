import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-overlay',
  standalone: true,
  imports: [],
  templateUrl: './overlay.component.html',
  styleUrl: './overlay.component.scss',
})
export class OverlayComponent {

  @Output()close = new EventEmitter<Event>();

  onClose(){
    this.close.emit();
  }
}
