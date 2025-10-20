import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { Resources } from './pages/resources/resources';
import { Sessions } from './pages/sessions/sessions';
import { Practicelab } from './pages/practicelab/practicelab';
import { About } from './pages/about/about';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Signup } from './pages/signup/signup';
import { NotFound } from './pages/not-found/not-found';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'resources', component: Resources },
  { path: 'sessions', component: Sessions },
  { path: 'practicelab', component: Practicelab },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
  { path: 'login', component: Login },
  { path: 'signup', component: Signup },
  { path: '**', component: NotFound }
];
