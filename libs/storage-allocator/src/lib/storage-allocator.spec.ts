import { StorageAllocator } from './storage-allocator';

describe('storageAllocator', () => {
  it('should work', () => {
    expect(new StorageAllocator([])).toEqual('storage-allocator');
  });
});
