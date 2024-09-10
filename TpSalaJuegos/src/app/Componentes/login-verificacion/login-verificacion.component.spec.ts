import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginVerificacionComponent } from './login-verificacion.component';

describe('LoginVerificacionComponent', () => {
  let component: LoginVerificacionComponent;
  let fixture: ComponentFixture<LoginVerificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginVerificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginVerificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
