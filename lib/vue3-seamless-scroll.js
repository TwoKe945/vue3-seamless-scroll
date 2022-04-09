(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.SeamlessScroll = {}, global.Vue));
})(this, (function (exports, vue) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class Assert {
        static isTrue(flag, msg) {
            if (!flag)
                throw new Error(msg);
        }
        static isFalse(flag, msg) {
            Assert.isTrue(!flag, msg);
        }
        static isEmpty(obj, msg) {
            const temp = obj && obj.toString();
            Assert.isTrue(obj === null
                || obj === undefined
                || obj === false
                || temp === 'null'
                || temp === 'undefined'
                || temp === ''
                || JSON.stringify(obj) === '{}'
                || temp === '[]', msg);
        }
        static notEmpty(obj, msg) {
            const temp = obj && obj.toString();
            Assert.isTrue(obj !== null
                || obj !== undefined
                || obj !== false
                || temp !== 'null'
                || temp !== 'undefined'
                || temp !== ''
                || JSON.stringify(obj) !== '{}'
                || temp !== '[]', msg);
        }
    }

    var ScrollStrategyType;
    (function (ScrollStrategyType) {
        ScrollStrategyType["TOP"] = "top";
        ScrollStrategyType["BOTTOM"] = "bottom";
        ScrollStrategyType["LEFT"] = "left";
        ScrollStrategyType["RIGHT"] = "right";
    })(ScrollStrategyType || (ScrollStrategyType = {}));
    class ScrollToTopStrategy {
        type() {
            return ScrollStrategyType.TOP;
        }
        style(move) {
            return {
                top: `-${move}px`,
                flexDirection: 'column',
            };
        }
        isOverflow(stepCount, size) {
            return Math.abs(stepCount) >= size.height;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        start(size) {
            return 0;
        }
    }
    class ScrollToBottomStrategy {
        type() {
            return ScrollStrategyType.BOTTOM;
        }
        style(move) {
            return {
                top: `${move}px`,
                flexDirection: 'column',
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isOverflow(stepCount, size) {
            return Math.abs(stepCount) <= 0;
        }
        start(size) {
            return 0 - size.height;
        }
    }
    class ScrollToLeftStrategy {
        type() {
            return ScrollStrategyType.LEFT;
        }
        style(move) {
            return {
                left: `-${move}px`,
                flexDirection: 'row',
            };
        }
        isOverflow(stepCount, size) {
            return Math.abs(stepCount) >= size.width;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        start(size) {
            return 0;
        }
    }
    class ScrollToRightStrategy {
        type() {
            return ScrollStrategyType.RIGHT;
        }
        style(move) {
            return {
                left: `${move}px`,
                flexDirection: 'row',
            };
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        isOverflow(stepCount, size) {
            return Math.abs(stepCount) <= 0;
        }
        start(size) {
            return 0 - size.width;
        }
    }
    const TO_TOP = new ScrollToTopStrategy();
    const TO_BOTTOM = new ScrollToBottomStrategy();
    const TO_LEFT = new ScrollToLeftStrategy();
    const TO_RIGHT = new ScrollToRightStrategy();
    const SCROLL_STRATEGY = new Map();
    SCROLL_STRATEGY.set(TO_TOP.type(), TO_TOP);
    SCROLL_STRATEGY.set(TO_BOTTOM.type(), TO_BOTTOM);
    SCROLL_STRATEGY.set(TO_LEFT.type(), TO_LEFT);
    SCROLL_STRATEGY.set(TO_RIGHT.type(), TO_RIGHT);

    function tryOnScopeDispose(fn) {
      if (vue.getCurrentScope()) {
        vue.onScopeDispose(fn);
        return true;
      }
      return false;
    }

    const isClient = typeof window !== "undefined";

    function unrefElement(elRef) {
      var _a;
      const plain = vue.unref(elRef);
      return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
    }

    const defaultWindow = isClient ? window : void 0;
    isClient ? window.document : void 0;
    isClient ? window.navigator : void 0;
    isClient ? window.location : void 0;

    const _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
    const globalKey = "__vueuse_ssr_handlers__";
    _global[globalKey] = _global[globalKey] || {};
    _global[globalKey];

    var __getOwnPropSymbols$6 = Object.getOwnPropertySymbols;
    var __hasOwnProp$6 = Object.prototype.hasOwnProperty;
    var __propIsEnum$6 = Object.prototype.propertyIsEnumerable;
    var __objRest$1 = (source, exclude) => {
      var target = {};
      for (var prop in source)
        if (__hasOwnProp$6.call(source, prop) && exclude.indexOf(prop) < 0)
          target[prop] = source[prop];
      if (source != null && __getOwnPropSymbols$6)
        for (var prop of __getOwnPropSymbols$6(source)) {
          if (exclude.indexOf(prop) < 0 && __propIsEnum$6.call(source, prop))
            target[prop] = source[prop];
        }
      return target;
    };
    function useMutationObserver(target, callback, options = {}) {
      const _a = options, { window = defaultWindow } = _a, mutationOptions = __objRest$1(_a, ["window"]);
      let observer;
      const isSupported = window && "IntersectionObserver" in window;
      const cleanup = () => {
        if (observer) {
          observer.disconnect();
          observer = void 0;
        }
      };
      const stopWatch = vue.watch(() => unrefElement(target), (el) => {
        cleanup();
        if (isSupported && window && el) {
          observer = new MutationObserver(callback);
          observer.observe(el, mutationOptions);
        }
      }, { immediate: true });
      const stop = () => {
        cleanup();
        stopWatch();
      };
      tryOnScopeDispose(stop);
      return {
        isSupported,
        stop
      };
    }

    var _a, _b;
    isClient && (window == null ? void 0 : window.navigator) && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.platform) && /iP(ad|hone|od)/.test((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.platform);

    /* eslint-disable prefer-rest-params */
    /**
     * @desc AnimationFrame简单兼容hack
     */
    const animationFrame = () => {
        window.cancelAnimationFrame = (() => {
            return (window.cancelAnimationFrame
                // @ts-expect-error TS2339: Property 'requestAnimationFrame' does not exist on type 'Window'.
                || window.webkitCancelAnimationFrame
                // @ts-expect-error TS2339: Property 'mozCancelAnimationFrame' does not exist on type 'Window'.
                || window.mozCancelAnimationFrame
                // @ts-expect-error TS2339: Property 'oCancelAnimationFrame' does not exist on type 'Window'.
                || window.oCancelAnimationFrame
                // @ts-expect-error TS2339: Property 'msCancelAnimationFrame' does not exist on type 'Window'.
                || window.msCancelAnimationFrame
                || function (id) {
                    return window.clearTimeout(id);
                });
        })();
        window.requestAnimationFrame = (function () {
            return (window.requestAnimationFrame
                // @ts-expect-error TS2339: Property 'requestAnimationFrame' does not exist on type 'Window'.
                || window.webkitCancelAnimationFrame
                // @ts-expect-error TS2339: Property 'mozCancelAnimationFrame' does not exist on type 'Window'.
                || window.mozCancelAnimationFrame
                // @ts-expect-error TS2339: Property 'oCancelAnimationFrame' does not exist on type 'Window'.
                || window.oCancelAnimationFrame
                // @ts-expect-error TS2339: Property 'msCancelAnimationFrame' does not exist on type 'Window'.
                || window.msCancelAnimationFrame
                || function (callback) {
                    return window.setTimeout(callback, 1000 / 60);
                });
        })();
    };
    /**
     * 获取内外边距的真实值（Int）
     * @param num
     * @returns
     */
    function getRealNumber(num) {
        return num ? parseInt(num.replace('px', '')) : 0;
    }
    // 获取dom元素计算后的样式, 兼容IE8
    function getStyle(dom, style) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(dom, null)[style];
        }
        else {
            // @ts-expect-error TS2339 - getComputedStyle is not defined 兼容IE
            return dom === null || dom === void 0 ? void 0 : dom.currentStyle[style];
        }
    }
    function useRequestAnimation(fn, enableTimeout = false, delay = 1000 / 60) {
        animationFrame();
        const framId = vue.ref(null);
        const timerId = vue.ref(null);
        const running = vue.ref(false);
        function clearTimer() {
            if (timerId.value) {
                clearTimeout(timerId.value);
                timerId.value = null;
            }
        }
        function clearAnimation() {
            if (framId.value) {
                cancelAnimationFrame(framId.value);
                framId.value = null;
            }
        }
        const startAnimation = function () {
            return __awaiter(this, void 0, void 0, function* () {
                clearAnimation();
                framId.value = requestAnimationFrame(() => {
                    fn();
                    if (enableTimeout) {
                        clearTimer();
                        timerId.value = setTimeout(() => startAnimation(), delay);
                    }
                    else {
                        startAnimation();
                    }
                });
                running.value = true;
            });
        };
        const stopAnimation = function () {
            clearAnimation();
            if (enableTimeout)
                clearTimer();
        };
        return {
            startAnimation,
            stopAnimation,
            running,
        };
    }

    function initDOM(el, width, height) {
        el.value.style.width = `${width}px`;
        el.value.style.height = `${height}px`;
    }
    /**
     * 自动填充宽高
     */
    function useAutoDOM(elRef, fn = initDOM) {
        const context = vue.ref();
        vue.onMounted(() => __awaiter(this, void 0, void 0, function* () {
            yield vue.nextTick();
            const el = elRef.value;
            context.value = el === null || el === void 0 ? void 0 : el.children[0];
            resize();
            useMutationObserver(context, resize, {
                childList: true,
                subtree: true,
            });
        }));
        function resize() {
            if (context.value) {
                const width = getStyle(context.value, 'width');
                const height = getStyle(context.value, 'height');
                fn(elRef, getRealNumber(width), getRealNumber(height));
            }
        }
        return {
            resize,
        };
    }

    function useContext() {
        const seamlessContext = vue.ref({
            container: {
                el: null,
                width: 0,
                height: 0,
            },
            content: {
                el: null,
                width: 0,
                height: 0,
            },
            viewport: {
                width: '0px',
                height: '0px',
            },
        });
        const viewportConfig = vue.computed(() => seamlessContext.value.viewport);
        const containerConfig = vue.computed(() => seamlessContext.value.container);
        const contentConfig = vue.computed(() => seamlessContext.value.content);
        /**
         *  设置滚动区域
         * @param content
         */
        function setContent(content) {
            seamlessContext.value.content = content;
        }
        /**
         * 设置滚动容器
         * @param container
         */
        function setContainer(container) {
            seamlessContext.value.container = container;
        }
        /**
         * 设置可视窗口
         * @param viewport
         */
        function setViewPort(viewport) {
            seamlessContext.value.viewport = viewport;
        }
        return {
            seamlessContext,
            viewportConfig,
            containerConfig,
            contentConfig,
            setContainer,
            setContent,
            setViewPort,
        };
    }

    const seamlessScrollProps = {
        to: {
            type: String,
            default: 'top',
        },
        dishover: {
            type: Boolean,
            default: true,
        },
        width: {
            type: String,
        },
        height: {
            type: String,
        },
        enable: {
            type: Boolean,
            default: true,
        },
    };
    function defineSeamlessScroll() {
        return vue.defineComponent({
            /**
             * 滚动区域的参数
             */
            props: seamlessScrollProps,
            setup(props, ctx) {
                const { viewportConfig, setContainer, setContent, setViewPort, containerConfig } = useContext();
                const moveLength = vue.ref(0); // 移动的长度
                // 定义滚动容器和内容dom
                const containerRef = vue.ref();
                const contentRef = vue.ref();
                const containerRefStyle = vue.ref({});
                const contentRefStyle = vue.ref({});
                // 容器根据内容自适应
                useAutoDOM(contentRef, (el, width, height) => {
                    setContent({
                        el: contentRef.value,
                        width,
                        height: height * 2,
                    });
                    setContainer({
                        el: containerRef.value,
                        width,
                        height,
                    });
                    setViewPort({
                        width: props.width || `${width}px`,
                        height: props.height || `${height}px`,
                    });
                    contentRefStyle.value = {
                        width: props.width || `${width}px`,
                        height: props.height || `${height * 2}px`,
                    };
                });
                const stopWatchViewport = vue.watch(viewportConfig, (value) => {
                    containerRefStyle.value = {
                        width: value.width,
                        height: value.height,
                    };
                });
                // 默认样式
                const defaultcontainerRefStyle = {
                    position: 'relative',
                    overflow: 'hidden',
                };
                const defaultContentStyle = {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                };
                const scrolling = vue.ref(true);
                const toggleScroll = function (flag) {
                    scrolling.value = flag;
                };
                // 初始化滚动状态
                toggleScroll(props.enable);
                const strategy = SCROLL_STRATEGY.get(props.to);
                const { startAnimation, stopAnimation } = useRequestAnimation(() => {
                    move(strategy.start(containerConfig.value));
                });
                /**
                 * 检查是否超出边界
                 */
                const isOverflow = vue.computed(() => strategy.isOverflow(moveLength.value, containerConfig.value));
                /**
                 * 移动
                 */
                function move(startStep = 0) {
                    if (!scrolling.value)
                        return;
                    if (isOverflow.value)
                        moveLength.value = startStep;
                    moveLength.value += 1;
                }
                vue.watch(() => props.enable, () => {
                    if (props.enable) {
                        startAnimation();
                        toggleScroll(true);
                    }
                    else {
                        stopAnimation();
                        moveLength.value = strategy.start(containerConfig.value);
                        toggleScroll(false);
                    }
                }, {
                    immediate: true,
                });
                const isUpdate = vue.ref(false);
                let updateTimer;
                function updateData(fn) {
                    isUpdate.value = true;
                    if (updateTimer)
                        clearTimeout(updateTimer);
                    updateTimer = setTimeout(() => {
                        fn();
                        isUpdate.value = false;
                    }, 5);
                }
                vue.onMounted(() => __awaiter(this, void 0, void 0, function* () {
                    yield vue.nextTick();
                    moveLength.value = strategy.start(containerConfig.value);
                    startAnimation();
                }));
                vue.onUnmounted(() => {
                    stopAnimation();
                    stopWatchViewport();
                    if (updateTimer)
                        clearTimeout(updateTimer);
                });
                ctx.expose({
                    updateData,
                });
                const contentStyle = vue.computed(() => {
                    return Object.assign(Object.assign({ transition: 'all 16ms inherit', display: 'flex' }, contentRefStyle.value), strategy.style(moveLength.value));
                });
                return () => {
                    var _a, _b;
                    const slot = (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
                    Assert.notEmpty(slot, 'SeamlessScroll: You must provide a default slot');
                    Assert.isTrue(slot.length === 1, 'SeamlessScroll: You must provide only one default slot');
                    const Comp = slot[0].type;
                    const compProps = slot[0].props;
                    const compChildren = slot[0].children;
                    return vue.h('div', {
                        class: 'seamless-scroll-container',
                        ref: containerRef,
                        style: Object.assign(Object.assign({}, defaultcontainerRefStyle), containerRefStyle.value),
                        onMouseover: () => props.enable && props.dishover && toggleScroll(false),
                        onMouseout: () => props.enable && props.dishover && toggleScroll(true),
                    }, vue.h('div', {
                        class: 'seamless-scroll-content',
                        ref: contentRef,
                        style: Object.assign(Object.assign({}, defaultContentStyle), contentStyle.value),
                    }, isUpdate.value
                        ? []
                        : [
                            vue.h(Comp, Object.assign({}, compProps), compChildren),
                            vue.h(Comp, Object.assign({}, compProps), compChildren),
                        ]));
                };
            },
        });
    }
    /**
     * 无缝滚动组件
     */
    const SeamlessScroll = defineSeamlessScroll();

    const messageScrollProps = Object.assign(Object.assign({}, seamlessScrollProps), { messages: {
            type: Array,
            required: true,
        }, messageFormat: {
            type: Function,
            default: (message) => message,
        } });
    function defineMessageScroll() {
        return vue.defineComponent({
            props: messageScrollProps,
            setup(props) {
                const innerHTML = vue.computed(() => props.messages.map(props.messageFormat).join(''));
                return () => vue.h(SeamlessScroll, Object.assign({}, props), {
                    default: vue.h('div', { style: 'white-space: nowrap;', innerHTML: innerHTML.value }),
                });
            },
        });
    }
    /**
     * 公告消息滚动滚动组件
     */
    const MessageScroll = defineMessageScroll();

    function mergeStyle(defaultStyle, style) {
        return Object.assign(Object.assign({}, defaultStyle), style);
    }
    /**
     *  定义列
     * @param columns
     * @returns
     */
    function defineColumns(columns) {
        return columns;
    }
    /**
     * 表格滚动组件
     * @returns
     */
    function defineTableScroll(columns, formatStyle, tableClass = 'table-scroll', headerClass = 'table-scroll-header', bodyClass = 'table-scroll-body', cellClass = 'table-scroll-cell', bodyRowClass = 'table-scroll-row') {
        return vue.defineComponent({
            props: Object.assign(Object.assign({}, seamlessScrollProps), { data: {
                    type: Array,
                    required: true,
                } }),
            setup(props, ctx) {
                const defaultHeadStyle = {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    listStyle: 'none',
                };
                const defaultColumnStyle = (col) => ({
                    textAligin: 'center',
                    width: col.width,
                });
                const defaultRowStyle = {
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    listStyle: 'none',
                };
                return () => vue.h('div', {
                    class: tableClass,
                }, [
                    vue.h('ul', {
                        class: headerClass,
                        style: mergeStyle(defaultHeadStyle, {}),
                    }, vue.renderList(columns, col => vue.h('li', {
                        class: cellClass,
                        style: mergeStyle(defaultColumnStyle(col), col.style),
                    }, col.title))),
                    vue.h(SeamlessScroll, Object.assign(Object.assign({}, props), { class: bodyClass }), vue.h('div', {}, vue.renderList(props.data, data => vue.h('ul', {
                        class: bodyRowClass,
                        onClick: () => ctx.emit('clickItem', data),
                        style: mergeStyle(defaultRowStyle, {}),
                    }, vue.renderList(columns, col => vue.h('li', {
                        class: cellClass,
                        style: Object.assign(Object.assign({}, mergeStyle(defaultColumnStyle(col), col.style)), (formatStyle ? formatStyle(col.key, data[col.key]) : {})),
                    }, data[col.key])))))),
                ]);
            },
        });
    }

    function install(app) {
        app.component('MessageScroll', MessageScroll);
        app.component('SeamlessScroll', SeamlessScroll);
    }

    exports.MessageScroll = MessageScroll;
    exports.SeamlessScroll = SeamlessScroll;
    exports["default"] = install;
    exports.defineColumns = defineColumns;
    exports.defineMessageScroll = defineMessageScroll;
    exports.defineSeamlessScroll = defineSeamlessScroll;
    exports.defineTableScroll = defineTableScroll;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
