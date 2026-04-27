import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';

type ReferenceItem = {
  text: string;
  name: string;
  role: string;
}

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})

export class ReferencesComponent {
  active = false;
  direction: '' | 'left' | 'right' = '';
  currentIndex = 0;
  isAnimated = false;

  private get carousel(): ReferenceItem[] {
    return this.db.data.referencesData.carousel as ReferenceItem[];
  }

  private get carouselLength(): number {
    return this.carousel.length;
  }

  constructor(public db: DatabaseService){ }

  nextCard(): void {
    this.direction = 'left';
    this.isAnimated = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselLength;
      this.reset();
    }, 600);
  }

  previousCard(): void {
    this.direction = 'right';
    this.isAnimated = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.carouselLength) % this.carouselLength;
      this.reset();
    }, 600);
  }

  getItemIndex(i:number): ReferenceItem {
    return this.carousel[(i + this.currentIndex) % this.carouselLength];
  }

  getItemRelativeToCurrent(off:number): ReferenceItem {
    return this.carousel[(this.currentIndex + off + this.carouselLength) % this.carouselLength];
  }

  private reset(): void {
    this.direction = '';
    this.isAnimated = false;
  }
}
