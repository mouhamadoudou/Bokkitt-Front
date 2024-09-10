import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseTypeUserComponent } from './choose-type-user.component';

describe('ChooseTypeUserComponent', () => {
  let component: ChooseTypeUserComponent;
  let fixture: ComponentFixture<ChooseTypeUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChooseTypeUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChooseTypeUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
