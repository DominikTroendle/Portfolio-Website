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

  get headerItems(){
    return this.db.data.headerData.items;
  }

  changeLanguage(lang:string){
    // this.db.currentLanguage = lang;
    // this.currentLanguage = lang;
  }

}
