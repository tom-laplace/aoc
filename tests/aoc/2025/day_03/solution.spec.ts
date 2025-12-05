import { test } from '@japa/runner'

import Solution2025Day03 from '#aoc/2025/day_03/solution'
import { readFileSync } from 'node:fs'

test.group('2025 Day 03', () => {
  const banks: string[] = [
    '987654321111111',
    '811111111111119',
    '234234234234278',
    '818181911112111',
  ]
  const solution = new Solution2025Day03()

  test('solvePart1', async ({ assert, fs }) => {
    await fs.create('input.txt', banks.join('\n'))
    const input = readFileSync(fs.basePath + '/input.txt', 'utf-8')
    const result = solution.solvePart1(input)
    assert.equal(result, 357)
  })

  test('solvePart2', async ({ assert, fs }) => {
    await fs.create('input.txt', banks.join('\n'))
    const input = readFileSync(fs.basePath + '/input.txt', 'utf-8')
    const result = solution.solvePart2(input)
    assert.equal(result, 3121910778619)
  })

  test('#getHighestJoltage', ({ assert }) => {
    assert.equal(solution.getHighestJoltage('987654321111111'), 98)
    assert.equal(solution.getHighestJoltage('811111111111119'), 89)
    assert.equal(solution.getHighestJoltage('234234234234278'), 78)
    assert.equal(solution.getHighestJoltage('818181911112111'), 92)
  })

  test('#getHighestJoltage2', ({ assert }) => {
    assert.equal(solution.getHighestJoltage2('987654321111111'), 987654321111)
    assert.equal(solution.getHighestJoltage2('811111111111119'), 811111111119)
    assert.equal(solution.getHighestJoltage2('234234234234278'), 434234234278)
    assert.equal(solution.getHighestJoltage2('818181911112111'), 888911112111)
  })
})
