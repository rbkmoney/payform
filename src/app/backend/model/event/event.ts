export abstract class Event<T> {
    id: number;
    createdAt: string;
    changes: T[];
}
