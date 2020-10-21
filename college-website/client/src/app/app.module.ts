import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgMarqueeModule } from 'ng-marquee';
// Mat Angular Materials
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';

// Custom Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { HomeComponent } from './pages/home/home.component';
import { FaqComponent } from './pages/faq/faq.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { PagesComponent } from './pages/pages.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { AdmissionComponent } from './pages/admission/admission.component';
import { FeeStructureComponent } from './pages/fee-structure/fee-structure.component';
import { SyllabusComponent } from './pages/syllabus/syllabus.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { FeedbackComponent } from './pages/feedback/feedback.component';
import { CreditsComponent } from './pages/credits/credits.component';
import { ManagementComponent } from './pages/management/management.component';
import { TransportsComponent } from './pages/transports/transports.component';
import { CovidComponent } from './pages/covid/covid.component';

// BootStrap
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, // custom Header Component
    FooterComponent, // custom Footer Component
    LoginComponent, // custom login component
    CarouselComponent, // custom Carousel Component for home page
    ContactusComponent,
    HomeComponent,
    FaqComponent,
    AboutusComponent,
    PagesComponent,
    CoursesComponent,
    AdmissionComponent,
    FeeStructureComponent,
    SyllabusComponent,
    GalleryComponent,
    FeedbackComponent,
    CreditsComponent,
    ManagementComponent,
    TransportsComponent,
    CovidComponent
  ],
  imports: [
    NgMarqueeModule,
    MatDatepickerModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatTreeModule,
    HttpClientModule,
    MatTableModule,
    MatStepperModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatMenuModule,
    MatIconModule,
    NgbModule, // Ng BootStarp module
    MatSidenavModule,
    MatNativeDateModule,
    RouterModule,
    CommonModule,
    MatListModule,
    MatTabsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatRadioModule,
    MatSlideToggleModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
