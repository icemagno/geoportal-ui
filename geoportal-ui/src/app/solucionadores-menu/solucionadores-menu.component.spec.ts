import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolucionadoresMenuComponent } from './solucionadores-menu.component';

describe('SolucionadoresMenuComponent', () => {
  let component: SolucionadoresMenuComponent;
  let fixture: ComponentFixture<SolucionadoresMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolucionadoresMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SolucionadoresMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
