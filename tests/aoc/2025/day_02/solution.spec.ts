import { test } from '@japa/runner'

import Solution2025Day02 from '#aoc/2025/day_02/solution'
import { readFileSync } from 'node:fs'

test.group('2025 Day 02', () => {
  const ranges: string[] = [
    '11-22',
    '95-115',
    '998-1012',
    '1188511880-1188511890',
    '222220-222224',
    '1698522-1698528',
    '446443-446449',
    '38593856-38593862',
    '565653-565659',
    '824824821-824824827',
    '2121212118-2121212124',
  ]
  const solution = new Solution2025Day02()

  test('solvePart1', async ({ assert, fs }) => {
    await fs.create('input.txt', ranges.join(','))
    const input = readFileSync(fs.basePath + '/input.txt', 'utf-8')
    const result = solution.solvePart1(input)
    assert.equal(result, 1227775554)
  })

  test('solvePart2', async ({ assert, fs }) => {
    await fs.create('input.txt', ranges.join(','))
    const input = readFileSync(fs.basePath + '/input.txt', 'utf-8')
    const result = solution.solvePart2(input)
    assert.equal(result, 4174379265)
  })

  test('it should parse range to an array of 2 string', ({ assert }) => {
    const [min, max] = solution.parseRange('20-40')

    assert.deepEqual([min, max], [20, 40])
  })

  test('#sliceFirstHalf, should slice a string in half', ({ assert }) => {
    assert.equal(solution.sliceFirstHalf('abcd'), 'ab')
  })

  test('#sliceSecondHalf, should slice a string in second half', ({ assert }) => {
    assert.equal(solution.sliceSecondHalf('abcd'), 'cd')
  })
})
