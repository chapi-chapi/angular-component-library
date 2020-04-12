import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapiChapiCardComponent } from './card.component';

describe('CardComponent', () => {
  let component: ChapiChapiCardComponent;
  let fixture: ComponentFixture<ChapiChapiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapiChapiCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapiChapiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
