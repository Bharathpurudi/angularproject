import { TestBed } from '@angular/core/testing';

import { AuthenticateGuardGuard } from './authenticate-guard.guard';

describe('AuthenticateGuardGuard', () => {
  let guard: AuthenticateGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthenticateGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
