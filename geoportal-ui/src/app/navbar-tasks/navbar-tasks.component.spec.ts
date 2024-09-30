import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarTasksComponent } from './navbar-tasks.component';

describe('NavbarTasksComponent', () => {
  let component: NavbarTasksComponent;
  let fixture: ComponentFixture<NavbarTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarTasksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
