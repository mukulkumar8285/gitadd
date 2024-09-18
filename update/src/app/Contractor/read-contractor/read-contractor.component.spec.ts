import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadContractorComponent } from './read-contractor.component';

describe('ReadContractorComponent', () => {
  let component: ReadContractorComponent;
  let fixture: ComponentFixture<ReadContractorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadContractorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadContractorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
