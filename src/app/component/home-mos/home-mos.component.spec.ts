import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMosComponent } from './home-mos.component';

describe('HomeMosComponent', () => {
  let component: HomeMosComponent;
  let fixture: ComponentFixture<HomeMosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeMosComponent]
    });
    fixture = TestBed.createComponent(HomeMosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
