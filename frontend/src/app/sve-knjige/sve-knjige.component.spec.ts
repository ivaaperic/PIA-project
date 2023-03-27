import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SveKnjigeComponent } from './sve-knjige.component';

describe('SveKnjigeComponent', () => {
  let component: SveKnjigeComponent;
  let fixture: ComponentFixture<SveKnjigeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SveKnjigeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SveKnjigeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
