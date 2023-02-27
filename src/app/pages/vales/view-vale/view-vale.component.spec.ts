import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewValeComponent } from './view-vale.component';

describe('ViewValeComponent', () => {
  let component: ViewValeComponent;
  let fixture: ComponentFixture<ViewValeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewValeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
