import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseEditionMainComponent } from './course-edition-main.component';

describe('CourseEditionMainComponent', () => {
  let component: CourseEditionMainComponent;
  let fixture: ComponentFixture<CourseEditionMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseEditionMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseEditionMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
