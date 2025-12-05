export function readInputFileAsList(input: string): string[] {
  return input.split('\n').filter((line) => line.trim() !== '')
}

export function readInputFileWithCommas(input: string): string[] {
  return input
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item !== '')
}
