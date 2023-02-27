import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditValeComponent } from './edit-vale.component';

describe('EditValeComponent', () => {
  let component: EditValeComponent;
  let fixture: ComponentFixture<EditValeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditValeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
