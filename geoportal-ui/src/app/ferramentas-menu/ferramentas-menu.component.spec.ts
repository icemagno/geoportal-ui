import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FerramentasMenuComponent } from './ferramentas-menu.component';

describe('FerramentasMenuComponent', () => {
  let component: FerramentasMenuComponent;
  let fixture: ComponentFixture<FerramentasMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FerramentasMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FerramentasMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
