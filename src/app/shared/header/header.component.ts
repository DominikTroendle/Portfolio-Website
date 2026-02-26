import { Component, Inject, Renderer2 } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { DatabaseService } from '../../services/database/database.service';
import { NavMobileComponent } from '../nav-mobile/nav-mobile.component';
import { LanguageSwitchComponent } from "../language-switch/language-switch.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NavMobileComponent,
    LanguageSwitchComponent
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  isVisible:boolean = false;

  constructor(
    public db: DatabaseService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) { }

  showMobileMenu(){
    this.isVisible = true;
    this.renderer.addClass(this.document.body, 'no-scroll');
  }

  hideMobileMenu(){
    this.isVisible = false;
    this.renderer.removeClass(this.document.body, 'no-scroll');
  }

}
