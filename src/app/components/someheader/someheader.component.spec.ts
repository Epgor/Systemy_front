import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomeheaderComponent } from './someheader.component';

describe('SomeheaderComponent', () => {
  let component: SomeheaderComponent;
  let fixture: ComponentFixture<SomeheaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomeheaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SomeheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
