import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationsClientComponent } from './informations-client.component';

describe('InformationsClientComponent', () => {
  let component: InformationsClientComponent;
  let fixture: ComponentFixture<InformationsClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformationsClientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformationsClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
