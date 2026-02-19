import { Component, inject } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import { FormBuilder, FormGroup,  FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  contactForm!: FormGroup<Record<string, FormControl<unknown>>>;
  formSubmitted = false;
  
  mailtest = true;
  http: HttpClient = inject(HttpClient);
  post = {
    endPoint: 'https://dominik-troendle.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text'
      }
    }
  };
  overlayVisible = false;

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
    group['privacyPolicy'] = new FormControl(false, {
      validators: [Validators.requiredTrue]
    });
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
    this.formSubmitted = true;
    if(this.contactForm.valid && !this.mailtest){
      const { privacyPolicy, ...contactData } = this.contactForm.getRawValue();
      this.http.post(this.post.endPoint, this.post.body(contactData))
        .subscribe({
          next: (response) => {
            this.contactForm.reset();
            this.formSubmitted = false;
            console.log(response);
          },
          error: (error) => {
            console.error(error);
          }
        })
    } else if(this.contactForm.valid && this.mailtest){
        this.contactForm.reset();
        this.overlayVisible = true;
        this.formSubmitted = false;
        setTimeout(() => {
          this.overlayVisible = false;
        }, 4000);
    }
  }
}
