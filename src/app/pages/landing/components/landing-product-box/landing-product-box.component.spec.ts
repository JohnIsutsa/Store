import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingProductBoxComponent } from './landing-product-box.component';

describe('LandingProductBoxComponent', () => {
  let component: LandingProductBoxComponent;
  let fixture: ComponentFixture<LandingProductBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LandingProductBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingProductBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
