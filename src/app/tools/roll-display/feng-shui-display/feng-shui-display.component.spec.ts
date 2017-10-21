import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FengShuiDisplayComponent } from './feng-shui-display.component';

describe('FengShuiDisplayComponent', () => {
  let component: FengShuiDisplayComponent;
  let fixture: ComponentFixture<FengShuiDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FengShuiDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FengShuiDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
