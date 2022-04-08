import type { ScrollStrategy } from '../types';
export declare enum ScrollStrategyType {
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right"
}
declare const SCROLL_STRATEGY: Map<"top" | "left" | "bottom" | "right", ScrollStrategy>;
export { SCROLL_STRATEGY, };
