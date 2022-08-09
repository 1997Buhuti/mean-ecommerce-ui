import { async, TestBed } from '@angular/core/testing';
import { OrdersModule } from './orders.module';

describe('OrdersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [OrdersModule],
    }).compileComponents();
  }));

  // TODO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it('should have a module definition', () => {
    expect(OrdersModule).toBeDefined();
  });
});
