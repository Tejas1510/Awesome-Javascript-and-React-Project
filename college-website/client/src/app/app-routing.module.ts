import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './pages/faq/faq.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { AdmissionComponent } from './pages/admission/admission.component';
import { FeeStructureComponent } from './pages/fee-structure/fee-structure.component';
import { SyllabusComponent } from './pages/syllabus/syllabus.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { ManagementComponent } from './pages/management/management.component';
import { CovidComponent } from './pages/covid/covid.component';

const AppRoutes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Home' } },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'aboutus', component: AboutusComponent, data: { title: 'About ACE' } },
  { path: 'faq', component: FaqComponent, data: { title: 'FAQ' } },
  { path: 'courses', component: CoursesComponent, data: { title: 'Courses' } },
  { path: 'admission', component: AdmissionComponent, data: { title: 'Admission' } },
  { path: 'feestructure', component: FeeStructureComponent, data: { title: 'FeeStructure' } },
  { path: 'syllabus', component: SyllabusComponent, data: { title: 'Syllabus' } },
  { path: 'gallery', component: GalleryComponent, data: { title: 'Gallery' } },
  { path: 'contactus', component: ContactusComponent, data: { title: 'ContactUS' } },
  { path: 'feedback', component: FeedbackComponent, data: { title: 'FeedBack' } },
  { path: 'credits', component: CreditsComponent, data: { title: 'Credits' } },
  { path: 'management', component: ManagementComponent, data: { title: 'Management' } },
  { path: 'covid', component: CovidComponent, data: { title: 'Covid-19' } }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes, {useHash: true})],
  exports: [RouterModule]
})

export class AppRoutingModule { }
