import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomebuttonComponent } from './somebutton.component';

describe('SomebuttonComponent', () => {
  let component: SomebuttonComponent;
  let fixture: ComponentFixture<SomebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomebuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SomebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
