import { Component, EventEmitter, Output } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { CommonModule } from '@angular/common';
import { LanguageSwitchComponent } from '../language-switch/language-switch.component';
import { RouterLink } from '@angular/router';
import { HeaderItems } from '../../services/database/database.types';

@Component({
  selector: 'app-nav-mobile',
  standalone: true,
  imports: [CommonModule, LanguageSwitchComponent, RouterLink],
  templateUrl: './nav-mobile.component.html',
  styleUrl: './nav-mobile.component.scss',
})

export class NavMobileComponent {
  @Output() close = new EventEmitter<Event>();

  get headerItems(): HeaderItems[] {
    return this.db.data.headerData?.items ?? [];
  }

  constructor(public db: DatabaseService) {}

  closeOverlay() {
    this.close.emit();
  }
}
