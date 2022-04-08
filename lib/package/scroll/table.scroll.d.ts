import type { PropType } from 'vue';
import type { Column } from '../types';
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
}>, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    data: {
        type: PropType<T[]>;
        required: true;
    };
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
