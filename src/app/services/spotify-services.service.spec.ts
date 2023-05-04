import { TestBed } from '@angular/core/testing';

import { SpotifyServicesService } from './spotify-services.service';

describe('SpotifyServicesService', () => {
  let service: SpotifyServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpotifyServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
