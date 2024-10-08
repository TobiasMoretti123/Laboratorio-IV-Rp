import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FireLoginComponent } from './fire-login.component';

describe('FireLoginComponent', () => {
  let component: FireLoginComponent;
  let fixture: ComponentFixture<FireLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FireLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FireLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
