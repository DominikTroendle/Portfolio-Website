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
  // headerData und headerHref werden dynamisch befüllt, abhängig von currentLanguage (also headerData = this.databaseService[curentLanguage].headerData)
  headerData = ["About me", "Skills", "Projects"];
  headerHref = ["#about", "#skills", "#projects"];

  constructor(public databaseService: DatabaseService) {

  }

  changeLanguage(lang:string){
    this.databaseService.currentLanguage = lang;
    // this.currentLanguage = lang;
  }

}
