import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostyComponent } from './posty.component';

describe('PostyComponent', () => {
  let component: PostyComponent;
  let fixture: ComponentFixture<PostyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
