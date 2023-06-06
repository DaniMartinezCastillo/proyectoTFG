import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDescansoComponent } from './info-descanso.component';

describe('InfoDescansoComponent', () => {
  let component: InfoDescansoComponent;
  let fixture: ComponentFixture<InfoDescansoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDescansoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDescansoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
