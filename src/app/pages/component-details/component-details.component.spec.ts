import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentDetailsComponent } from './component-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiService } from 'src/app/shared/services/api.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';

describe('ComponentDetailsComponent', () => {
  let component: ComponentDetailsComponent;
  let fixture: ComponentFixture<ComponentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentDetailsComponent ],
      providers: [ApiService, HttpClient],
      imports: [HttpClientModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
