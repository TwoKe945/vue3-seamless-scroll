/**
 * 元素接口
 */
export interface ElementSize {
    width: number;
    height: number;
}
/**
 * 滚动策略接口
 */
export interface ScrollStrategy {
    type: () => string;
    style: (step: number) => {
        transform?: string;
        flexDirection?: string;
        width?: string;
        height?: string;
    };
    isOverflow: (stepCount: number, size: ElementSize) => boolean;
    start: (size: ElementSize) => number;
}
export interface Column {
    title: string;
    key: string;
    width: string;
    style?: any;
}
/**
 * 可视区域大小
 */
export interface ViewPort {
    width: string;
    height: string;
}
/**
 * 滚动的容器数据
 */
export interface Container {
    el: HTMLDivElement;
    width: number;
    height: number;
}
/**
 * 滚动的内容数据
 */
export interface Content {
    el: HTMLDivElement;
    width: number;
    height: number;
}
/**
 * 滚动组件的全局上下文
 */
export interface Context {
    container: Container;
    content: Content;
    viewport: ViewPort;
}
