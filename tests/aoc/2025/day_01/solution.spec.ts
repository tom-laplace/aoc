import { test } from '@japa/runner'

import Solution2025Day01 from '#aoc/2025/day_01/solution'
import { readFileSync } from 'node:fs'

test.group('2025 Day 1', () => {
  const lines: string[] = ['L68', 'L30', 'R48', 'L5', 'R60', 'L55', 'L1', 'L99', 'R14', 'L82']

  test('solvePart1', async ({ assert, fs }) => {
    await fs.create('input.txt', lines.join('\n'))
    const input = readFileSync(fs.basePath + '/input.txt', 'utf-8')
    const solution = new Solution2025Day01()

    const result = solution.solvePart1(input)
    assert.equal(result, 3)
  })

  test('solvePart2', async ({ assert, fs }) => {
    await fs.create('input.txt', lines.join('\n'))
    const input = readFileSync(fs.basePath + '/input.txt', 'utf-8')
    const solution = new Solution2025Day01()

    const result = solution.solvePart2(input)
    assert.equal(result, 6)
  })
})
