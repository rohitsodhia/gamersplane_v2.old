import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrettySelectComponent } from './pretty-select.component';

describe('PrettySelectComponent', () => {
  let component: PrettySelectComponent;
  let fixture: ComponentFixture<PrettySelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrettySelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrettySelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
