import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'mindboard-cdd8c',
        appId: '1:102551647619:web:500a70a5f88bcbd958b2b6',
        databaseURL:
          'https://mindboard-cdd8c-default-rtdb.europe-west1.firebasedatabase.app',
        storageBucket: 'mindboard-cdd8c.firebasestorage.app',
        apiKey: 'AIzaSyAjQxVwytQCGHThNZX1kaXP5rH4UFY0J2E',
        authDomain: 'mindboard-cdd8c.firebaseapp.com',
        messagingSenderId: '102551647619',
        measurementId: 'G-CYV96DSYYM',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),

  ],
};
