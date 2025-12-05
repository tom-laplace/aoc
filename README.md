# Advent of Code in Typescript

Simple repository to do AoC in Typescript with some automations.

## Getting Started

### Dependencies

- pnpm v10>
- node v22>

### Installing

- `pnpm install`
- Add a `.env` file at the root of the project: `cp .env.example .env`
- `node ace generate:key` to generate the application key

### Doing AoCs

- Creating setup for the current day:

```bash
❯ node ace aoc:create
[ info ] Creating files for Year: 2025, Day: 01
[ info ] Created input file for Year 2025, Day 01.
[ info ] Created solution file for Year 2025, Day 01.
[ info ] Created test file for Year 2025, Day 01.
[ success ] All files created for Year: 2025, Day: 01
[ info ] Remember to add your input data to the input.txt file.
[ info ] Do a little `pnpm checks` to ensure everything is fine.
[ info ] You can now run the tests using `pnpm test:watch` command.
[ info ] You can execute your solution using the `aoc:execute` command.
[ success ] Happy coding!
```

- Creating setup for a specific day:

```bash
❯ node ace aoc:create 2025 01
[ info ] Creating files for Year: 2025, Day: 01
[ info ] Created input file for Year 2025, Day 01.
[ info ] Created solution file for Year 2025, Day 01.
[ info ] Created test file for Year 2025, Day 01.
[ success ] All files created for Year: 2025, Day: 01
[ info ] Remember to add your input data to the input.txt file.
[ info ] Do a little `pnpm checks` to ensure everything is fine.
[ info ] You can now run the tests using `pnpm test:watch` command.
[ info ] You can execute your solution using the `aoc:execute` command.
[ success ] Happy coding!
```

It will create the following files:

- `app/aoc/YEAR/day_XX/solution.ts` - Solution file containing two functions to implement (part1 and part2)
- `app/aoc/YEAR/day_XX/input.txt` - Input file to put the input data (you still need to copy/paste it from the website)
- `tests/aoc/YEAR/day_XX/solution.spec.ts` - Test file to implement tests for the solution functions

- Executing solution for the current day:

```bash
❯ node ace aoc:execute
[ info ] Executing solution for Year: 2025, Day: 01
[ info ] Input loaded successfully.
[ info ] Solution class instantiated successfully.
[ info ] Results for Year: 2025, Day: 01
[ info ] Running Part 1...
[ info ] Result for Part 1: 1150
[ info ] Running Part 2...
[ info ] Result for Part 2: 6738
```

- Executing solution for a specific day:

```bash
❯ node ace aoc:execute 2025 01
[ info ] Executing solution for Year: 2025, Day: 01
[ info ] Input loaded successfully.
[ info ] Solution class instantiated successfully.
[ info ] Results for Year: 2025, Day: 01
[ info ] Running Part 1...
[ info ] Result for Part 1: 1150
[ info ] Running Part 2...
[ info ] Result for Part 2: 6738
```

## Version History

- 0.0.1
  - Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details
