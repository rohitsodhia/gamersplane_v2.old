import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarWarsFFGDieComponent } from './starwarsffg-die.component';

describe('StarWarsFFGDieComponent', () => {
  let component: StarWarsFFGDieComponent;
  let fixture: ComponentFixture<StarWarsFFGDieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarWarsFFGDieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarWarsFFGDieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
