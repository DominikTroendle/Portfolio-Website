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

  changeLanguage(){
    this.db.currentLanguage = this.db.currentLanguage === "german" ? "english" : "german";
    this.db.loadItems();
  }

  get isGerman(): boolean{
    return this.db.currentLanguage === "german";
  }

}
