import type { Ref } from 'vue';
/**
 * 窗口变化比例
 */
export declare function useResizeRatio(standardWidth?: number, standardHeight?: number): {
    widthRatio: import("vue").ComputedRef<number>;
    heightRatio: import("vue").ComputedRef<number>;
};
/**
 * 自动调整元素大小
 */
export declare function useAutoResize<T extends HTMLElement>(el: T | Ref<T | undefined>, standardWidth?: number, standardHeight?: number): void;
