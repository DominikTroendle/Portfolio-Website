import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(public db: DatabaseService){ }
}
