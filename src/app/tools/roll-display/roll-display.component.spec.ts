import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RollDisplayComponent } from './roll-display.component';

describe('RollDisplayComponent', () => {
  let component: RollDisplayComponent;
  let fixture: ComponentFixture<RollDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RollDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RollDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
