import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarEditComponent } from './ear-edit.component';

describe('EarEditComponent', () => {
  let component: EarEditComponent;
  let fixture: ComponentFixture<EarEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EarEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
