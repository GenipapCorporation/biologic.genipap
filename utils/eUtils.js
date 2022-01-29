import fs from "fs"
import path from "path"

export const E_PATH = path.join(process.cwd(), 'epath')

export const eFilePath = fs
  .readdirSync(E_PATH)
  .filter((path) => /\.mdx?$/.test(path))