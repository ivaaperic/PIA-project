import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZahtevnovaknjigaComponent } from './zahtevnovaknjiga.component';

describe('ZahtevnovaknjigaComponent', () => {
  let component: ZahtevnovaknjigaComponent;
  let fixture: ComponentFixture<ZahtevnovaknjigaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZahtevnovaknjigaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZahtevnovaknjigaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
