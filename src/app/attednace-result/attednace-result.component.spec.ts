import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttednaceResultComponent } from './attednace-result.component';

describe('AttednaceResultComponent', () => {
  let component: AttednaceResultComponent;
  let fixture: ComponentFixture<AttednaceResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttednaceResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttednaceResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
