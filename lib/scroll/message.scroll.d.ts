import type { ExtractPropTypes, PropType } from 'vue';
declare const messageScrollProps: {
    messages: {
        type: PropType<string[]>;
        required: boolean;
    };
    messageFormat: {
        type: PropType<(message: string) => string>;
        default: (message: string) => string;
    };
    to: {
        type: PropType<"top" | "left" | "bottom" | "right">;
        default: string;
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
    enable: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare type MessageScrollProps = ExtractPropTypes<typeof messageScrollProps>;
export declare function defineMessageScroll(): import("vue").DefineComponent<{
    messages: {
        type: PropType<string[]>;
        required: boolean;
    };
    messageFormat: {
        type: PropType<(message: string) => string>;
        default: (message: string) => string;
    };
    to: {
        type: PropType<"top" | "left" | "bottom" | "right">;
        default: string;
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
    enable: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    messages: {
        type: PropType<string[]>;
        required: boolean;
    };
    messageFormat: {
        type: PropType<(message: string) => string>;
        default: (message: string) => string;
    };
    to: {
        type: PropType<"top" | "left" | "bottom" | "right">;
        default: string;
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
    enable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    messageFormat: (message: string) => string;
    to: "top" | "left" | "bottom" | "right";
    dishover: boolean;
    enable: boolean;
}>;
/**
 * 公告消息滚动滚动组件
 */
export declare const MessageScroll: import("vue").DefineComponent<{
    messages: {
        type: PropType<string[]>;
        required: boolean;
    };
    messageFormat: {
        type: PropType<(message: string) => string>;
        default: (message: string) => string;
    };
    to: {
        type: PropType<"top" | "left" | "bottom" | "right">;
        default: string;
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
    enable: {
        type: BooleanConstructor;
        default: boolean;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    messages: {
        type: PropType<string[]>;
        required: boolean;
    };
    messageFormat: {
        type: PropType<(message: string) => string>;
        default: (message: string) => string;
    };
    to: {
        type: PropType<"top" | "left" | "bottom" | "right">;
        default: string;
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
    enable: {
        type: BooleanConstructor;
        default: boolean;
    };
}>>, {
    messageFormat: (message: string) => string;
    to: "top" | "left" | "bottom" | "right";
    dishover: boolean;
    enable: boolean;
}>;
export {};
