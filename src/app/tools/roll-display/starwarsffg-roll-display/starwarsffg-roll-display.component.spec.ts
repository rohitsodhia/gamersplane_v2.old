import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarWarsFFGRollDisplayComponent } from './starwarsffg-roll-display.component';

describe('StarWarsFFGRollDisplayComponent', () => {
  let component: StarWarsFFGRollDisplayComponent;
  let fixture: ComponentFixture<StarWarsFFGRollDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarWarsFFGRollDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarWarsFFGRollDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
