import fs from 'fs'

export type Input = Array<string>

export default (file: string): Input => {
  const rawData = fs.readFileSync(file, 'utf8')
  return rawData.toString().split('\n').filter(Boolean)
}
