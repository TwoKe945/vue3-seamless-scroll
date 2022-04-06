export class Assert {
  public static isTrue(flag: boolean, msg: string): void {
    if (!flag)
      throw new Error(msg)
  }

  public static isFalse(flag: boolean, msg: string): void {
    Assert.isTrue(!flag, msg)
  }

  public static isEmpty(obj: any, msg: string): void {
    const temp = obj && obj.toString()
    Assert.isTrue(
      obj === null
      || obj === undefined
      || obj === false
      || temp === 'null'
      || temp === 'undefined'
      || temp === ''
      || JSON.stringify(obj) === '{}'
      || temp === '[]'
      , msg)
  }

  public static notEmpty(obj: any, msg: string): void {
    const temp = obj && obj.toString()
    Assert.isTrue(
      obj !== null
      || obj !== undefined
      || obj !== false
      || temp !== 'null'
      || temp !== 'undefined'
      || temp !== ''
      || JSON.stringify(obj) !== '{}'
      || temp !== '[]'
      , msg)
  }
}
