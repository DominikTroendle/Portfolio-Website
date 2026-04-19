import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})

export class ButtonComponent {
  @Input() text: string = '';
  @Input() fragment?: string;
  @Input() route: string = '/';
}
