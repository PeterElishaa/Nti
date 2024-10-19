import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gudashGuard } from '../gudash.guard';

describe('gudashGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
      TestBed.runInInjectionContext(() => gudashGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
