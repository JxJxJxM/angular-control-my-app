import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateValeComponent } from './create-vale.component';

describe('CreateValeComponent', () => {
  let component: CreateValeComponent;
  let fixture: ComponentFixture<CreateValeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateValeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateValeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
