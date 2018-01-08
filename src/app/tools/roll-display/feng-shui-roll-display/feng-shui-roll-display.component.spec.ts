import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FengShuiRollDisplayComponent } from './feng-shui-roll-display.component';

describe('FengShuiDisplayComponent', () => {
  let component: FengShuiRollDisplayComponent;
  let fixture: ComponentFixture<FengShuiRollDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FengShuiRollDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FengShuiRollDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
