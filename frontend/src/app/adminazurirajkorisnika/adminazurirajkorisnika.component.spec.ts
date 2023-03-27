import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminazurirajkorisnikaComponent } from './adminazurirajkorisnika.component';

describe('AdminazurirajkorisnikaComponent', () => {
  let component: AdminazurirajkorisnikaComponent;
  let fixture: ComponentFixture<AdminazurirajkorisnikaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminazurirajkorisnikaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminazurirajkorisnikaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
