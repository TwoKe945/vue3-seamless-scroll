/**
 * @desc AnimationFrame简单兼容hack
 */
export declare const animationFrame: () => void;
/**
 * 获取内外边距的真实值（Int）
 * @param num
 * @returns
 */
export declare function getRealNumber(num: string | undefined): number;
export declare function getStyle(dom: HTMLElement, style: any): any;
export declare function useRequestAnimation(fn: () => void, enableTimeout?: boolean, delay?: number): {
    startAnimation: () => Promise<void>;
    stopAnimation: () => void;
    running: import("vue").Ref<boolean>;
};
