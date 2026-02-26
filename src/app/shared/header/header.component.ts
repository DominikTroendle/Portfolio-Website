import { Component, Inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DatabaseService } from '../../services/database/database.service';
import { LocalStorageService } from '../../services/localStorage/local-storage.service';
import { NavMobileComponent } from '../nav-mobile/nav-mobile.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NavMobileComponent
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isVisible:boolean = false;

  constructor(
    public db: DatabaseService,
    private localStorage: LocalStorageService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  changeLanguage(){
    this.db.currentLanguage = this.db.currentLanguage === "german" ? "english" : "german";
    this.localStorage.set('selectedLanguage', this.db.currentLanguage);
    this.db.loadItems();
  }

  get isGerman(): boolean{
    return this.db.currentLanguage === "german";
  }

  showMobileMenu(){
    this.isVisible = true;
    this.renderer.addClass(this.document.body, 'no-scroll');
  }

  hideMobileMenu(){
    this.isVisible = false;
    this.renderer.removeClass(this.document.body, 'no-scroll');
  }

}
