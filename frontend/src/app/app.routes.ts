import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { ReservaComponent } from './pages/reserva/reserva.component';
import { PrivacyComponent } from './pages/privacy/privacy.component';
import { TermsComponent } from './pages/terms/terms.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    { path: '', redirectTo: '/inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'acerca-de', component: AcercaDeComponent },
    { path: 'reserva', component: ReservaComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'contact', component: ContactComponent }
];
