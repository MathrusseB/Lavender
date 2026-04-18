export const siteConfig = {
  cabinsEnabled: false,
  gatheringItems: {
    equineStays: true,
    familyGatherings: true,
    privateRetreats: true,
    seasonalVisits: true,
    otherUses: true,
  },
  notesEnabled: true,
} as const;

export type SiteConfig = typeof siteConfig;
