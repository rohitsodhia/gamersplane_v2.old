import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicRollDisplayComponent } from './basic-roll-display.component';

describe('BasicRollDisplayComponent', () => {
  let component: BasicRollDisplayComponent;
  let fixture: ComponentFixture<BasicRollDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicRollDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicRollDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
