import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitQuizComponent } from './init-quiz.component';

describe('InitQuizComponent', () => {
  let component: InitQuizComponent;
  let fixture: ComponentFixture<InitQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
