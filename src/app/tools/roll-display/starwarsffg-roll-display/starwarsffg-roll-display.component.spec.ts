import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarwarsffgRollDisplayComponent } from './starwarsffg-roll-display.component';

describe('StarwarsffgRollDisplayComponent', () => {
  let component: StarwarsffgRollDisplayComponent;
  let fixture: ComponentFixture<StarwarsffgRollDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarwarsffgRollDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarwarsffgRollDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
