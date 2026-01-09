import { Component } from '@angular/core';

@Component({
  selector: 'app-references',
  standalone: true,
  imports: [],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss'
})
export class ReferencesComponent {
  active:boolean = false;
  currentIndex = 0;
  carouselData = [
    {
      name: "Nico Reckert",
      role: "Team Partner Project Join",
      comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua."
    },
    {
      name: "Kevin Breiter",
      role: "Team Partner Project Join",
      comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore."
    },
    {
      name: "kjkjasdl ölowo-öäla",
      role: "lkllakkddds",
      comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr."
    },
  ]

  next(){
    this.currentIndex = (this.currentIndex + 1) % this.carouselData.length;
  }

  previous(){
    this.currentIndex = (this.currentIndex - 1 + this.carouselData.length) % this.carouselData.length;
  }

  getIndex(i:number){
    return this.carouselData[(i + this.currentIndex) % this.carouselData.length];
  }
}
