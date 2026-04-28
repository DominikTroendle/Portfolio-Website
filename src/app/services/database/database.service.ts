import { inject, Injectable } from '@angular/core';
import { collection, Firestore, getDocs } from '@angular/fire/firestore';
import { LocalStorageService } from '../localStorage/local-storage.service';
import { HeaderData, FooterData, AboutData, AtfData } from './database.types';

type AppData = {
  aboutData?: AboutData;
  atfData?: AtfData;
  contactData?: any;
  footerData?: FooterData;
  headerData?: HeaderData;
  legalNoticeData?: any;
  privacyPolicyData?: any;
  projectsData?: any;
  referencesData?: any;
  skillsData?: any;
}

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {
  currentLanguage: "english" | "german" = "english";
  data: AppData = {};
  firestore: Firestore = inject(Firestore);
  loaded = false;
  
  constructor(private localStorage: LocalStorageService) { }

  async loadItems() {
    const storedLanguage = this.localStorage.get("selectedLanguage");
    if(storedLanguage) this.currentLanguage = storedLanguage;
    const dataRef = await getDocs(collection(this.firestore, this.currentLanguage));
    dataRef.forEach(doc => {
      const key = doc.id as keyof AppData;
      this.data[key] = doc.data();
    });
    this.loaded = true;
  }
}
