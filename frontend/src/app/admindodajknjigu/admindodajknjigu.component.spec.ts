import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmindodajknjiguComponent } from './admindodajknjigu.component';

describe('AdmindodajknjiguComponent', () => {
  let component: AdmindodajknjiguComponent;
  let fixture: ComponentFixture<AdmindodajknjiguComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdmindodajknjiguComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmindodajknjiguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
