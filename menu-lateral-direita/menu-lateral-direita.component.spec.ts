import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateralDireitaComponent } from './menu-lateral-direita.component';

describe('MenuLateralDireitaComponent', () => {
  let component: MenuLateralDireitaComponent;
  let fixture: ComponentFixture<MenuLateralDireitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuLateralDireitaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuLateralDireitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
