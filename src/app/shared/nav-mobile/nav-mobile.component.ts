import { Component, EventEmitter, Output } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { CommonModule } from '@angular/common';
import { LanguageSwitchComponent } from "../language-switch/language-switch.component";

@Component({
  selector: 'app-nav-mobile',
  standalone: true,
  imports: [
    CommonModule,
    LanguageSwitchComponent
  ],
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.scss'
})
export class NavMobileComponent {

  @Output()close = new EventEmitter<Event>();

  constructor(public db: DatabaseService) {}

  closeOverlay(){
    this.close.emit();
  }
}
