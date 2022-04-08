declare class Assert {
    static isTrue(flag: boolean, msg: string): void;
    static isFalse(flag: boolean, msg: string): void;
    static isEmpty(obj: any, msg: string): void;
    static notEmpty(obj: any, msg: string): void;
}
export { Assert, };
export default Assert;
