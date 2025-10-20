import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Practicelab } from './practicelab';

describe('Practicelab', () => {
  let component: Practicelab;
  let fixture: ComponentFixture<Practicelab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Practicelab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Practicelab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
