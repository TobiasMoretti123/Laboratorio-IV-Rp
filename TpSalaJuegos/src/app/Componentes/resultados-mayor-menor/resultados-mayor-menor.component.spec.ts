import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosMayorMenorComponent } from './resultados-mayor-menor.component';

describe('ResultadosMayorMenorComponent', () => {
  let component: ResultadosMayorMenorComponent;
  let fixture: ComponentFixture<ResultadosMayorMenorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultadosMayorMenorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosMayorMenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
