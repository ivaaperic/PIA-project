import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevimoderatorComponent } from './zahtevimoderator.component';

describe('ZahtevimoderatorComponent', () => {
  let component: ZahtevimoderatorComponent;
  let fixture: ComponentFixture<ZahtevimoderatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevimoderatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahtevimoderatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
