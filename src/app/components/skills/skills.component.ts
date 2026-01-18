import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  constructor(public db: DatabaseService) { }
}
