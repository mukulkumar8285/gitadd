import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaborUpdateComponent } from './labor-update.component';

describe('LaborUpdateComponent', () => {
  let component: LaborUpdateComponent;
  let fixture: ComponentFixture<LaborUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LaborUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaborUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
