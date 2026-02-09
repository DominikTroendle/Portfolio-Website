import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  isChecked = false;

  imageChecked="../../../assets/img/checkbox_checked.png";
  imageUnchecked="../../../assets/img/checkbox.png";

  constructor(public db: DatabaseService) { }

  changeImg(){
    this.isChecked = !this.isChecked;
  }

  get image(): string{
    return this.isChecked ? this.imageChecked : this.imageUnchecked;
  }

  validateInputs(){
    
  }
}
