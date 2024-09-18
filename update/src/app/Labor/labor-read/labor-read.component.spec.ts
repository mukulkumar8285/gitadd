import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborReadComponent } from './labor-read.component';

describe('LaborReadComponent', () => {
  let component: LaborReadComponent;
  let fixture: ComponentFixture<LaborReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaborReadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaborReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
