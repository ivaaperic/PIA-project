import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindodajkorisnikaComponent } from './admindodajkorisnika.component';

describe('AdmindodajkorisnikaComponent', () => {
  let component: AdmindodajkorisnikaComponent;
  let fixture: ComponentFixture<AdmindodajkorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindodajkorisnikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindodajkorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
