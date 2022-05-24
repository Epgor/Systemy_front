import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayCoursesComponent } from './components/display-courses/display-courses.component';
import { DashboardCoursesComponent } from './components/dashboard-courses/dashboard-courses.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { CourseEditionMainComponent } from './components/course-edition-main/course-edition-main.component';
import { EyeEditComponent } from './components/eye-edit/eye-edit.component';
import { EarEditComponent } from './components/ear-edit/ear-edit.component';
import { WorkEditComponent } from './components/work-edit/work-edit.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { SingleQuestionComponent } from './components/single-question/single-question.component';
import { AddContentComponent } from './components/add-content/add-content.component';
import { CourseContentComponent } from './components/course-content/course-content.component';
import { ArticleComponent } from './components/article/article.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { GlitchComponent } from './components/glitch/glitch.component';
import { BootstrapPageComponent } from './components/bootstrap-page/bootstrap-page.component';


const routes: Routes = [
  { path: 'courses', component: DisplayCoursesComponent },
  { path: 'dashboard', component: DashboardCoursesComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'detail/:id', component: CourseDetailsComponent },
  { path: 'edition/:id', component: CourseEditionMainComponent},
  { path: 'eye/:id', component: EyeEditComponent},
  { path: 'ear/:id', component: EarEditComponent},
  { path: 'work/:id', component: WorkEditComponent},
  { path: 'login', component: LoginPageComponent},
  { path: 'question', component: SingleQuestionComponent },
  { path: 'course/:id/content', component: AddContentComponent },
  { path: 'course/:id/content/lining', component: CourseContentComponent},
  { path: 'article/:id', component: ArticleComponent },
  { path: 'quiz/:id', component: QuizComponent },
  { path: 'glitch', component: GlitchComponent},
  { path: 'bootstrap-page', component: BootstrapPageComponent},
  { path: '**', redirectTo: '/dashboard'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }