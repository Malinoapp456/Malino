import test from "node:test";
import assert from "node:assert/strict";
import {
  legacyActivityKeys, activityFields, migrateLegacyActivities, profileActivities
} from "../lib/profile-activities.mjs";
import { dabStyle } from "../lib/paint-input.mjs";

test("legacy activities migrate only to the selected child's profile", () => {
  const data = {
    alice: { savedMazes: [{ id: "alice-maze" }] },
    bob: { savedHidden: [{ id: "bob-hidden" }] }
  };
  const legacy = { savedCraftPuzzles: [{ id: "old-puzzle" }], savedMazes: [{ id: "legacy-maze" }] };
  const result = migrateLegacyActivities(data, "alice", legacy);
  assert.deepEqual(profileActivities(result, "alice").savedCraftPuzzles, [{ id: "old-puzzle" }]);
  assert.deepEqual(profileActivities(result, "alice").savedMazes, [{ id: "alice-maze" }]);
  assert.deepEqual(profileActivities(result, "bob").savedCraftPuzzles, []);
  assert.deepEqual(profileActivities(result, "bob").savedHidden, [{ id: "bob-hidden" }]);
  assert.deepEqual(data.alice, { savedMazes: [{ id: "alice-maze" }] });
});

test("new children and reset profiles never inherit another child's games", () => {
  const data = { alice: { savedMazes: [{ id: "saved" }] }, bob: {} };
  assert.deepEqual(profileActivities(data, "alice").savedMazes, [{ id: "saved" }]);
  for (const field of activityFields) {
    assert.deepEqual(profileActivities(data, "bob")[field], []);
    assert.deepEqual(profileActivities({ alice: {} }, "alice")[field], []);
  }
});

test("bad legacy collection data is not applied to a child's profile", () => {
  const data = { alice: {} };
  assert.equal(migrateLegacyActivities(data, "alice", { savedHidden: "bad" }), data);
  assert.equal(migrateLegacyActivities(data, null, { savedHidden: [{id:"x"}] }), data);
});

test("all previously global activity keys are covered by migration", () => {
  assert.equal(Object.keys(legacyActivityKeys).length, 5);
  assert.deepEqual([...activityFields].sort(), [
    "savedCraftPuzzles", "savedDifferences", "savedHidden", "savedMazes", "savedNumberArt"
  ]);
});

test("brush, eraser and magic brush work from a single touch", () => {
  assert.deepEqual(dabStyle("brush", "#e44"), {
    radius: 8, composite: "source-over", fill: "#e44"
  });
  assert.deepEqual(dabStyle("eraser", "#e44"), {
    radius: 15, composite: "destination-out", fill: "#000000"
  });
  assert.deepEqual(dabStyle("magic", "#e44", 375), {
    radius: 9, composite: "source-over", fill: "hsl(15 92% 58%)"
  });
});
