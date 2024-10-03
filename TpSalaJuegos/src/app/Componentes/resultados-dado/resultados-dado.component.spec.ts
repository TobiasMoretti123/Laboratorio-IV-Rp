import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosDadoComponent } from './resultados-dado.component';

describe('ResultadosDadoComponent', () => {
  let component: ResultadosDadoComponent;
  let fixture: ComponentFixture<ResultadosDadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResultadosDadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultadosDadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
