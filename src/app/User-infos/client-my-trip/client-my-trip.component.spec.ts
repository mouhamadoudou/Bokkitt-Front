import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientMyTripComponent } from './client-my-trip.component';

describe('ClientMyTripComponent', () => {
  let component: ClientMyTripComponent;
  let fixture: ComponentFixture<ClientMyTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientMyTripComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientMyTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
