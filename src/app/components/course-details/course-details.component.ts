import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { Router,NavigationStart} from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  @Input() course?: Course;
  isChecked: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private location: Location,
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCourse();
    let firstTime = localStorage.getItem('firstTime');
    let userRole = this.loginService.getRole();
    if(firstTime !== 'false' && userRole !== "Admin")
    {
      window.alert("Nie rozwiązywałeś jeszcze testu VAK!\nZrób to teraz!");
      this.router.navigate(['/', 'init-quiz']);
    }
      

  }

  getCourse(): void {
    const id = Number(this.route
      .snapshot.paramMap.get('id'));

    this.courseService.getCourse(id)
      .subscribe(course => this.course = course);


  }

  goBack(): void {
    this.location.back();
  }

  save(course: Course): void {
    if (this.course) {

       this.courseService
        .updateCourse(course.id, course.title, course.desc)
        .subscribe();

       this.goBack();
    }

  }

  imAdmin(): boolean
  {
    if(this.loginService.getRole() == 'Admin')
      return true
    return false
  }

}
