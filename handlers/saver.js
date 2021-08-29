import chalk from 'chalk'
import path from 'path'
import fs from 'fs'

export default async function saveData(data) {
  const name = `${Date.now()}.json`
  const savePath = path.join('handlers', '..', 'data', name)

  return new Promise((resolve, reject) => {
    fs.writeFile(savePath, JSON.stringify(data, null, 4), err => {
      if (err) {
        return reject(err)
      }

      console.log(chalk.blue('File was saved successfully'))

      resolve()
    })
  })
}