import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnidadComponent } from './view-unidad.component';

describe('ViewUnidadComponent', () => {
  let component: ViewUnidadComponent;
  let fixture: ComponentFixture<ViewUnidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUnidadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUnidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
