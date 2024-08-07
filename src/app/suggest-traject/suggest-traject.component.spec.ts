import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestTrajectComponent } from './suggest-traject.component';

describe('SuggestTrajectComponent', () => {
  let component: SuggestTrajectComponent;
  let fixture: ComponentFixture<SuggestTrajectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuggestTrajectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuggestTrajectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
