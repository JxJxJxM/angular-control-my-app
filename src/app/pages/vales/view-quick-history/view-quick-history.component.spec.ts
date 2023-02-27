import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewQuickHistoryComponent } from './view-quick-history.component';

describe('ViewQuickHistoryComponent', () => {
  let component: ViewQuickHistoryComponent;
  let fixture: ComponentFixture<ViewQuickHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewQuickHistoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewQuickHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
