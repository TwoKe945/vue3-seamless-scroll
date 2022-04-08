import type { ExtractPropTypes, PropType } from 'vue';
declare const seamlessScrollProps: {
    to: {
        type: PropType<"top" | "left" | "right" | "bottom">;
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
};
export declare type SeamlessScrollProps = ExtractPropTypes<typeof seamlessScrollProps>;
/**
 * 无缝滚动组件
 */
export declare const SeamlessScroll: import("vue").DefineComponent<{
    to: {
        type: PropType<"top" | "left" | "right" | "bottom">;
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
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    to: {
        type: PropType<"top" | "left" | "right" | "bottom">;
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
}>>, {
    to: "top" | "left" | "right" | "bottom";
    duration: number;
    dishover: boolean;
    sleep: number;
}>;
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
        type: PropType<"top" | "left" | "right" | "bottom">;
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
};
export declare type MessageScrollProps = ExtractPropTypes<typeof messageScrollProps>;
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
        type: PropType<"top" | "left" | "right" | "bottom">;
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
        type: PropType<"top" | "left" | "right" | "bottom">;
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
}>>, {
    to: "top" | "left" | "right" | "bottom";
    duration: number;
    dishover: boolean;
    sleep: number;
    messageFormat: (message: string) => string;
}>;
export interface Column {
    title: string;
    key: string;
    width: string;
    style?: any;
}
export declare type RowData<Columns extends readonly Column[]> = {
    [key in Columns[number]['key']]: any;
};
/**
 *  定义列
 * @param columns
 * @returns
 */
export declare function defineColumns<T extends Column>(columns: readonly T[]): readonly T[];
/**
 * 表格滚动组件
 * @returns
 */
export declare function defineTableScroll<T>(columns: readonly Column[], formatStyle?: (key: string, value: any) => any, tableClass?: string, headerClass?: string, bodyClass?: string, cellClass?: string, bodyRowClass?: string): import("vue").DefineComponent<{
    data: {
        type: PropType<T[]>;
        required: true;
    };
    to: {
        type: PropType<"top" | "left" | "right" | "bottom">;
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
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<ExtractPropTypes<{
    data: {
        type: PropType<T[]>;
        required: true;
    };
    to: {
        type: PropType<"top" | "left" | "right" | "bottom">;
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
}>>, {
    to: "top" | "left" | "right" | "bottom";
    duration: number;
    dishover: boolean;
    sleep: number;
}>;
export {};
