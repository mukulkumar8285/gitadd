import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContractorComponent } from './update-contractor.component';

describe('UpdateContractorComponent', () => {
  let component: UpdateContractorComponent;
  let fixture: ComponentFixture<UpdateContractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateContractorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
