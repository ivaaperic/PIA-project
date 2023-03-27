import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminazurirajknjiguComponent } from './adminazurirajknjigu.component';

describe('AdminazurirajknjiguComponent', () => {
  let component: AdminazurirajknjiguComponent;
  let fixture: ComponentFixture<AdminazurirajknjiguComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminazurirajknjiguComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminazurirajknjiguComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
