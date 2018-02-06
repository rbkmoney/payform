declare module 'fingerprintjs2' {

    export default class Fingerprint2 {
        static VERSION: string;
        constructor(options?: Fingerprint2Options);

        get(callback: (result: string, components: [{ key: string, value: string }]) => void): number;
    }

    export interface Fingerprint2Options {
        swfContainerId?: string;
        swfPath?: string;
        userDefinedFonts?: string[];
        excludeUserAgent?: boolean;
        excludeLanguage?: boolean;
        excludeColorDepth?: boolean;
        excludeScreenResolution?: boolean;
        excludeTimezoneOffset?: boolean;
        excludeSessionStorage?: boolean;
        excludeIndexedDB?: boolean;
        excludeAddBehavior?: boolean;
        excludeOpenDatabase?: boolean;
        excludeCpuClass?: boolean;
        excludePlatform?: boolean;
        excludeDoNotTrack?: boolean;
        excludeCanvas?: boolean;
        excludeWebGL?: boolean;
        excludeAdBlock?: boolean;
        excludeHasLiedLanguages?: boolean;
        excludeHasLiedResolution?: boolean;
        excludeHasLiedOs?: boolean;
        excludeHasLiedBrowser?: boolean;
        excludeJsFonts?: boolean;
        excludeFlashFonts?: boolean;
        excludePlugins?: boolean;
        excludeIEPlugins?: boolean;
        excludeTouchSupport?: boolean;
        excludePixelRatio?: boolean;
        excludeHardwareConcurrency?: boolean;
    }
}
