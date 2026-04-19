import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-legal-notice',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss'
})
export class LegalNoticeComponent {
  constructor(public db: DatabaseService) { }
}
