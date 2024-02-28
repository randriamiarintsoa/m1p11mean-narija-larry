import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoirComponent } from './voir.component';

describe('VoirComponent', () => {
  let component: VoirComponent;
  let fixture: ComponentFixture<VoirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
