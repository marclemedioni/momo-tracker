import { Location, Parcel } from "@momo-tracker/models";

export class StorageAllocator {
  private locations: Location[];

  constructor(locations: Location[]) {
    this.locations = locations;
  }

  findBestZone(parcelSize: Parcel['size']): Location | null {
    // Trier les zones en fonction de la capacité restante pour la taille donnée, puis par la capacité restante globale
    const sortedZones = this.locations.sort((a, b) => {
      const sizeCapacityDiff = a.capacity[parcelSize] - a.currentLoad[parcelSize] - (b.capacity[parcelSize] - b.currentLoad[parcelSize]);
      if (sizeCapacityDiff !== 0) return sizeCapacityDiff;

      // Calculer la charge totale actuelle pour le tri secondaire
      const totalLoadA = Object.values(a.currentLoad).reduce((sum, current) => sum + current, 0);
      const totalLoadB = Object.values(b.currentLoad).reduce((sum, current) => sum + current, 0);
      return totalLoadA - totalLoadB;
    });

    // Essayer de placer le colis dans la zone la plus adaptée pour sa taille
    for (const zone of sortedZones) {
      if (zone.capacity[parcelSize] > zone.currentLoad[parcelSize]) {
        return zone;
      }
    }

    // Si aucune zone n'est trouvée pour la taille exacte, essayer de placer dans une zone de taille supérieure
    if (parcelSize === 'small' || parcelSize === 'medium') {
      const largerSize: Parcel['size'] = parcelSize === 'small' ? 'medium' : 'large';
      return this.findBestZone(largerSize);
    }

    // Si aucune zone n'est disponible, retourner null
    return null;
  }
}
