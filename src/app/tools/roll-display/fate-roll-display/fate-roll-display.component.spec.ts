import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FateRollDisplayComponent } from './fate-roll-display.component';

describe('FateRollDisplayComponent', () => {
  let component: FateRollDisplayComponent;
  let fixture: ComponentFixture<FateRollDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FateRollDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FateRollDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
