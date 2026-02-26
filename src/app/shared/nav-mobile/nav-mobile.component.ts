import { Component, EventEmitter, Output } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-mobile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.scss'
})
export class NavMobileComponent {

  @Output()close = new EventEmitter<Event>();

  constructor(
    public db: DatabaseService,
    private localStorage: LocalStorageService
  ) {}

  closeOverlay(){
    this.close.emit();
  }

  changeLanguage(){
    this.db.currentLanguage = this.db.currentLanguage === "german" ? "english" : "german";
    this.localStorage.set('selectedLanguage', this.db.currentLanguage);
    this.db.loadItems();
  }

  get isGerman(): boolean{
    return this.db.currentLanguage === "german";
  }
}
