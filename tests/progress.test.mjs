import test from "node:test";
import assert from "node:assert/strict";
import { advanceDailyUsage, hasVisiblePaint } from "../lib/progress.mjs";
import { remainingPinLockMs, recordFailedPin } from "../lib/parent-pin.mjs";
import { artworkKey } from "../lib/artwork-storage.mjs";

test("minutes increment within one day", () => {
  assert.deepEqual(advanceDailyUsage({date:"2026-10-18",minutes:29}, "2026-10-18", 1),
    {date:"2026-10-18",minutes:30});
});

test("minutes reset at midnight even while the page remains open", () => {
  assert.deepEqual(advanceDailyUsage({date:"2026-10-18",minutes:90}, "2026-10-19", 1),
    {date:"2026-10-19",minutes:1});
  assert.deepEqual(advanceDailyUsage(null, "2026-10-19"),
    {date:"2026-10-19",minutes:0});
});

test("paint validation detects actual alpha pixels", () => {
  assert.equal(hasVisiblePaint(new Uint8ClampedArray([255,0,0,0,0,0,0,0])), false);
  assert.equal(hasVisiblePaint(new Uint8ClampedArray([0,0,0,205])), true);
});

test("PIN temporarily locks after five incorrect attempts", () => {
  const now = 1000000;
  let state = { count: 0, lockedUntil: 0 };
  for (let i = 0; i < 5; i++) state = recordFailedPin(state, now);
  assert.equal(remainingPinLockMs(state, now), 60000);
  assert.equal(recordFailedPin(state, now + 1000), state);
  assert.deepEqual(recordFailedPin(state, now + 61000), { count: 1, lockedUntil: 0 });
});

test("artwork keys isolate profiles", () => {
  assert.notEqual(artworkKey("kid-1", "fox"), artworkKey("kid-2", "fox"));
});
