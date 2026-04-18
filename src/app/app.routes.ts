import { Routes } from '@angular/router';
import { MainContentComponent } from './main-content/main-content.component';
import { LegalNoticeComponent } from './components/legal-notice/legal-notice.component';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

export const routes: Routes = [
    { path: '', component: MainContentComponent },
    { path: 'legal-notice', component: LegalNoticeComponent },
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'atf', component: MainContentComponent, data: { scrollTo: 'atf' } },
    { path: 'about', component: MainContentComponent, data: { scrollTo: 'about' } },
    { path: 'skills', component: MainContentComponent, data: { scrollTo: 'skills' } },
    { path: 'projects', component: MainContentComponent, data: { scrollTo: 'projects' } },
    { path: 'contact', component: MainContentComponent, data: { scrollTo: 'contact' } }
];
