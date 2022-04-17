import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SomeheaderComponent } from './components/someheader/someheader.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { SomebuttonComponent } from './components/somebutton/somebutton.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { GlitchComponent } from './components/glitch/glitch.component';
import { BootstrapPageComponent } from './components/bootstrap-page/bootstrap-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DisplayCoursesComponent } from './components/display-courses/display-courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component'
import { FormsModule } from '@angular/forms';
import { DashboardCoursesComponent } from './components/dashboard-courses/dashboard-courses.component';
import { CourseEditionMainComponent } from './components/course-edition-main/course-edition-main.component';
import { EyeEditComponent } from './components/eye-edit/eye-edit.component';
import { EarEditComponent } from './components/ear-edit/ear-edit.component';
import { WorkEditComponent } from './components/work-edit/work-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    SomeheaderComponent,
    LoginFormComponent,
    FooterComponent,
    SomebuttonComponent,
    LoginPageComponent,
    GlitchComponent,
    BootstrapPageComponent,
    DisplayCoursesComponent,
    CourseDetailsComponent,
    DashboardCoursesComponent,
    CourseEditionMainComponent,
    EyeEditComponent,
    EarEditComponent,
    WorkEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
