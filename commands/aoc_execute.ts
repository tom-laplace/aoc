import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import fs from 'node:fs'

export default class AocExecute extends BaseCommand {
  static commandName = 'aoc:execute'
  static description = 'Execute AoC solution for the given year and day'
  static help = [
    'The <aoc:execute> command helps you execute the solution for Advent of Code challenges.',
    '',
    'You can specify the year and day for which you want to execute the solution.',
    '',
    'If you do not specify the year or day, the command will use the current year and day by default.',
    'Usage:',
    '  <aoc:execute 2025 05>',
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
    try {
      ;[this.year, this.day] = this.parsed.args
      this.logger.info(`Executing solution for Year: ${this.year}, Day: ${this.day}`)

      if (!fs.existsSync(`./app/aoc/${this.year}/day_${this.day}/solution.ts`)) {
        this.logger.error(`Solution file for ${this.year} Day ${this.day} does not exist.`)
        return
      }

      if (!fs.existsSync(`./app/aoc/${this.year}/day_${this.day}/input.txt`)) {
        this.logger.error(`Input file for ${this.year} Day ${this.day} does not exist.`)
        return
      }

      const input = fs.readFileSync(`./app/aoc/${this.year}/day_${this.day}/input.txt`, 'utf-8')
      this.logger.info('Input loaded successfully.')

      const { default: SolutionClass } = await import(
        `../app/aoc/${this.year}/day_${this.day}/solution.js`
      )
      const solutionInstance = new SolutionClass()
      this.logger.info('Solution class instantiated successfully.')

      this.logger.info(`Results for Year: ${this.year}, Day: ${this.day}`)
      this.logger.info('Running Part 1...')
      const resultPart1 = await solutionInstance.solvePart1(input)
      this.logger.info(`Result for Part 1: ${resultPart1}`)

      this.logger.info('Running Part 2...')
      const resultPart2 = await solutionInstance.solvePart2(input)
      this.logger.info(`Result for Part 2: ${resultPart2}`)
    } catch (error) {
      this.logger.error('Error executing solution:', error)
    }
  }
}
