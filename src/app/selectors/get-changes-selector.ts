import { createSelector } from 'reselect';
import { getEventsSelector } from './get-events-selector';

export const getChangesSelector = createSelector(getEventsSelector, ({ events }) =>
    events.map((e) => e.changes).flat()
);
