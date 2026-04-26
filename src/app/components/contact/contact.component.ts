import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  ViewChild
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
import { RouterLink } from '@angular/router';

type ContactFormField = {
  id: string,
  text: string,
  placeholder: string,
  placeholderError: string,
  type: 'text' | 'email'
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})

export class ContactComponent implements AfterViewInit, OnDestroy {
  @ViewChild('title') title!: ElementRef<HTMLHeadingElement>;
  @ViewChild('subheadline') subheadline!: ElementRef<HTMLHeadingElement>;
  @ViewChild('eyebrow') eyebrow!: ElementRef<HTMLParagraphElement>;
  @ViewChild('intro') intro!: ElementRef<HTMLParagraphElement>;
  @ViewChild('prompt') prompt!: ElementRef<HTMLParagraphElement>;
  @ViewChild('form') form!: ElementRef<HTMLFormElement>;

  private ctx?: gsap.Context;
  private mm?: gsap.MatchMedia;

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

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    const group: Record<string, FormControl> = {};
    const formFields = this.db.data.contactData.form as ContactFormField[];
    formFields.forEach((input) => {
      group[input.id] = this.createFormControl(input.id);
    });
    group['privacyPolicy'] = new FormControl(false, {
      validators: [Validators.requiredTrue],
    });
    this.contactForm = this.fb.group(group);
  }

  createFormControl(id: string): FormControl {
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

  whitespaceValidator(control: AbstractControl): { onlywhitespace: true } | null {
    const value = control.value;
    if (!value) return null;
    if (value.trim().length === 0) {
      return { onlywhitespace: true };
    } else {
      return null;
    }
  }

  onSubmit(): void {
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

  private initAnimations(): void {
    this.mm = gsap.matchMedia();
    this.mm.add('(min-width: 1024px)', () => this.desktopAnimation());
    this.mm.add('(max-width: 1023px)', () => this.mobileAnimation());
  }

  private desktopAnimation(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.eyebrow.nativeElement,
        start: 'top 80%',
        end: 'top 70%',
        scrub: 0.8,
      },
    });
    tl.fromTo(
      this.form.nativeElement,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1 },
    )
      .fromTo(
        this.eyebrow.nativeElement,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1 },
      )
      .fromTo(
        this.subheadline.nativeElement,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1 },
      )
      .fromTo(
        this.title.nativeElement,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1 },
        '<',
      )
      .fromTo(
        this.intro.nativeElement,
        { opacity: 0 },
        { opacity: 1 },
      )
      .fromTo(
        this.prompt.nativeElement,
        { opacity: 0 },
        { opacity: 1 },
        '<',
      );
  }

  private mobileAnimation(): void {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: this.eyebrow.nativeElement,
        start: 'top 80%',
        end: 'bottom 10%',
        scrub: 0.8
      }
    });
    tl.fromTo(
      this.eyebrow.nativeElement,
      { clipPath: 'inset(0 0 100% 0)' },
      { clipPath: 'inset(0 0 0% 0)', duration: 1 }
    )
      .fromTo(
        this.title.nativeElement,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1 },
        '<'
      )
      .fromTo(
        this.subheadline.nativeElement,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 1 },
        '<'
      );
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: this.eyebrow.nativeElement,
        start: 'top 80%',
        end: 'bottom 10%',
        scrub: 0.8
      },
    });
    tl2
      .fromTo(
        this.intro.nativeElement,
        { opacity: 0 },
        { opacity: 1 },
      )
      .fromTo(
        this.prompt.nativeElement,
        { opacity: 0 },
        { opacity: 1 },
        '<'
      );
    gsap.fromTo(
      this.form.nativeElement,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        scrollTrigger: {
          trigger: this.form.nativeElement,
          start: 'top 95%',
          end: 'bottom 95%',
          scrub: 0.8
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.ctx?.revert();
    this.mm?.revert();
  }
}
