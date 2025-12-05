import { readInputFileWithCommas } from '#utils/read_input'

export default class Solution2025Day02 {
  /**
   * @param input - raw input string
   * @returns solution for part 1
   */
  solvePart1(input: string) {
    const lines = readInputFileWithCommas(input)
    let res = 0

    for (const line of lines) {
      let lowRange: number
      let highRange: number
      let i = 0
      ;[lowRange, highRange] = this.parseRange(line)

      for (i = lowRange; i <= highRange; i++) {
        let firstHalf = ''
        let secondHalf = ''
        let iStr = i.toString()

        if (iStr.length % 2 === 0) {
          firstHalf = this.sliceFirstHalf(iStr)
          secondHalf = this.sliceSecondHalf(iStr)

          if (
            firstHalf === secondHalf &&
            firstHalf.charAt(0) !== '0' &&
            secondHalf.charAt(0) !== '0'
          ) {
            res += i
          }
        }
      }
    }

    return res
  }

  /**
   * @param input - raw input string
   * @returns solution for part 2
   */
  solvePart2(input: string) {
    const lines = readInputFileWithCommas(input)
    let res = 0

    for (const line of lines) {
      let [lowRange, highRange] = this.parseRange(line)

      for (let i = lowRange; i <= highRange; i++) {
        if (this.isInvalid2(i)) {
          res += i
        }
      }
    }

    return res
  }

  isInvalid2(candidate: number): boolean {
    const candidateStr = candidate.toString()
    const length = candidateStr.length

    for (let size = 1; size <= Math.floor(length / 2); size++) {
      if (length % size === 0) {
        const subStr = candidateStr.substring(0, size)
        let isInvalid = true

        for (let pos = size; pos < length; pos += size) {
          if (candidateStr.substring(pos, pos + size) !== subStr) {
            isInvalid = false
            break
          }
        }

        if (isInvalid) {
          return true
        }
      }
    }

    return false
  }

  parseRange(range: string): number[] {
    let rangeStr = range.split('-')

    return rangeStr.map((val) => Number.parseInt(val, 10))
  }

  sliceFirstHalf(str: string): string {
    return str.slice(0, str.length / 2)
  }

  sliceSecondHalf(str: string): string {
    return str.slice(str.length / 2)
  }
}
