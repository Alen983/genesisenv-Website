import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const raw = fs
  .readFileSync(path.join(root, 'playground-art-temp.txt'), 'utf8')
  .replace(/\r\n/g, '\n')
  .replace(/\r/g, '\n')
  .replace(/\n$/, '')

const wantLines = raw.split('\n')

const PLAYGROUND_ASCII_LINES = [
  '  _____  _                                             _ ',
  ' |  __ \\| |                                           | |',
  ' | |__) | | __ _ _   _  __ _ _ __ ___  _   _ _ __   __| |',
  " |  ___/| |/ `| | | |/ `| | '__/ _\\| | | | '_\\ / `| |",
  ' | |    | | (_| | |_| | (_| | | | (_) | |_| | | | | (_| |',
  ' |_|    |_|\\__,_|\\__, |\\__, |_|  \\___/ \\__,_|_| |_|\\__,_|',
  '                  __/ | __/ |                            ',
  '                 |___/ |___/                             ',
]

let ok = true
for (let i = 0; i < Math.max(wantLines.length, PLAYGROUND_ASCII_LINES.length); i++) {
  const w = wantLines[i] ?? '<missing>'
  const g = PLAYGROUND_ASCII_LINES[i] ?? '<missing>'
  if (w !== g) {
    ok = false
    console.log(`Line ${i + 1} mismatch`)
    console.log('want', JSON.stringify(w))
    console.log('got ', JSON.stringify(g))
  }
}
console.log(ok ? 'ALL_LINES_MATCH' : 'MISMATCH')
process.exit(ok ? 0 : 1)
