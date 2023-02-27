import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUnidadesComponent } from './view-unidades.component';

describe('ViewUnidadesComponent', () => {
  let component: ViewUnidadesComponent;
  let fixture: ComponentFixture<ViewUnidadesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUnidadesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUnidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
