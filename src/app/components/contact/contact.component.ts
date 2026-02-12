import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm!: FormGroup;
  isChecked = false;

  imageChecked="../../../assets/img/checkbox_checked.png";
  imageUnchecked="../../../assets/img/checkbox.png";

  constructor(
    private fb: FormBuilder,
    public db: DatabaseService
  ) { }

  ngOnInit(){
    this.buildForm();
  }

  buildForm(){
    const group: any = {};
    for(const input of this.db.data.contactData.form){
      const validators = [];
      validators.push(Validators.required);
      if(input.id === 'email'){
        validators.push(Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/));
      }else{
        validators.push(Validators.minLength(2));
      }
      group[input.id] = ['', validators];
    }
    this.contactForm = this.fb.group(group);
  }

  onSubmit(){
    console.log(this.contactForm.valid);
    
  }

  changeImg(){
    this.isChecked = !this.isChecked;
  }

  get image(): string{
    return this.isChecked ? this.imageChecked : this.imageUnchecked;
  }
}
