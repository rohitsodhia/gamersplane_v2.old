import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FateDieComponent } from './fate-die.component';

describe('FateDieComponent', () => {
  let component: FateDieComponent;
  let fixture: ComponentFixture<FateDieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FateDieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FateDieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
