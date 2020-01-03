import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnaRestComponent } from './cna-rest.component';

describe('CnaRestComponent', () => {
  let component: CnaRestComponent;
  let fixture: ComponentFixture<CnaRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnaRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnaRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
