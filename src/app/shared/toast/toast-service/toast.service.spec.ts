import { TestBed } from '@angular/core/testing';

import { MatToastService } from './mat-toast.service';

describe('ToastService', () => {
  let service: MatToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
