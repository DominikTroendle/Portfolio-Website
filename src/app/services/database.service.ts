import { inject, Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  currentLanguage: "english" | "german" = "english";

  data: any = {};
  firestore: Firestore = inject(Firestore);
  
  constructor() { }

  async loadItems() {
    const dataRef = await getDocs(collection(this.firestore, this.currentLanguage));
    dataRef.forEach(doc => {
      this.data[doc.id] = doc.data()['items'];
    });
  }
}
