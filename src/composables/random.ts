export function useNumber() {
  return Math.random() * 100
}

export function useNumbers(length = 3): number[] {
  return Array.from({ length }, () => useNumber())
}
