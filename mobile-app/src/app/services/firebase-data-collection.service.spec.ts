import { TestBed } from '@angular/core/testing';

import { FirebaseDataCollectionService } from './firebase-data-collection.service';

describe('FirebaseDataCollectionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirebaseDataCollectionService = TestBed.get(FirebaseDataCollectionService);
    expect(service).toBeTruthy();
  });
});
