import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatabaseService } from '../../services/database/database.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';

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

  constructor(
    public db: DatabaseService,
    private localStorage: LocalStorageService
  ) { }

  changeLanguage(){
    this.db.currentLanguage = this.db.currentLanguage === "german" ? "english" : "german";
    this.localStorage.set('selectedLanguage', this.db.currentLanguage);
    this.db.loadItems();
  }

  get isGerman(): boolean{
    return this.db.currentLanguage === "german";
  }

}
