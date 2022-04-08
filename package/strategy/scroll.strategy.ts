import type { ElementSize, ScrollStrategy } from '../types'

export enum ScrollStrategyType {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
}

class ScrollToTopStrategy implements ScrollStrategy {
  public type() {
    return ScrollStrategyType.TOP
  }

  public style(step: number) {
    return {
      transform: `translateY(-${step}px)`,
      flexDirection: 'column',
    }
  }

  public isOverflow(stepCount: number, size: ElementSize) {
    return Math.abs(stepCount) >= size.height
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public start(size: ElementSize) {
    return 0
  }
}

class ScrollToBottomStrategy implements ScrollStrategy {
  public type() {
    return ScrollStrategyType.BOTTOM
  }

  public style(step: number) {
    return {
      transform: `translateY(${step}px)`,
      flexDirection: 'column',
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public isOverflow(stepCount: number, size: ElementSize) {
    return Math.abs(stepCount) <= 0
  }

  public start(size: ElementSize) {
    return 0 - size.height
  }
}

class ScrollToLeftStrategy implements ScrollStrategy {
  public type() {
    return ScrollStrategyType.LEFT
  }

  public style(step: number) {
    return {
      transform: `translateX(-${step}px)`,
      flexDirection: 'row',
    }
  }

  public isOverflow(stepCount: number, size: ElementSize) {
    return Math.abs(stepCount) >= size.height
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public start(size: ElementSize) {
    return 0
  }
}

class ScrollToRightStrategy implements ScrollStrategy {
  public type() {
    return ScrollStrategyType.RIGHT
  }

  public style(step: number) {
    return {
      transform: `translateX(${step}px)`,
      flexDirection: 'row',
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public isOverflow(stepCount: number, size: ElementSize) {
    return Math.abs(stepCount) <= 0
  }

  public start(size: ElementSize) {
    return 0 - size.width
  }
}

const TO_TOP = new ScrollToTopStrategy()
const TO_BOTTOM = new ScrollToBottomStrategy()
const TO_LEFT = new ScrollToLeftStrategy()
const TO_RIGHT = new ScrollToRightStrategy()

const SCROLL_STRATEGY = new Map<'top' | 'left' | 'bottom' | 'right', ScrollStrategy>()

SCROLL_STRATEGY.set(TO_TOP.type(), TO_TOP)
SCROLL_STRATEGY.set(TO_BOTTOM.type(), TO_BOTTOM)
SCROLL_STRATEGY.set(TO_LEFT.type(), TO_LEFT)
SCROLL_STRATEGY.set(TO_RIGHT.type(), TO_RIGHT)

export {
  SCROLL_STRATEGY,
}