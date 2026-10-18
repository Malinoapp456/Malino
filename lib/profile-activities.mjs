/**
 * Collections used to be stored in device-global localStorage keys, so two
 * children saw each other's puzzles. New collections live inside profileData.
 */
export const legacyActivityKeys = Object.freeze({
  savedCraftPuzzles: "malino:craftPuzzles:v1",
  savedMazes: "malino:mazes:v1",
  savedDifferences: "malino:differences:v1",
  savedHidden: "malino:hidden:v1",
  savedNumberArt: "malino:numberArt:v1"
});

export const activityFields = Object.keys(legacyActivityKeys);

/** Preserve any already-profile-owned collection when migrating older installs. */
export function migrateLegacyActivities(profileData, ownerProfileId, legacy) {
  if (!legacy || !ownerProfileId) return profileData;
  const oldProfile = profileData?.[ownerProfileId] || {};
  const profile = { ...oldProfile };
  let changed = false;
  for (const field of activityFields) {
    const oldItems = legacy[field];
    if (!Array.isArray(oldItems) || oldItems.length === 0) continue;
    if (Array.isArray(profile[field]) && profile[field].length > 0) continue;
    profile[field] = oldItems;
    changed = true;
  }
  return changed ? { ...(profileData || {}), [ownerProfileId]: profile } : profileData;
}

/** Keep the UI safe if older user data has missing or invalid collections. */
export function profileActivities(profileData, profileId) {
  const data = profileData?.[profileId] || {};
  return Object.fromEntries(activityFields.map(field => [
    field, Array.isArray(data[field]) ? data[field] : []
  ]));
}
