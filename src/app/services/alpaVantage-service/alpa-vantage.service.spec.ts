import { TestBed } from '@angular/core/testing';

import { AlpaVantageService } from './alpa-vantage.service';

describe('AlpaVantageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AlpaVantageService = TestBed.get(AlpaVantageService);
    expect(service).toBeTruthy();
  });
});
