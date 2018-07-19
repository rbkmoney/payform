export interface Transport {
    emit(eventName: string, data?: object): void;

    on(eventName: string, callback: (data: object) => void): void;

    destroy(): void;
}
