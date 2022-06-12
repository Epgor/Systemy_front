import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CzatComponent } from './czat.component';

describe('CzatComponent', () => {
  let component: CzatComponent;
  let fixture: ComponentFixture<CzatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CzatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CzatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
