import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

@Component({
  selector: 'app-language-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-switch.component.html',
  styleUrl: './language-switch.component.scss'
})
export class LanguageSwitchComponent {

  constructor(
      public db: DatabaseService,
      private localStorage: LocalStorageService
    ) {}
  
  changeLanguage(){
    this.db.currentLanguage = this.db.currentLanguage === "german" ? "english" : "german";
    this.localStorage.set('selectedLanguage', this.db.currentLanguage);
    this.db.loadItems();
  }

  get isGerman(): boolean{
    return this.db.currentLanguage === "german";
  }
}