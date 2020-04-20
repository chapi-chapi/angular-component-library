import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapiChapiCardListComponent } from './card-list.component';

describe('CardListComponent', () => {
  let component: ChapiChapiCardListComponent;
  let fixture: ComponentFixture<ChapiChapiCardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChapiChapiCardListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapiChapiCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
