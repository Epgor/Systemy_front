import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizResultDialogComponent } from './quiz-result-dialog.component';

describe('QuizResultDialogComponent', () => {
  let component: QuizResultDialogComponent;
  let fixture: ComponentFixture<QuizResultDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizResultDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizResultDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
