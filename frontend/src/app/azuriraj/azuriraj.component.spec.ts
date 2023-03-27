import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzurirajComponent } from './azuriraj.component';

describe('AzurirajComponent', () => {
  let component: AzurirajComponent;
  let fixture: ComponentFixture<AzurirajComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzurirajComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzurirajComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
