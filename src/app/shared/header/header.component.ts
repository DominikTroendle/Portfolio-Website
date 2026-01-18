import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  constructor(public db: DatabaseService) { }

  changeLanguage(lang:string){
    // this.db.currentLanguage = lang;
    // this.currentLanguage = lang;
  }

}
