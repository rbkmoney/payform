import last from 'lodash-es/last';
import clone from 'lodash-es/clone';

interface ChangeLike {
    changeType: any;
}

interface EventLike {
    id: number;
    changes: ChangeLike[];
}

// TODO fix it
export const mergeEvents = (stateEvents: EventLike[], actionEvents: EventLike[]): EventLike[] => {
    const first = actionEvents[0];
    const sliced = stateEvents ? stateEvents.slice(0, first ? first.id : undefined) : [];
    return sliced.concat(actionEvents);
};

export const getLastChange = (e: EventLike[]): ChangeLike => {
    const event = last(e);
    if (!event) {
        return;
    }
    return last(event.changes);
};

export const findChange = (e: EventLike[], foundType: string): ChangeLike => {
    if (!e || e.length === 0 || !foundType) {
        return null;
    }
    let result = null;
    const found = clone(e).reverse().find((event) => {
        const changes = event.changes.reverse();
        const foundChange = changes.find((change) => change.changeType === foundType);
        if (foundChange) {
            result = foundChange;
            return true;
        }
        return false;
    });
    return found ? result : null;
};
