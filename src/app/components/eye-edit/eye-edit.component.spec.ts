import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeEditComponent } from './eye-edit.component';

describe('EyeEditComponent', () => {
  let component: EyeEditComponent;
  let fixture: ComponentFixture<EyeEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EyeEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EyeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
