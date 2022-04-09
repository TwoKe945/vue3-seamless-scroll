import type { Container, Content, ViewPort } from '../types';
declare function useContext(): {
    seamlessContext: import("vue").Ref<{
        container: {
            el: HTMLDivElement;
            width: number;
            height: number;
        };
        content: {
            el: HTMLDivElement;
            width: number;
            height: number;
        };
        viewport: {
            width: string;
            height: string;
        };
    }>;
    viewportConfig: import("vue").ComputedRef<{
        width: string;
        height: string;
    }>;
    containerConfig: import("vue").ComputedRef<{
        el: HTMLDivElement;
        width: number;
        height: number;
    }>;
    contentConfig: import("vue").ComputedRef<{
        el: HTMLDivElement;
        width: number;
        height: number;
    }>;
    setContainer: (container: Container) => void;
    setContent: (content: Content) => void;
    setViewPort: (viewport: ViewPort) => void;
};
export { useContext, };
