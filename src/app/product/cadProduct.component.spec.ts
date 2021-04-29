import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadProductComponent } from './cadProduct.component';

describe('CadProductComponent', () => {
  let component: CadProductComponent;
  let fixture: ComponentFixture<CadProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
