interface Change {
    changeType: any;
}

export abstract class Event<T extends Change = Change> {
    id: number;
    createdAt: string;
    changes: T[];
}
