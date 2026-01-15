import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  currentLanguage:string = "english";

  changeLanguage(lang:string){
    this.currentLanguage = lang;
  }

}
