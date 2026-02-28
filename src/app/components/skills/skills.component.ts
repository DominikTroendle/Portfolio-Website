import { Component, HostListener } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  constructor(public db: DatabaseService) { }

  isMobile = window.innerWidth < 1024;
  isVisible = false;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerHeight < 1024;
  }
}
