import { inject, Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { LocalStorageService } from '../localStorage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  currentLanguage: "english" | "german" = "english";

  data: any = {};
  firestore: Firestore = inject(Firestore);
  loaded = false;
  
  constructor(private localStorage: LocalStorageService) { }

  async loadItems() {
    const storedLanguage = this.localStorage.get("selectedLanguage");
    if(storedLanguage) this.currentLanguage = storedLanguage;
    const dataRef = await getDocs(collection(this.firestore, this.currentLanguage));
    dataRef.forEach(doc => {
      this.data[doc.id] = doc.data();
    });
    this.loaded = true;
  }
}
