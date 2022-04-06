import { describe, expect, it } from 'vitest'

import { Assert } from '../src/composables/exception'

describe('Test Assert Utils', () => {
  it('test isTrue(true)', () => {
    expect(
      Assert.isTrue(true, 'Assert.isTrue(true)')).toMatchInlineSnapshot('undefined')
    // expect(Assert.isTrue(false, 'Assert.isTrue(true)')).toThrowErrorMatchingSnapshot()
  })
  it('test isFalse(false)', () => {
    expect(
      Assert.isFalse(false, 'Assert.isFalse(false)')).toEqual(undefined)
  })
  it('test isEmpty(false)', () => {
    expect(
      Assert.isEmpty(false, 'Assert.isEmpty(false)')).toEqual(undefined)
  })
  it('test isEmpty("")', () => {
    expect(
      Assert.isEmpty('', 'Assert.isEmpty("")')).toEqual(undefined)
  })
  it('test isEmpty(null)', () => {
    expect(
      Assert.isEmpty(null, 'Assert.isEmpty(null)')).toEqual(undefined)
  })
  it('test isEmpty("null")', () => {
    expect(
      Assert.isEmpty('null', 'Assert.isEmpty("null")')).toEqual(undefined)
  })
  it('test isEmpty(undefined)', () => {
    expect(
      Assert.isEmpty(undefined, 'isEmpty(undefined)')).toEqual(undefined)
  })
  it('test isEmpty("undefined")', () => {
    expect(
      Assert.isEmpty('undefined', 'isEmpty("undefined")')).toEqual(undefined)
  })
  it('test isEmpty(data = [])', () => {
    const data: any = []
    expect(
      Assert.isEmpty(data, 'isEmpty("undefined")')).toEqual(undefined)
  })
  it('test isEmpty(data = {})', () => {
    const data: any = {}
    expect(
      Assert.isEmpty(data, 'isEmpty("undefined")')).toEqual(undefined)
  })
  it('test notEmpty("xxx")', () => {
    expect(
      Assert.notEmpty('123456', 'isEmpty("undefined")')).toEqual(undefined)
  })
  it('test notEmpty(true)', () => {
    expect(
      Assert.notEmpty(true, 'isEmpty("undefined")')).toEqual(undefined)
  })
  it('test notEmpty([1,2,3,4])', () => {
    expect(
      Assert.notEmpty([1, 2, 3, 4], 'isEmpty("undefined")')).toEqual(undefined)
  })
  it('test notEmpty({ name: "xxx" })', () => {
    expect(
      Assert.notEmpty({ name: 'xxx' }, 'isEmpty("undefined")')).toEqual(undefined)
  })
})
