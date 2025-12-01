import { readInputFileAsList } from '#utils/read_input'

export default class Solution2025Day01 {
  /**
   * @param input - raw input string
   * @returns solution for part 1
   */
  solvePart1(input: string) {
    const lines = this.loadLines(input)
    let dial = 50
    let endsAtZero = 0

    for (const line of lines) {
      const direction = this.getDirection(line)
      const distance = this.getDistance(line)
      const [newDial] = this.applyMove(dial, direction, distance)
      dial = newDial
      if (dial === 0) endsAtZero += 1
    }

    return endsAtZero
  }

  /**
   * @param input - raw input string
   * @returns solution for part 2
   */
  solvePart2(input: string) {
    const lines = this.loadLines(input)
    let dial = 50
    let totalZeros = 0

    for (const line of lines) {
      const direction = this.getDirection(line)
      const distance = this.getDistance(line)
      const [newDial, zerosInMove] = this.applyMove(dial, direction, distance)
      totalZeros += zerosInMove
      dial = newDial
    }

    return totalZeros
  }

  private loadLines(input: string): string[] {
    return readInputFileAsList(input)
  }

  getDirection(line: string): 'left' | 'right' {
    if (line.startsWith('L')) {
      return 'left'
    }
    return 'right'
  }

  getDistance(line: string): number {
    return Number.parseInt(line.slice(1), 10)
  }

  applyMove(dial: number, direction: 'left' | 'right', amount: number): [number, number] {
    let remaining = amount
    let currentDial = dial
    let zeros = 0

    while (remaining >= 100) {
      const [d, z] =
        direction === 'left'
          ? this.computeLeftDistanceWithCount(currentDial, 100)
          : this.computeRightDistanceWithCount(currentDial, 100)
      currentDial = d
      zeros += z
      remaining -= 100
    }

    const [d, z] =
      direction === 'left'
        ? this.computeLeftDistanceWithCount(currentDial, remaining)
        : this.computeRightDistanceWithCount(currentDial, remaining)
    currentDial = d
    zeros += z

    return [currentDial, zeros]
  }

  computeRightDistanceWithCount(dial: number, amount: number): [number, number] {
    const firstStep = dial === 0 ? 100 : 100 - dial

    if (amount < firstStep) {
      return [(dial + amount) % 100, 0]
    }

    const remainderAfterFirst = amount - firstStep
    const extraZeros = Math.floor(remainderAfterFirst / 100)
    const zeros = 1 + extraZeros
    const remainder = remainderAfterFirst % 100
    const newDial = remainder % 100
    return [newDial, zeros]
  }

  computeLeftDistanceWithCount(dial: number, amount: number): [number, number] {
    const firstStep = dial === 0 ? 100 : dial

    if (amount < firstStep) {
      return [(((dial - amount) % 100) + 100) % 100, 0]
    }

    const remainderAfterFirst = amount - firstStep
    const extraZeros = Math.floor(remainderAfterFirst / 100)
    const zeros = 1 + extraZeros
    const remainder = remainderAfterFirst % 100
    const newDial = (100 - remainder) % 100
    return [newDial, zeros]
  }
}
