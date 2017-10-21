import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrettySelectAttrComponent } from './pretty-select-attr.component';

describe('PrettySelectComponent', () => {
  let component: PrettySelectAttrComponent;
  let fixture: ComponentFixture<PrettySelectAttrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrettySelectAttrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrettySelectAttrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
