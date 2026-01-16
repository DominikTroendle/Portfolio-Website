import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  currentLanguage:string = "english";

  items$; 
  firestore: Firestore = inject(Firestore);
  
  constructor() {
    this.items$ = collectionData(this.getDataRef());
    console.log(this.items$);
    
  }

  getDataRef(){
    return collection(this.firestore, this.currentLanguage);
  }
}
