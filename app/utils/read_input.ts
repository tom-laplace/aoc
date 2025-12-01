export function readInputFileAsList(input: string): string[] {
  return input.split('\n').filter((line) => line.trim() !== '')
}
