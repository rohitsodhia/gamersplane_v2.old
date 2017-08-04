import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FfgDieComponent } from './starwarsffg-die.component';

describe('StarWarsFFGDieComponent', () => {
  let component: FfgDieComponent;
  let fixture: ComponentFixture<FfgDieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FfgDieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FfgDieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
