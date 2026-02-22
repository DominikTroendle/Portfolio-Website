import { Component } from '@angular/core';
import { AboveTheFoldComponent } from '../components/above-the-fold/above-the-fold.component';
import { AboutComponent } from "../components/about/about.component";
import { SkillsComponent } from '../components/skills/skills.component';
import { ProjectsComponent } from "../components/projects/projects.component";
import { ReferencesComponent } from "../components/references/references.component";
import { ContactComponent } from '../components/contact/contact.component';
import { DatabaseService } from '../services/database/database.service';

@Component({
  selector: 'app-main-content',
  standalone: true,
  imports: [
    AboveTheFoldComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ReferencesComponent,
    ContactComponent
],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss'
})
export class MainContentComponent {
  constructor(public db: DatabaseService){ }
}
