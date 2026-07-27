# Placings Table: Expandable Per-Show Breakdown

## Confirmed Intent

- **Outcome:** Rows in the Placings table expand in place to show how the combo's points were earned, per show
- **User:** Anyone viewing the standings/placings table — they currently see only totals (`totalPoints`, `totalShows`) with no way to see the breakdown
- **Why now:** The `points` data is already fetched by `riderComboPlacingsArgs` but rendered nowhere — it's free to display
- **Success:** Each row has a chevron; clicking it expands a sub-table with column headers **Show Name / Type / Place / Points**, one row per entry in that combo's `points` array; clicking again collapses
- **Out of scope:** Changing the Prisma query (data's already there), linking to show detail pages, "expand all" as a feature, any restyle of the parent table

### Confirmed minor decisions

1. Combo with an empty `points` array → no chevron rendered (nothing to show)
2. Sub-row order → as returned by the query (no date field exists to sort by)
3. `place: 'E'` (and other non-numeric placings) → displayed as-is
4. Chevron lives in a new narrow leading column with an empty header cell

### Nested data shape (already selected in `src/server/prisma/queries/riders.ts`)

```ts
points: Array<{
  uid: string;
  points: number;
  place: string; // not always numeric — 'E' (eliminated) occurs
  show: { uid: string; showName: string; showType: string };
}>
```

## Implementation Plan

### File 1: `src/components/tables/Placings.tsx` (only file changed)

**1. Add imports**

- `import { ChevRight } from '@/components/icons';` (JSX element export, same usage as in `Table.tsx`)

**2. Add a leading expander column** as the first entry in the header group's `columns` array:

- `id: 'expander'`, `header: () => null` (renders an empty `<th>`; the depth-0 group header spans it automatically, so no layout shift)
- Cell: if `row.original.points.length === 0`, render nothing. Otherwise render a `btn btn-ghost btn-xs` button using `row.getToggleExpandedHandler()`, containing `ChevRight` wrapped in a span with `transition-transform` and conditional `rotate-90` when `row.getIsExpanded()`
- Accessibility: `aria-expanded={row.getIsExpanded()}` and an `aria-label` ("Show point breakdown" / "Hide point breakdown")

**3. Update `rowRender`** — inside the existing `<Fragment>`, after the main `<tr>`, conditionally render the expanded row:

```tsx
{row.getIsExpanded() && (
  <tr>
    <td colSpan={row.getVisibleCells().length} className='bg-base-200/40 p-0'>
      <table className='table table-xs'>
        <thead>
          <tr>
            <th>Show Name</th><th>Type</th><th>Place</th><th>Points</th>
          </tr>
        </thead>
        <tbody>
          {row.original.points.map(p => (
            <tr key={p.uid}>
              <td>{p.show.showName}</td>
              <td>{p.show.showType}</td>
              <td>{p.place}</td>
              <td>{p.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </td>
  </tr>
)}
```

Notes:

- `colSpan={row.getVisibleCells().length}` automatically accounts for the hidden `showYear` column and the new expander column — no hardcoded number
- `key={p.uid}` — the point entry's cuid, stable and unique
- `table-xs` keeps the sub-table visually subordinate to the parent

**4. Remove the debug line**

- Delete `console.dir(riders, { depth: 400 });`

### What does NOT change

- `src/server/prisma/queries/riders.ts` — `points` is already selected
- `BaseTable.tsx` / `Table.tsx` — `getExpandedRowModel()` is already passed through `extraTableOpts`; expansion state is handled internally by TanStack, no controlled state needed
- Filtering/pagination behavior — expansion is orthogonal; TanStack tracks expanded state by row id, so it survives page changes

### Verification

1. `pnpm tsc --noEmit` (or project's typecheck script) and `pnpm lint`
2. Manual: standings page → chevron appears on rows with shows, absent on rows without; expand a multi-show row (3 shows, incl. `'E'` placings) → 3 sub-rows; `rotate-90` animates; collapse works
3. Switch the year filter → expanded content matches the newly filtered rows
4. Optional: a Jest/RTL test asserting expand/collapse toggles the sub-table (`jest.config.ts` exists; check for an existing table test pattern first)

### Edge case

The expander column adds a narrow leading column to the table — if any other consumer of this table hardcodes column counts, it would shift. `PlacingsTable` is the only consumer of this component, and `colSpan` is computed dynamically, so this is safe.
