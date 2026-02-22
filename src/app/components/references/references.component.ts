import { Component } from '@angular/core';
import { DatabaseService } from '../../services/database/database.service';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {
  active: boolean = false;
  direction: string = "";
  currentIndex: number = 0;
  carouselLength: number = this.db.data.referencesData.carousel.length;
  isAnimated: boolean = false;

  constructor(public db: DatabaseService){ }

  next(){
    this.direction = "left";
    this.isAnimated = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex + 1) % this.carouselLength;
      this.reset();
    }, 600);
  }

  previous(){
    this.direction = "right";
    this.isAnimated = true;
    setTimeout(() => {
      this.currentIndex = (this.currentIndex - 1 + this.carouselLength) % this.carouselLength;
      this.reset();
    }, 600);
  }

  getItemIndex(i:number){
    return this.db.data.referencesData.carousel[(i + this.currentIndex) % this.carouselLength];
  }

  getItemRelativeToCurrent(off:number){
    return this.db.data.referencesData.carousel[(this.currentIndex + off + this.carouselLength) % this.carouselLength];
  }

  reset(){
    this.direction = "";
    this.isAnimated = false;
  }
}
