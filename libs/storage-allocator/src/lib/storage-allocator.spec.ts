import { StorageAllocator } from "./storage-allocator";

describe('StorageAllocator', () => {
  let allocator: StorageAllocator;

  beforeEach(() => {
    // Initialisation de l'allocator avec des données de test
    const testZones: Zone[] = [
      { id: '1', name: 'Zone A', capacity: { small: 2, medium: 2, large: 1 }, currentLoad: { small: 1, medium: 1, large: 0 } },
      { id: '2', name: 'Zone B', capacity: { small: 3, medium: 1, large: 1 }, currentLoad: { small: 2, medium: 0, large: 1 } },
      // Plus de zones peuvent être ajoutées ici si nécessaire
    ];
    allocator = new StorageAllocator(testZones);
  });

  it('should allocate a small parcel to the best zone', () => {
    const bestZone = allocator.findBestZone('small');
    expect(bestZone).toBeDefined();
    expect(bestZone?.name).toBe('Zone A'); // Zone A a plus de place pour les petits colis
  });

  it('should allocate a medium parcel to the best zone', () => {
    const bestZone = allocator.findBestZone('medium');
    expect(bestZone).toBeDefined();
    expect(bestZone?.name).toBe('Zone A'); // Zone A a plus de place pour les colis moyens
  });

  it('should allocate a large parcel to the best zone', () => {
    const bestZone = allocator.findBestZone('large');
    expect(bestZone).toBeDefined();
    expect(bestZone?.name).toBe('Zone A'); // Zone A a de la place pour les grands colis
  });

  it('should allocate a small parcel to a medium spot when no small spots are available', () => {
    // Remplir tous les espaces petits dans toutes les zones
    allocator.zones.forEach(zone => zone.currentLoad.small = zone.capacity.small);

    const bestZone = allocator.findBestZone('small');
    expect(bestZone).toBeDefined();
    expect(bestZone?.name).toBe('Zone A'); // Zone A devrait encore avoir de la place dans les espaces moyens
  });

  it('should return null when no space is available', () => {
    // Remplir toutes les zones à capacité
    allocator.zones.forEach(zone => {
      zone.currentLoad.small = zone.capacity.small;
      zone.currentLoad.medium = zone.capacity.medium;
      zone.currentLoad.large = zone.capacity.large;
    });

    const bestZone = allocator.findBestZone('small');
    expect(bestZone).toBeNull(); // Aucune zone disponible
  });

  // D'autres tests peuvent être ajoutés ici pour couvrir plus de scénarios
});
