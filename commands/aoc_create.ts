import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import * as fs from 'node:fs'

export default class AocCreate extends BaseCommand {
  static commandName = 'aoc:create'
  static description = 'Create AoC templates for the given year and day'
  static help = [
    'The <aoc:create> command helps you create templates for Advent of Code challenges.',
    '',
    'You can specify the year and day for which you want to create the templates.',
    '',
    'If you do not specify the year or day, the command will use the current year and day by default.',
    'Usage:',
    '  <aoc:create 2025 05>',
  ]

  static options: CommandOptions = {
    startApp: false,
    allowUnknownFlags: false,
    staysAlive: false,
  }

  @args.string({
    argumentName: 'year',
    description: 'Year of the Advent of Code challenge. Defaults to current year',
    default: new Date().getFullYear().toString(),
    parse(value) {
      return value.trim()
    },
  })
  declare year: string

  @args.string({
    argumentName: 'day',
    description: 'Day of the Advent of Code challenge. Defaults to current day',
    default: new Date().getDate().toString(),
    parse(value) {
      return value.trim().padStart(2, '0')
    },
  })
  declare day: string

  async run() {
    ;[this.year, this.day] = this.parsed.args
    this.createFolders(this.year, this.day)
    this.createFiles(this.year, this.day)
  }

  private createFolders(year: string, day: string) {
    try {
      fs.mkdirSync(`./app/aoc/${year}/day_${day}`, { recursive: true })
      fs.mkdirSync(`./tests/aoc/${year}/day_${day}`, { recursive: true })
    } catch (err) {
      this.logger.error('Error creating folders:', err)
    }
  }

  private createFiles(year: string, day: string) {
    try {
      this.logger.info(`Creating files for Year: ${year}, Day: ${day}`)
      this.createInputFile(year, day)
      this.createSolutionFile(year, day)
      this.createTestFile(year, day)
      this.logger.success(`All files created for Year: ${year}, Day: ${day}`)
      this.logger.info('Remember to add your input data to the input.txt file.')
      this.logger.info('Do a little `pnpm checks` to ensure everything is fine.')
      this.logger.info('You can now run the tests using `pnpm test:watch` command.')
      this.logger.info('You can execute your solution using the `aoc:execute` command.')
      this.logger.success('Happy coding!')
    } catch (err) {
      this.logger.error('Error creating files:', err)
    }
  }

  private createInputFile(year: string, day: string) {
    if (fs.existsSync(`./app/aoc/${year}/day_${day}/input.txt`)) {
      this.logger.warning(`Input file for Year ${year}, Day ${day} already exists.`)
      return
    }

    fs.appendFileSync(`./app/aoc/${year}/day_${day}/input.txt`, '')
    this.logger.info(`Created input file for Year ${year}, Day ${day}.`)
  }

  private createSolutionFile(year: string, day: string) {
    if (fs.existsSync(`./app/aoc/${year}/day_${day}/solution.ts`)) {
      this.logger.warning(`Solution file for Year ${year}, Day ${day} already exists.`)
      return
    }

    const content = `export default class Solution${year}Day${day} {
          /**
           * @param input - raw input string
           * @returns solution for part 1
           */
          solvePart1(input: string) {
            return input
          }
          /**
           * @param input - raw input string
           * @returns solution for part 2
           */
          solvePart2(input: string) {
            return input
          }
        }\n`
    fs.appendFileSync(`./app/aoc/${year}/day_${day}/input.txt`, '')
    fs.writeFileSync(`./app/aoc/${year}/day_${day}/solution.ts`, content)
    this.logger.info(`Created solution file for Year ${year}, Day ${day}.`)
  }

  private createTestFile(year: string, day: string) {
    if (fs.existsSync(`./tests/aoc/${year}/day_${day}/solution.spec.ts`)) {
      this.logger.warning(`Test file for Year ${year}, Day ${day} already exists.`)
      return
    }

    const content = `import { test } from '@japa/runner'
        
        import Solution${year}Day${day} from '#aoc/${year}/day_${day}/solution'
        
        test.group('${year} Day ${day}', () => {
          const solution = new Solution${year}Day${day}()
        
          test('solvePart1', ({ assert }) => {
            const result = solution.solvePart1('happy aoc')
            assert.equal(result, 'happy aoc')
          })
        
          test('solvePart2', ({ assert }) => {
            const result = solution.solvePart2('happy aoc')
            assert.equal(result, 'happy aoc')
          })
        })\n`
    fs.appendFileSync(`./app/aoc/${year}/day_${day}/input.txt`, '')
    fs.writeFileSync(`./tests/aoc/${year}/day_${day}/solution.spec.ts`, content)
    this.logger.info(`Created test file for Year ${year}, Day ${day}.`)
  }
}
