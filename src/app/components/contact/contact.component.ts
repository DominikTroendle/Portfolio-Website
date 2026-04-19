import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  AbstractControl
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ButtonComponent } from "../button/button.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('h1') h1!: ElementRef;
  @ViewChild('h2') h2!: ElementRef;
  @ViewChild('h3') h3!: ElementRef;
  @ViewChild('upperIntroduction') upperIntroduction!: ElementRef;
  @ViewChild('lowerIntroduction') lowerIntroduction!: ElementRef;
  @ViewChild('contact') contact!: ElementRef;

  private ctx!: gsap.Context;
  private mm!: gsap.MatchMedia;

  contactForm!: FormGroup<Record<string, FormControl<unknown>>>;
  formSubmitted = false;

  http: HttpClient = inject(HttpClient);
  post = {
    endPoint: 'https://dominik-troendle.de/sendMail.php',
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'text/plain',
        responseType: 'text',
      },
    },
  };
  overlayVisible = false;

  constructor(
    private fb: FormBuilder,
    public db: DatabaseService,
  ) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    const group: any = {};
    this.db.data.contactData.form.forEach((input: any) => {
      group[input.id] = this.createFormControl(input.id);
    });
    group['privacyPolicy'] = new FormControl(false, {
      validators: [Validators.requiredTrue],
    });
    this.contactForm = this.fb.group(group);
  }

  createFormControl(id: string) {
    const validators = [Validators.required];
    if (id === 'email') {
      validators.push(
        Validators.pattern(
          /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)+$/,
        ),
      );
    } else {
      validators.push(Validators.minLength(2), this.whitespaceValidator);
    }
    return this.fb.control('', { validators, updateOn: 'blur' });
  }

  whitespaceValidator(control: AbstractControl) {
    const value = control.value;
    if (!value) return null;
    if (value.trim().length === 0) {
      return { onlywhitespace: true };
    } else {
      return null;
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.contactForm.valid) {
      const { privacyPolicy, ...contactData } = this.contactForm.getRawValue();
      this.http
        .post(this.post.endPoint, this.post.body(contactData))
        .subscribe({
          next: () => {
            this.contactForm.reset();
            this.overlayVisible = true;
            this.formSubmitted = false;
            setTimeout(() => {
              this.overlayVisible = false;
            }, 4000);
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }

  ngAfterViewInit(): void {
    gsap.registerPlugin(ScrollTrigger);
    this.ctx = gsap.context(() => {
      this.initAnimations();
    });
    ScrollTrigger.refresh();
  }

  private initAnimations() {
    this.mm = gsap.matchMedia();
    this.mm.add('(min-width: 1024px)', () => this.desktopAnimation());
    this.mm.add('(max-width: 1023px)', () => this.mobileAnimation());
  }

  private desktopAnimation() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.h3.nativeElement,
        start: 'top 80%',
        end: 'top 70%',
        scrub: 0.8
      },
    });
    tl.fromTo(
      this.contact.nativeElement,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1 },
    )
      .fromTo(
        this.h3.nativeElement,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1 },
      )
      .fromTo(
        this.h2.nativeElement,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1 },
      )
      .fromTo(
        this.h1.nativeElement,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1 },
        '<',
      )
      .fromTo(
        this.upperIntroduction.nativeElement,
        { opacity: 0 },
        { opacity: 1 },
      )
      .fromTo(
        this.lowerIntroduction.nativeElement,
        { opacity: 0 },
        { opacity: 1 },
        '<',
      );
  }

  private mobileAnimation() {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.h3.nativeElement,
        start: 'top 80%',
        end: 'bottom 10%',
        scrub: 0.8
      },
    });
    tl.fromTo(
      this.h3.nativeElement,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 1 },
    )
      .fromTo(
        this.h1.nativeElement,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1 },
        '<',
      )
      .fromTo(
        this.h2.nativeElement,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1 },
        '<',
      );
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: this.h3.nativeElement,
        start: 'top 80%',
        end: 'bottom 10%',
        scrub: 0.8
      },
    });
    tl2
      .fromTo(
        this.upperIntroduction.nativeElement,
        { opacity: 0 },
        { opacity: 1 },
      )
      .fromTo(
        this.lowerIntroduction.nativeElement,
        { opacity: 0 },
        { opacity: 1 },
        '<',
      );
    gsap.fromTo(
      this.contact.nativeElement,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: this.contact.nativeElement,
          start: 'top 95%',
          end: 'bottom 95%',
          scrub: 0.8
        },
      },
    );
  }

  ngOnDestroy(): void {
    this.ctx.revert();
    this.mm?.revert();
  }
}
