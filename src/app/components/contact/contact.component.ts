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
  formSubmitted = false;
  
  constructor(
    private fb: FormBuilder,
    public db: DatabaseService
  ) { }

  ngOnInit(){
    this.buildForm();
  }

  buildForm(){
    const group: any = {};
    this.db.data.contactData.form.forEach((input: any) => {
      group[input.id] = this.createFormControl(input.id);
    });
    group['privacyPolicy'] = [false, Validators.requiredTrue];
    this.contactForm = this.fb.group(group);
  }
  
  createFormControl(id: string){
    const validators = [Validators.required];
    if(id === 'email'){
        validators.push(Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/));
    }else{
      validators.push(Validators.minLength(2));
    }
    return this.fb.control('', {validators, updateOn: 'blur'});
  }

  onSubmit(){
    console.log(this.contactForm.valid);
    this.formSubmitted = true;
  }
}
