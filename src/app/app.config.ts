import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        "projectId":"portfolio-fe6f9",
        "appId":"1:367663307015:web:5449120ee7588eada1cda2",
        "storageBucket":"portfolio-fe6f9.firebasestorage.app",
        "apiKey":"AIzaSyAhlpz0llUpeI2X8HAix7dnjpZ53p9DSjM",
        "authDomain":"portfolio-fe6f9.firebaseapp.com",
        "messagingSenderId":"367663307015",
        // "projectNumber":"367663307015",
        // "version":"2"
      })
    ),
    provideFirestore(() => getFirestore())]
};
