import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnexionDriverComponent } from './connexion-driver.component';

describe('ConnexionDriverComponent', () => {
  let component: ConnexionDriverComponent;
  let fixture: ComponentFixture<ConnexionDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConnexionDriverComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConnexionDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
