import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPinComponent } from './list-pin.component';

describe('ListPinComponent', () => {
  let component: ListPinComponent;
  let fixture: ComponentFixture<ListPinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListPinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
