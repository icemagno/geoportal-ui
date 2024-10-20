import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUserMenuComponent } from './navbar-user-menu.component';

describe('NavbarUserMenuComponent', () => {
  let component: NavbarUserMenuComponent;
  let fixture: ComponentFixture<NavbarUserMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarUserMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarUserMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
