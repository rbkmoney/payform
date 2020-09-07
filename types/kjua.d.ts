declare module 'kjua' {
    interface KjuaOptions {
        // render method: 'canvas' or 'image'
        render?: 'canvas' | 'image';

        // render pixel-perfect lines
        crisp?: true;

        // minimum version: 1..40
        minVersion?: number;

        // error correction level: 'L', 'M', 'Q' or 'H'
        ecLevel?: 'L' | 'M' | 'Q' | 'H';

        // size in pixel
        size?: number;

        // pixel-ratio, null for devicePixelRatio
        ratio?: number;

        // code color
        fill?: string;

        // background color
        back?: string;

        // content
        text: string;

        // roundend corners in pc: 0..100
        rounded?: number;

        // quiet zone in modules
        quiet?: number;

        // modes: 'plain', 'label' or 'image'
        mode?: 'plain' | 'label' | 'image';

        // label/image size and pos in pc: 0..100
        mSize?: number;
        mPosX?: number;
        mPosY?: number;

        // label
        label?: string;
        fontname?: string;
        fontcolor?: string;

        // image element
        image?: HTMLImageElement;
    }

    function kjua<T extends KjuaOptions['render'] = 'image'>(
        options: KjuaOptions & { render?: T }
    ): T extends 'canvas' ? HTMLCanvasElement : HTMLImageElement;
    namespace kjua {
        export { KjuaOptions as Options };
    }
    export = kjua;
}
