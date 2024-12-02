import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckNumberComponent } from './check-number.component';

describe('CheckNumberComponent', () => {
  let component: CheckNumberComponent;
  let fixture: ComponentFixture<CheckNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CheckNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
