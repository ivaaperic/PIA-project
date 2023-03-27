import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminpromenalozinkeComponent } from './adminpromenalozinke.component';

describe('AdminpromenalozinkeComponent', () => {
  let component: AdminpromenalozinkeComponent;
  let fixture: ComponentFixture<AdminpromenalozinkeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminpromenalozinkeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminpromenalozinkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
