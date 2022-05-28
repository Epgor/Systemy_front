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
import { SingleQuestionComponent } from './components/single-question/single-question.component';
import { AddContentComponent } from './components/add-content/add-content.component';
import { CourseContentComponent } from './components/course-content/course-content.component';
import { ArticleComponent } from './components/article/article.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuestionComponent } from './components/question/question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { QuizResultDialogComponent } from './components/quiz-result-dialog/quiz-result-dialog.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';



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
    WorkEditComponent,
    SingleQuestionComponent,
    AddContentComponent,
    CourseContentComponent,
    ArticleComponent,
    QuizComponent,
    QuestionComponent,
    QuizResultDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    PdfViewerModule

  ],
  providers: [],
  bootstrap: [AppComponent, CourseContentComponent]
})
export class AppModule { }
