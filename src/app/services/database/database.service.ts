import { inject, Injectable } from '@angular/core';
import { collection, DocumentData, Firestore, getDocs } from '@angular/fire/firestore';
import { LocalStorageService } from '../localStorage/local-storage.service';
import {
  HeaderData,
  FooterData,
  AboutData,
  AtfData,
  SkillsData,
  LegalData,
  PrivacyData,
  ContactData,
  ReferencesData,
  ProjectsData
} from './database.types';

type AppData = {
  aboutData?: AboutData;
  atfData?: AtfData;
  contactData?: ContactData;
  footerData?: FooterData;
  headerData?: HeaderData;
  legalNoticeData?: LegalData;
  privacyPolicyData?: PrivacyData;
  projectsData?: ProjectsData;
  referencesData?: ReferencesData;
  skillsData?: SkillsData;
};

@Injectable({
  providedIn: 'root',
})

export class DatabaseService {
  currentLanguage: 'english' | 'german' = 'english';
  data: AppData = {};
  firestore: Firestore = inject(Firestore);
  loaded = false;

  constructor(private localStorage: LocalStorageService) {}

  async loadItems(): Promise<void> {
    const storedLanguage = this.localStorage.get('selectedLanguage');
    if (storedLanguage) this.currentLanguage = storedLanguage;
    const dataRef = await getDocs(
      collection(this.firestore, this.currentLanguage),
    );
    dataRef.forEach((doc) => {
      const key = doc.id as keyof AppData;
      this.assignData(key, doc.data())
    });
    this.loaded = true;
  }

  private assignData(key: keyof AppData, value: DocumentData): void {
    switch (key) {
      case 'aboutData':
        this.data.aboutData = value as AboutData;
        break;
      case 'atfData':
        this.data.atfData = value as AtfData;
        break;
      case 'contactData':
        this.data.contactData = value as ContactData;
        break;
      case 'footerData':
        this.data.footerData = value as FooterData;
        break;
      case 'headerData':
        this.data.headerData = value as HeaderData;
        break;
      case 'legalNoticeData':
        this.data.legalNoticeData = value as LegalData;
        break;
      case 'privacyPolicyData':
        this.data.privacyPolicyData = value as PrivacyData;
        break;
      case 'projectsData':
        this.data.projectsData = value as ProjectsData;
        break;
      case 'referencesData':
        this.data.referencesData = value as ReferencesData;
        break;
      case 'skillsData':
        this.data.skillsData = value as SkillsData;
        break;
    }
  }
}
