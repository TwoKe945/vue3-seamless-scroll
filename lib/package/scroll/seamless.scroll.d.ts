import type { ExtractPropTypes, PropType } from 'vue';
export declare const seamlessScrollProps: {
    to: {
        type: PropType<"top" | "left" | "bottom" | "right">;
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    dishover: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
    };
    height: {
        type: StringConstructor;
    };
    sleep: {
        type: NumberConstructor;
        default: number;
    };
    enable: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare type SeamlessScrollProps = ExtractPropTypes<typeof seamlessScrollProps>;
export declare function defineSeamlessScroll(): import("vue").DefineComponent<{
    to: {
        type: PropType<"top" | "left" | "bottom" | "right">;
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    dishover: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
    };
    height: {
        type: StringConstructor;
    };
    sleep: {
        type: NumberConstructor;
        default: number;
    };
    enable: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    to: {
        type: PropType<"top" | "left" | "bottom" | "right">;
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    dishover: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
    };
    height: {
        type: StringConstructor;
    };
    sleep: {
        type: NumberConstructor;
        default: number;
    };
    enable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    to: "top" | "left" | "bottom" | "right";
    duration: number;
    dishover: boolean;
    sleep: number;
    enable: boolean;
}>;
/**
 * 无缝滚动组件
 */
export declare const SeamlessScroll: import("vue").DefineComponent<{
    to: {
        type: PropType<"top" | "left" | "bottom" | "right">;
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    dishover: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
    };
    height: {
        type: StringConstructor;
    };
    sleep: {
        type: NumberConstructor;
        default: number;
    };
    enable: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    to: {
        type: PropType<"top" | "left" | "bottom" | "right">;
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    dishover: {
        type: BooleanConstructor;
        default: boolean;
    };
    width: {
        type: StringConstructor;
    };
    height: {
        type: StringConstructor;
    };
    sleep: {
        type: NumberConstructor;
        default: number;
    };
    enable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    to: "top" | "left" | "bottom" | "right";
    duration: number;
    dishover: boolean;
    sleep: number;
    enable: boolean;
}>;
