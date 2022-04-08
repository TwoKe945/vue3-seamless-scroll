import { defineComponent, ref, computed, watch, onMounted, onUnmounted, h, nextTick, renderList } from 'vue';

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

/**
 * 滚动策略
 */
const STRATEGY_FACTORY = {
    top: {
        style: step => ({
            transform: `translateY(-${step}px)`,
            flexDirection: 'column',
        }),
        isOverflow: (stepCount, size) => Math.abs(stepCount) >= size.height,
        start: () => 0,
    },
    bottom: {
        style: step => ({
            transform: `translateY(${step}px)`,
            flexDirection: 'column',
        }),
        isOverflow: stepCount => Math.abs(stepCount) <= 0,
        start: size => -size.height,
    },
    left: {
        style: step => ({
            transform: `translateX(-${step}px)`,
            flexDirection: 'row',
        }),
        isOverflow: (stepCount, size) => Math.abs(stepCount) >= size.width,
        start: () => 0,
    },
    right: {
        style: step => ({
            transform: `translateX(${step}px)`,
            flexDirection: 'row',
        }),
        isOverflow: stepCount => Math.abs(stepCount) <= 0,
        start: size => -size.width,
    },
};
const seamlessScrollProps = {
    to: {
        type: String,
        default: 'top',
    },
    duration: {
        type: Number,
        default: 17,
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
    sleep: {
        type: Number,
        default: 120,
    },
};
function defineSeamlessScroll() {
    return defineComponent({
        props: seamlessScrollProps,
        setup(props, ctx) {
            // 滚动区域
            const rollArea = ref();
            // 滚动计步数
            const stepCount = ref();
            const scrolling = ref(true);
            const toggleScroll = function (flag) {
                scrolling.value = flag;
            };
            const enableTransition = ref(true);
            let rollTimer;
            const rect = ref({ width: 0, height: 0 });
            const strategy = STRATEGY_FACTORY[props.to];
            /**
             * 检查是否超出边界
             */
            const isOverflow = computed(() => strategy.isOverflow(stepCount.value, rect.value));
            /**
             * 移动
             */
            function move(startStep = 0) {
                if (!scrolling.value)
                    return;
                if (isOverflow.value) {
                    enableTransition.value = false;
                    stepCount.value = startStep;
                    const timer = setTimeout(() => {
                        enableTransition.value = true;
                        clearTimeout(timer);
                    }, props.sleep);
                }
                stepCount.value += 1;
            }
            const rollContainerStyle = ref({});
            /**
             * 初始化元素尺寸
             */
            function initElementSize() {
                var _a;
                const dom = (_a = rollArea.value) === null || _a === void 0 ? void 0 : _a.children[0];
                const width = dom === null || dom === void 0 ? void 0 : dom.offsetWidth;
                const height = dom === null || dom === void 0 ? void 0 : dom.offsetHeight;
                rect.value = { width, height };
            }
            const stopWatchRollArea = watch(rollArea, () => initElementSize());
            const stopWatchRect = watch(rect, (value) => {
                const style = {
                    overflow: 'hidden',
                    width: props.width || `${value.width}px`,
                    height: props.height || `${value.height}px`,
                };
                rollContainerStyle.value = Object.assign(Object.assign({}, rollContainerStyle.value), style);
            });
            function start() {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log('111111');
                    if (rollTimer)
                        clearTimeout(rollTimer);
                    yield nextTick();
                    initElementSize();
                    stepCount.value = strategy.start(rect.value);
                    rollTimer = setInterval(() => move(strategy.start(rect.value)), props.duration);
                });
            }
            onMounted(() => __awaiter(this, void 0, void 0, function* () {
                start();
                window.addEventListener('resize', start);
            }));
            onUnmounted(() => {
                if (rollTimer)
                    clearInterval(rollTimer);
                stopWatchRollArea();
                stopWatchRect();
                window.removeEventListener('resize', start);
            });
            const style = computed(() => {
                return enableTransition.value
                    ? Object.assign({ transition: `all ${props.duration}ms`, display: 'flex' }, strategy.style(stepCount.value)) : Object.assign({ display: 'flex' }, strategy.style(stepCount.value));
            });
            return () => {
                var _a, _b;
                const slot = (_b = (_a = ctx.slots).default) === null || _b === void 0 ? void 0 : _b.call(_a);
                Assert.notEmpty(slot, 'SeamlessScroll: You must provide a default slot');
                Assert.isTrue(slot.length === 1, 'SeamlessScroll: You must provide only one default slot');
                const Comp = slot[0].type;
                const compProps = slot[0].props;
                const compChildren = slot[0].children;
                return h('div', {
                    style: rollContainerStyle.value,
                    onMouseover: () => props.dishover && toggleScroll(false),
                    onMouseout: () => props.dishover && toggleScroll(true),
                }, h('div', {
                    ref: rollArea,
                    style: style.value,
                }, [
                    h(Comp, Object.assign({}, compProps), compChildren),
                    h(Comp, Object.assign({}, compProps), compChildren),
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
    return defineComponent({
        props: messageScrollProps,
        setup(props) {
            const innerHTML = computed(() => props.messages.map(props.messageFormat).join(''));
            return () => h(SeamlessScroll, Object.assign({}, props), {
                default: h('div', { style: 'white-space: nowrap;', innerHTML: innerHTML.value }),
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
    return defineComponent({
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
            return () => h('div', {
                class: tableClass,
            }, [
                h('ul', {
                    class: headerClass,
                    style: mergeStyle(defaultHeadStyle, {}),
                }, renderList(columns, col => h('li', {
                    class: cellClass,
                    style: mergeStyle(defaultColumnStyle(col), col.style),
                }, col.title))),
                h(SeamlessScroll, Object.assign(Object.assign({}, props), { class: bodyClass }), h('div', {}, renderList(props.data, data => h('ul', {
                    class: bodyRowClass,
                    onClick: () => ctx.emit('clickItem', data),
                    style: mergeStyle(defaultRowStyle, {}),
                }, renderList(columns, col => h('li', {
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

export { Assert, MessageScroll, SeamlessScroll, install as default, defineColumns, defineTableScroll };
