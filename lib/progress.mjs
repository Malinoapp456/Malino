/** Store screen time by calendar day, not by time since page load. */
export function advanceDailyUsage(record, dateKey, increment = 0) {
  const prior = record && record.date === dateKey && Number.isFinite(Number(record.minutes))
    ? Math.max(0, Number(record.minutes))
    : 0;
  return { date: dateKey, minutes: prior + Math.max(0, increment) };
}

/** A transparent paint layer contains actual artwork only when at least one pixel is visible. */
export function hasVisiblePaint(rgba) {
  for (let i = 3; i < rgba.length; i += 4) {
    if (rgba[i] !== 0) return true;
  }
  return false;
}
