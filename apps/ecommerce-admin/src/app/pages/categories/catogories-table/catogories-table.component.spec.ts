import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatogoriesTableComponent } from './catogories-table.component';

describe('CatogoriesTableComponent', () => {
  let component: CatogoriesTableComponent;
  let fixture: ComponentFixture<CatogoriesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatogoriesTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CatogoriesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
