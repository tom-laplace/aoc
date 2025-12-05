import { readInputFileAsList } from '#utils/read_input'

export default class Solution2025Day03 {
  /**
   * @param input - raw input string
   * @returns solution for part 1
   */
  solvePart1(input: string) {
    const banks = readInputFileAsList(input)
    let bankJoltage = 0

    for (const bank of banks) {
      bankJoltage += this.getHighestJoltage(bank)
    }

    return bankJoltage
  }
  /**
   * @param input - raw input string
   * @returns solution for part 2
   */
  solvePart2(input: string) {
    return input
  }

  getHighestJoltage(bank: string) {
    let l = 0
    let maxL = 0

    while (l < bank.length - 1) {
      maxL = Math.max(maxL, Number.parseInt(bank[l], 10))
      l++
    }

    const bankSub = bank.substring(bank.indexOf(maxL.toString()) + 1)
    let maxR = 0
    let r = 0

    while (r < bankSub.length) {
      maxR = Math.max(maxR, Number.parseInt(bankSub[r], 10))
      r++
    }

    return Number.parseInt(maxL.toString().concat(maxR.toString()), 10)
  }

  getHighestJoltage2(bank: string): number {
    // on passe d'une banque de 15 chiffres a 12

    for (let i = 0; i < 3; i++) {}

    return 0
  }
}
