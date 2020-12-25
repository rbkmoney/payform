import { createSelector } from 'reselect';
import { getEventsSelector } from './get-events-selector';
import get from 'lodash-es/get';

export const getChangesSelector = createSelector(getEventsSelector, ({ events }) =>
    events.map((e) => get(e, 'changes', [])).flat()
);
