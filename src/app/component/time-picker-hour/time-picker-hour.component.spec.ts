import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePickerHourComponent } from './time-picker-hour.component';

describe('TimePickerHourComponent', () => {
  let component: TimePickerHourComponent;
  let fixture: ComponentFixture<TimePickerHourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimePickerHourComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimePickerHourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
