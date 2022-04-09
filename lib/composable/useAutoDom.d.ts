import type { Ref } from 'vue';
/**
 * 自动填充宽高
 */
export declare function useAutoDOM(elRef: Ref<HTMLElement | undefined>, fn?: (el: Ref<HTMLElement>, width: number, height: number) => void): {
    resize: () => void;
};
