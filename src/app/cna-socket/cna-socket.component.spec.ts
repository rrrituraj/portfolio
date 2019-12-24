import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CnaSocketComponent } from './cna-socket.component';

describe('CnaSocketComponent', () => {
  let component: CnaSocketComponent;
  let fixture: ComponentFixture<CnaSocketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CnaSocketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CnaSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
