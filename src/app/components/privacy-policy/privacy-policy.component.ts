import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {
  constructor(public db: DatabaseService) { }
}
