import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupGenericComponent } from './popup-generic.component';

describe('PopupGenericComponent', () => {
  let component: PopupGenericComponent;
  let fixture: ComponentFixture<PopupGenericComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopupGenericComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopupGenericComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
